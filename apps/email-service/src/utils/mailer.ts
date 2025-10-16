import { createTransport } from "nodemailer";

const transporter = createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "techrelated6969@gmail.com",
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
});


const sendMail = async ({ email, subject, text }: { email: string, subject: string, text: string }) => {

    try {
        const res = await transporter.sendMail({
            from: "'Bazaar' <techrelated6969@gmail.com>",
            to: email,
            subject,
            text
        });
        console.log(res);
        if (res.rejected) {
            throw new Error("email rejected ");
        }
        console.log("Email sent: to", email);
    } catch (error) {
        console.log(error);
    }
}

export default sendMail;