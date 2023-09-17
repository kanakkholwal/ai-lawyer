import mongoose from "mongoose";


const FeedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    feedback: String,
    rating: Number,
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
});


export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);


export type FeedBackType ={
    _id?:string
    user: string | object,
    feedback: string,
    rating: number,
    createdAt?: Date,
}