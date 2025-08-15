const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

dotenv.config({ path: ".env" });

const app = express();
app.use(cors("*"));
app.use(express.json());

const APP_PASSWORD = process.env.APP_PASSWORD;

app.post("/mail", async (request, response) => {
  const { name, email, message } = request.body;

  if (!name || !email || !message) {
    return response.status(400).json({ message: "All fields are required!" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ndujoel2001@gmail.com",
        pass: APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: "ndujoel2001@gmail.com",
      subject: "New Contact Form Message",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #007bff;">New Message from Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 15px; background-color: #f4f4f4; border-radius: 5px;">
          ${message.replace(/\n/g, "<br>")}
        </div>
        <hr>
        <p style="font-size: 12px; color: #777;">This message was sent from your website contact form.</p>
      </div>
    `,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);

    return response
      .status(200)
      .json({ name, email, message: "Message Sent Successfully" });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "An Internal Server Error Occurred!" });
  }
});

app.listen(8000);
