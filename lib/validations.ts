import { z } from 'zod'

export const signUpSchema = z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    universityId: z.coerce.number(),
    universityCard: z.string().nonempty("University Card is required"),
    password: z.string().min(3)
})

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3)
})

export const bookSchema = z.object({
    title: z.string().trim().min(2).max(100),
    description: z.string().trim().min(10).max(2000),
    author: z.string().trim().min(2).max(50),
    genre: z.string().trim().min(2).max(50),
    rating: z.coerce.number().min(1).max(5),
    totalCopies: z.coerce.number().int().positive().lte(10000),
    coverUrl: z.string().nonempty(),
    coverColor: z.string().trim().regex(/^#[a-fA-F0-9]{6}$/),
    videoUrl: z.string().nonempty(),
    summary: z.string().trim().min(10)
})