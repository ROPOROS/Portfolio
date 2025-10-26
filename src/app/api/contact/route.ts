import nodemailer from 'nodemailer'

export const runtime = 'nodejs' // SMTP requires Node.js runtime

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

    // ✅ Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,          // SSL port
      secure: true,       // true for SSL
      auth: {
        user: process.env.SMTP_USER,  // sending email
        pass: process.env.SMTP_PASS,  // Gmail App Password
      },
    })

    // ✅ Send the email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,  // must match your Gmail
      to: process.env.SMTP_TO || 'raedchebbi.work@gmail.com',  // where you want to receive messages
      replyTo: email,                                         // lets you reply to the visitor
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

    return new Response(JSON.stringify({ message: 'Message sent successfully!' }), { status: 200 })
  } catch (error) {
    console.error('Email error:', error)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 })
  }
}
