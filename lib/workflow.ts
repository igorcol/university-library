import { Client as WorkflowClient } from '@upstash/workflow'
import emailjs from '@emailjs/browser'
import config from './config'

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken
})

//* SEND EMAIL FUNCTION
export const sendEmail = async ({ email, subject, message }: { email: string, subject: string, message: string }) => {
    const templateParams = {
        to_email: email,
        subject: subject,
        message: message
    }

    await emailjs.send(
        config.env.emailJS.serviceId,
        config.env.emailJS.templateId,
        templateParams,
        config.env.emailJS.publicKey
    )
}

