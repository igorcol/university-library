import { Client as WorkflowClient } from '@upstash/workflow'
import config from './config'

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken
})

//* SEND EMAIL FUNCTION
export const sendEmail = async ({ email, subject, message }: { email: string, subject: string, message: string }) => {
    const payload = {
        service_id: config.env.emailJS.serviceId,
        template_id: config.env.emailJS.templateId,
        user_id: config.env.emailJS.publicKey,
        templateParams: {
            to_email: email,
            subject: subject,
            message: message
        }
    }

    // Envia
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("X | EmailJS failed:", errorText);
        throw new Error("X | EmailJS failed: " + errorText);
    }
}

