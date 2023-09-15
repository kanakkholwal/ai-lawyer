import nodemailer from "nodemailer";

export function transport() {

    const _transport = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        // secure: true,
        auth: {
            user: process.env.MAIL_EMAIL,
            pass: process.env.MAIL_PASSWORD
        }
    })
    console.log("Transporter created");

    return _transport
}


const handler = (err, req, res, next) => {
    
    return {
    onError: (err, req, res, next)=>{
        console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
    },
    onNoMatch: (req, res) => {
        res.status(404).send("Page is not found");
    },
}
}


export default handler