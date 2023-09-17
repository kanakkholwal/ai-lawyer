import FeedBack, { FeedBackType } from 'src/models/feedback';
import dbConnect from 'src/lib/dbConnect';
import handler from 'src/lib/handler';
import {hasTokenMiddleware} from 'src/middleware/checkUser';
import {getUser} from 'src/lib/checkUser';
import type { NextApiRequest, NextApiResponse } from 'next';

import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(hasTokenMiddleware)
router.post(async (req, res) => {

    const {
        feedback,
        rating,
    }: FeedBackType = req.body
    try {
        await dbConnect();
        if(!feedback || !rating) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        const user = await getUser(req);
        if(!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const newFeedback = await new FeedBack({
            feedback,
            rating,
            user: user.id
        });
        await newFeedback.save();

        return res.status(200).json({ message: 'Feedback Submitted Successfully', success: true });

    }
    catch (error: any) {
        res.status(500).json({ message: error?.message || 'Something went wrong' });
    }


})

export default router.handler(handler());


