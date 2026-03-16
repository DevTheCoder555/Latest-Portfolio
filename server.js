import express    from 'express'
import nodemailer from 'nodemailer'
import cors       from 'cors'
import dotenv     from 'dotenv'
dotenv.config()

const app  = express()
const PORT = process.env.PORT || 3001

console.log('\n🔍 Environment Check:')
console.log(`   EMAIL_USER: ${process.env.EMAIL_USER ? '✅ Set' : '❌ NOT SET'}`)
console.log(`   EMAIL_PASS: ${process.env.EMAIL_PASS ? '✅ Set' : '❌ NOT SET'}`)
console.log(`   PORT: ${PORT}\n`)

// ── CORS: allow any origin so deployed frontend can reach this backend ──
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}))
app.use(express.json())

// ── Nodemailer (Gmail + App Password) ───────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Verify connection on startup
transporter.verify((err) => {
  if (err) {
    console.error('❌ Email config error:', err.message)
    console.error('   ⚠️  TROUBLESHOOTING:')
    console.error('   1. Check EMAIL_USER and EMAIL_PASS in .env file')
    console.error('   2. Verify you\'re using a 16-char App Password (not regular Gmail password)')
    console.error('   3. Ensure 2-Step Verification is enabled on your Gmail account')
    console.error('   4. Go to: https://myaccount.google.com/security → App passwords')
  } else {
    console.log('✅ Email transporter ready — connected to Gmail')
    console.log('   Ready to send emails through: ' + process.env.EMAIL_USER)
  }
})

// ── Health check ────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({ status: 'OK', message: 'Portfolio backend running 🚀', email: process.env.EMAIL_USER })
})

// ── POST /api/send-email ────────────────────────────────────────────────
app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body

  // Validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ success: false, message: 'All fields are required.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' })
  }

  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

  // ── Email TO Devyansh ──────────────────────────────────────────────────
  const toOwner = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to:   'devgupta51006@gmail.com',
    subject: `📬 Portfolio Message from ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;
                  background:#02040a;color:#e2e8f0;padding:2rem;
                  border-radius:12px;border:1px solid #1e293b;">
        <h2 style="background:linear-gradient(90deg,#a855f7,#06b6d4);
                   -webkit-background-clip:text;-webkit-text-fill-color:transparent;
                   margin-bottom:1.5rem;">
          New Portfolio Message
        </h2>

        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:12px;background:#060b14;border:1px solid #1e293b;
                        border-radius:6px 6px 0 0;color:#94a3b8;
                        font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;">
              From
            </td>
            <td style="padding:12px;background:#060b14;border:1px solid #1e293b;
                        border-radius:6px 6px 0 0;font-weight:600;">
              ${name}
            </td>
          </tr>
          <tr>
            <td style="padding:12px;background:#060b14;border:1px solid #1e293b;
                        color:#94a3b8;font-size:0.8rem;text-transform:uppercase;">
              Email
            </td>
            <td style="padding:12px;background:#060b14;border:1px solid #1e293b;">
              <a href="mailto:${email}" style="color:#06b6d4;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px;background:#060b14;border:1px solid #1e293b;
                        border-radius:0 0 6px 6px;color:#94a3b8;
                        font-size:0.8rem;text-transform:uppercase;vertical-align:top;">
              Message
            </td>
            <td style="padding:12px;background:#060b14;border:1px solid #1e293b;
                        border-radius:0 0 6px 6px;line-height:1.7;white-space:pre-wrap;">
              ${message}
            </td>
          </tr>
        </table>

        <div style="margin-top:1.5rem;">
          <a href="mailto:${email}?subject=Re: Your portfolio message"
             style="display:inline-block;
                    background:linear-gradient(135deg,#a855f7,#3b82f6);
                    color:#fff;padding:0.75rem 1.5rem;border-radius:6px;
                    text-decoration:none;font-weight:700;">
            Reply to ${name}
          </a>
        </div>

        <p style="margin-top:1.5rem;color:#475569;font-size:0.75rem;">
          Sent at ${now} IST via your Portfolio Contact Form
        </p>
      </div>`,
  }

  // ── Auto-reply TO sender ───────────────────────────────────────────────
  const autoReply = {
    from: `"Devyansh Gupta" <${process.env.EMAIL_USER}>`,
    to:   email,
    subject: `Thanks for reaching out, ${name}! 🚀`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;
                  background:#02040a;color:#e2e8f0;padding:2rem;
                  border-radius:12px;border:1px solid #1e293b;">
        <h2 style="background:linear-gradient(90deg,#a855f7,#06b6d4);
                   -webkit-background-clip:text;-webkit-text-fill-color:transparent;">
          Thanks for your message!
        </h2>
        <p>Hey <strong>${name}</strong>,</p>
        <p style="color:#94a3b8;line-height:1.7;margin:1rem 0;">
          I've received your message and will get back to you within 24 hours.
        </p>
        <p style="color:#94a3b8;line-height:1.7;">
          In the meantime, check out my work on
          <a href="https://github.com/DevTheCoder555" style="color:#06b6d4;">GitHub</a>
          or connect on
          <a href="https://www.linkedin.com/in/devyansh-gupta-2a9615385/" style="color:#06b6d4;">LinkedIn</a>.
        </p>
        <p style="margin-top:2rem;">
          Best,<br/>
          <strong style="color:#a855f7;">Devyansh Gupta</strong><br/>
          <span style="color:#94a3b8;font-size:0.85rem;">Full Stack Developer · AI/ML Enthusiast</span>
        </p>
      </div>`,
  }

  try {
    await transporter.sendMail(toOwner)
    await transporter.sendMail(autoReply)
    console.log(`✅ Email sent from ${name} <${email}> at ${now}`)
    res.status(200).json({ success: true, message: 'Email sent successfully!' })
  } catch (err) {
    console.error('❌ Send failed:', err.message)
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send email. Check server logs.',
      error: err.message 
    })
  }
})

app.listen(PORT, () => {
  console.log(`\n🚀  Backend running at http://localhost:${PORT}`)
  console.log(`📬  POST /api/send-email ready`)
  console.log(`💻  Frontend should connect to: http://localhost:${PORT}`)
  console.log(`💡  Press Ctrl+C to stop\n`)
})