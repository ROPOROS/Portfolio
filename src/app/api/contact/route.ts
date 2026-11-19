import { Resend } from 'resend'

export const runtime = 'edge' // required by Cloudflare Pages (next-on-pages); Resend uses fetch, not SMTP

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body as FormData

    // ✅ Basic validation
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 })
    }

    // ✅ Sanitize inputs
    const sanitize = (str: string) => str.replace(/[<>]/g, '')
    const sanitizedName = sanitize(name)
    const sanitizedSubject = sanitize(subject)
    const sanitizedMessage = sanitize(message)

    // ✅ Create the Resend client (API key comes from the environment, never from source)
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('Email error: RESEND_API_KEY is not configured')
      return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 })
    }
    const resend = new Resend(apiKey)

    // ✅ Send the email
    const { error: sendError } = await resend.emails.send({
      from: process.env.CONTACT_FROM || 'Portfolio Contact <onboarding@resend.dev>', // use a sender verified in Resend
      to: process.env.CONTACT_TO || process.env.SMTP_TO || 'raedchebbi.work@gmail.com', // where you want to receive messages
      replyTo: email,                                                                  // lets you reply to the visitor
      subject: sanitizedSubject,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${sanitizedSubject}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="margin-left:1rem; border-left:2px solid #ccc; padding-left:1rem;">
          ${sanitizedMessage.replace(/\n/g, '<br />')}
        </blockquote>
        <hr />
        <p style="font-size:0.85rem; color:#666;">Sent via portfolio contact form</p>
      `,
    })
    if (sendError) throw new Error(sendError.message)

    return new Response(JSON.stringify({ message: 'Message sent successfully!' }), { status: 200 })
  } catch (error) {
    console.error('Email error:', error)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 })
  }
}
