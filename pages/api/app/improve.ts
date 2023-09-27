import dbConnect from 'src/lib/dbConnect';
import handler from 'src/lib/handler';
import { hasTokenMiddleware } from 'src/middleware/checkUser';
import { getUser } from 'src/lib/checkUser';

import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"], // defaults to process.env["OPENAI_API_KEY"]
});



import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
const router = createRouter<NextApiRequest, NextApiResponse>();

// router.use(hasTokenMiddleware)
router.post(async (req, res) => {


    try {
        // await dbConnect();
        // const user = await getUser(req);
        // if (!user) {
        //     return res.status(400).json({ message: 'User not found' });
        // }

        const {
            prompt,
            doc,
            section
        } = req.body;

        const builtPrompt = (`
        Act as a lawyer and help a me with this legal document.
        Here is the document I need help with:
            ${doc}
        \n
        Can you improve this section of the document for me?
        with the following prompt:
        ${prompt}
        \n

        Here is the section I need help with:   
        ${section}  
        \n
        Make it precise and concise. No need to be verbose.Just respond the section content     
        `);

        const completion = await openai.completions.create({
            model: "gpt-3.5-turbo-instruct",
            prompt: builtPrompt,
            max_tokens: 100,
        });

        console.log(completion);

        const response = completion.choices[0].text;
        const usage = completion.usage



        return res.status(200).json({
            success: true,
            data: response,
            message: 'Successfully fetched',
        });

    }
    catch (error: any) {
        res.status(500).json({ message: error?.message || 'Something went wrong' });
    }


})
const handleApiResponse = (res: any, statusCode: number, data: any) => {
    switch (statusCode) {
        //   case 200:
        //     res.status(200).json({ data });
        //     break;
        case 400:
            res.status(400).json({ error: 'Bad Request' });
            break;
        case 401:
            res.status(401).json({ error: 'Unauthorized' });
            break;
        case 403:
            res.status(403).json({ error: 'Permission Denied' });
            break;
        case 404:
            res.status(404).json({ error: 'Not Found' });
            break;
        case 422:
            res.status(422).json({ error: 'Unprocessable Entity' });
            break;
        case 429:
            res.status(429).json({ error: 'Rate Limit Exceeded' });
            break;
        case 500:
            res.status(500).json({ error: 'Internal Server Error' });
            break;
        default:
            res.status(statusCode).json({ error: 'Unhandled Error' });
    }
};

export default router.handler(handler());


