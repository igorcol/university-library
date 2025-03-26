import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs"
import { eq } from "drizzle-orm";

type UserState = 'non-active' | 'active';

type InitialData = {
  email: string
  fullName: string
}

// -- INTERVALS --
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const SEVEN_DAYS_IN_MS = 6.5 * ONE_DAY_IN_MS; // ! MAX DELAY IN FREE QSTASH
//const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const NON_ACTIVE_LIMIT = SEVEN_DAYS_IN_MS;

//* Get User State
// Check the last activity state and return UserState
const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) return 'non-active';

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const time_difference = now.getTime() - lastActivityDate.getTime();

  if(time_difference > THREE_DAYS_IN_MS && time_difference <= NON_ACTIVE_LIMIT) {
    return 'non-active'
  } 

  return 'active'
}
// * -- WORKFLOW LOGIC --
export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload

  // Welcome Email
  await context.run("new-signup", async () => { // Email de Bem Vindo
    await sendEmail({
      email, 
      subject: 'Welcome to BookWise',
      message: `Welcome to BookWise, ${fullName}! We're excited to have you on board. Explore our library and enjoy your reading journey.`,
    })
  })

  await context.sleep("wait-for-3-days", THREE_DAYS_IN_MS) // Espera 3 dias

  while (true) { // Periodicamente checa o engajamento do usuario
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email)
    })

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: 'We Miss You at BookWise!',
          message: `Hi ${fullName}, we noticed you haven't been around lately. Come back and explore more amazing books with us!`
        })
      })
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: 'It\'s great to see you active!',
          message: `Hi ${fullName}, we're thrilled to see you engaging with BookWise. Keep exploring and enjoy your reading journey!`
        })
      })
    }

    await context.sleep("wait-for-1-week", SEVEN_DAYS_IN_MS)
  }
})


