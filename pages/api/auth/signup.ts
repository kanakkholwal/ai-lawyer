import User from 'src/models/user';
import dbConnect from 'src/lib/dbConnect';
import jwt from 'jsonwebtoken';
import handler,{ transport as createTransport } from 'src/lib/handler';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { JwtPayload } from "jsonwebtoken"

import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {

  const { name, email, password } = req.body as {
      name: string,
      email: string,
      password: string,

  };
  try {
    await dbConnect();

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }
    const isEmail = (email:string) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    if (!isEmail(email)) {
      return res.status(400).json({ message: 'Please enter a valid email' });
    }


    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const verificationToken = await generateVerificationToken({ email }, expiresInMinutes);

    const newUser = new User({
      name,
      email,
      password,
      username: email.split("@")[0],
      role: "user",
      account_type: "free",
      verificationToken: verificationToken,
    });

    const transporter = await createTransport();

    console.log("Transporter created");

    await transporter.sendMail({
      from: `${process.env.NEXT_WEBSITE_NAME} <no_reply@${process.env.NEXT_WEBSITE_DOMAIN}>`,
      to: newUser.email,
      subject: `🌟 Welcome to ${process.env.NEXT_WEBSITE_NAME} - Verify Your Account! 🌟 `,
      html: `
              <h1>Welcome to ${process.env.NEXT_WEBSITE_NAME}</h1>
              <p>Dear ${newUser.name},</p>
              <p>Thank you for signing up with ${process.env.NEXT_WEBSITE_NAME}! We're thrilled to have you on board.</p>
              <p>To complete the registration process and unlock the door to a world of possibilities, please click on the button below to verify your account:</p>
      
                <a href="${process.env.NEXTAUTH_URL}/verify-user?token=${verificationToken}" style=' display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: rgb(11 165 236);
                color: #ffffff;
                text-decoration: none;
                border-radius: 3px;margin-inline:auto;'>
                  Verify Account
                </a>
                <p><small style="color:red">Token will be expired in ${expiresInMinutes} minutes</small></p>
                <p>If you didn't initiate this sign-up process or have any questions, please disregard this email.</p>
                <p>For any assistance or inquiries, feel free to reach out to our dedicated support team at <a href="mailto:support@email.com">support@${process.env.NEXT_WEBSITE_DOMAIN}</a>. We're here to help!</p>
                <p>Best regards,</p>
                <p>${process.env.NEXT_WEBSITE_NAME} Team</p>
  
              `,
    });
    console.log("Mail sent");
    await newUser.save();

    res.status(201).json({ message: 'Created user Successfully, Please verify your Email Now!!!', success: true });

  }
  catch (error:any) {
    res.status(500).json({ message: error?.message || 'Something went wrong' });
  }


})

export default router.handler(handler());


// Your secret key used to sign the token
const secretKey = process.env.JWT_SECRET as string;
const expiresInMinutes = 30; // Token will expire after 30 minutes

// Function to generate a token with a specific expiration time
function generateVerificationToken(data:string | object | Buffer, expiresInMinutes:number):string {
  return jwt.sign(data, secretKey, { expiresIn: `${expiresInMinutes}m` });
}



// Function to verify the token and return the data if valid
function verifyVerificationToken(token:string) : JwtPayload | string | null{
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    // Token verification failed or expired
    return null;
  }
}

