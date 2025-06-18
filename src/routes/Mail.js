import nodemailer from "nodemailer"
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.mail, 
        pass: process.env.mailpasskey 
    }
});
export async function sendEmail(to, subject, text) {
    try {
        const mailOptions = {
            from: process.env.mail,
            to: to,
            subject: subject,
            text: text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}