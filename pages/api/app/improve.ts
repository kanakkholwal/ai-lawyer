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

        const builtPrompt = `
        As a legal expert, please assist me in refining a section of this document. Here is the document in question:
        ${doc}
        
        I need to enhance the following section:
        ${section}
        
        To do this, please provide a concise and precise revision using the following prompt:
        ${prompt}
        `;

        // Ensure that the prompt is a single string without any line breaks or extra spaces
        // const cleanedPrompt = builtPrompt.replace(/\n/g, '');


        // const completion = await openai.completions.create({
        //     model: "gpt-3.5-turbo",
        //     prompt: cleanedPrompt,
        //     max_tokens: 100,
        // });

        // console.log(completion);
        const cleanedPrompt = builtPrompt.replace(/\n/g, '');

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: cleanedPrompt }],
            max_tokens: 100,
        });

        console.log(completion);

        const response = completion.choices[0]?.message.content ?? "No response";
        console.log(response);
        const usage = completion.usage
        console.log(usage);



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


