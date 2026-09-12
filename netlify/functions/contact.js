const nodemailer = require("nodemailer")

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  let data
  try {
    data = JSON.parse(event.body || "{}")
  } catch {
    return { statusCode: 400, body: "Invalid JSON" }
  }

  const { name, email, message } = data
  const botField = data["bot-field"]

  // Honeypot: bots fill hidden fields humans never see. Drop silently
  // so bots don't learn the field is being checked.
  if (botField) {
    return { statusCode: 200, body: JSON.stringify({ ok: true }) }
  }

  if (!name || !email || !message) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Missing required fields" }) }
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    })
    return { statusCode: 200, body: JSON.stringify({ ok: true }) }
  } catch {
    return { statusCode: 502, body: JSON.stringify({ ok: false, error: "Failed to send" }) }
  }
}
