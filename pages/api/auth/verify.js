// pages/api/auth/verify.js
import handler from 'src/lib/handler';

import dbConnect from "src/lib/dbConnect";
import User from "src/models/user";
import jwt from 'jsonwebtoken';
import { hasToken } from 'src/middleware/checkUser';


import { createRouter } from 'next-connect';

const router = createRouter();
router.get(async (req, res, next) => {
    try {
        await dbConnect();
        const { token } = req.query 

        if (!token) {
            return res.status(400).json({ message: 'Invalid verification token' });
        }

        await dbConnect();
        // Verify the token
        const decodedData = verifyVerificationToken(token);

        if (decodedData && decodedData.hasOwnProperty("email")) {
            console.log('Token is valid. User data:', decodedData);
            const email = decodedData?.email;
            if(email === undefined){
                return res.status(400).json({ message: 'Invalid verification token' });
            }
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (user.verificationToken !== token) {
                return res.status(400).json({ message: 'Invalid verification token' });
            }
            if (user.verified) {
                return res.status(400).json({ message: 'User already verified',callbackUrl: '/app' });
            }
            user.verified = true;
            user.verificationToken = null;
            await user.save();
            console.log("User verified successfully");
            if (await hasToken(req)) {
                return res.status(200).json({ message: 'User verified successfully', callbackUrl: '/app' });
            }
            else {
                return res.status(200).json({ message: 'User verified successfully', callbackUrl: '/login' });
            }
        } else {
            console.log('Token is invalid or has expired.');
            return res.status(400).json({ message: 'Invalid or expired verification token', callbackUrl:"/get-started"});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error", message: error?.message });
    }
})
export default router.handler(handler());

// Your secret key used to sign the token
const secretKey = process.env.JWT_SECRET ;
const expiresInMinutes = 30; // Token will expire after 30 minutes


// Function to verify the token and return the data if valid
function verifyVerificationToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (err) {
        // Token verification failed or expired
        return null;
    }
}
