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
        accessToken: config.env.emailJS.privateKey,
        template_params: {
            to_email: email,
            subject: subject,
            message: message
        }
    }
    //console.log("...EMAIL PAYLOAD", JSON.stringify(payload, null, 2))


    // Envia
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: 'POST',
        headers: new Headers({ 
            "Content-Type": "application/json",
            //Authorization: `Bearer ${config.env.emailJS.privateKey}` 
        }),
        body: JSON.stringify(payload)
    })

    if (!res.ok) {
        const errorText = await res.text();
        console.error("✖️ | EmailJS failed:", errorText);
        throw new Error("✖️ | EmailJS failed: " + errorText);
    }

    console.error(`✉️ | EmailJS: Email sent to ${email} successfully.`);
}

