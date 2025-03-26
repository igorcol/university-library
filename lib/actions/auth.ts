'use server'

import { signIn } from "@/auth"
import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { hash } from "bcryptjs"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import ratelimit from "../ratelimit"
import { workflowClient } from "../workflow"
import { url } from "inspector"
import config from "../config"

// * SIGN IN
export const signInWithCredentials = async (params: Pick<AuthCredentials, 'email' | 'password'>) => {
    const { email, password } = params;

    // Rate Limit
    const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    if (!success) return redirect('/too-fast');

    try {
        const result = await signIn('credentials', {
            email, password,
            redirect: false
        })

        if (result?.error) {
            return {
                success: false,
                error: result.error
            }
        }

        return { success: true }
    }
    catch (error) {
        console.log(error, 'SignIn Error')
        return {
            success: false,
            error: "Sign In error"
        }
    }
}

// * SIGN UP
export const signUp = async (params: AuthCredentials) => {
    const { fullName, email, universityId, password, universityCard } = params

    // Rate Limit
    const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    if (!success) return redirect('/too-fast');

    // Ve se usuario ja existe
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1)
    if (existingUser.length > 0) return {
        success: false,
        error: "User already exists"
    }

    const hashPass = await hash(password, 10);

    try {
        await db.insert(users).values({
            fullName,
            email,
            password: hashPass,
            universityId,
            universityCard
        })

        // Trigger the email workflow
        await workflowClient.trigger({
            url: `${config.env.prodApiEndpoint}/api/workflows/onboarding`,
            body: {
                email,
                fullName
            }
        })

        await signInWithCredentials({ email, password }) // Automatic sign in
        return { success: true };
    }
    catch (error) {
        console.log(error, 'SignUp Error')
        return {
            success: false,
            error: "Sign Up error"
        }
    }
}