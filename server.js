import express from "express"
import { Resend } from "resend"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

console.log("\n🔍 Environment Check:")
console.log(`   RESEND_API_KEY: ${process.env.RESEND_API_KEY ? "✅ Set" : "❌ NOT SET"}`)
console.log(`   PORT: ${PORT}\n`)

app.use(cors({
  origin: "*",
  methods: ["GET","POST","OPTIONS"],
  allowedHeaders: ["Content-Type"]
}))

app.use(express.json())

// Health check
app.get("/", (req,res)=>{
  res.json({
    status:"OK",
    message:"Portfolio backend running 🚀"
  })
})

app.post("/api/send-email", async (req,res)=>{

  const {name,email,message} = req.body

  if(!name || !email || !message){
    return res.status(400).json({
      success:false,
      message:"All fields required"
    })
  }

  try{

    const now = new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"})

    // Email to you
    await resend.emails.send({
      from:"Portfolio <onboarding@resend.dev>",
      to:"devgupta51006@gmail.com",
      subject:`📬 Portfolio Message from ${name}`,
      html:`
      <h2>New Portfolio Message</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b></p>
      <p>${message}</p>
      <br/>
      <p>Sent at ${now}</p>
      `
    })

    // Auto reply
    await resend.emails.send({
      from:"Devyansh Gupta <onboarding@resend.dev>",
      to:email,
      subject:`Thanks for reaching out ${name}! 🚀`,
      html:`
      <h2>Thanks for your message!</h2>
      <p>Hi ${name},</p>
      <p>I received your message and will reply soon.</p>
      <p>You can also connect with me:</p>

      <p>
      GitHub: https://github.com/DevTheCoder555 <br/>
      LinkedIn: https://www.linkedin.com/in/devyansh-gupta-2a9615385/
      </p>

      <br/>
      <p>Best,<br/>Devyansh Gupta</p>
      `
    })

    console.log(`✅ Email sent from ${name} <${email}>`)

    res.json({
      success:true,
      message:"Email sent successfully"
    })

  }catch(err){

    console.error("❌ Email error:",err)

    res.status(500).json({
      success:false,
      message:"Failed to send email"
    })

  }

})

app.listen(PORT,()=>{
  console.log(`🚀 Backend running on port ${PORT}`)
})