import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({
    // reviewId
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    reviewText: { type: String },
})

export const ReviewModel = mongoose.model('Review', ReviewSchema)

export const getReviewsByUser = (userId: string) => ReviewModel.find({ userId })
export const getReviewsByBook = (bookId: string) => ReviewModel.find({ bookId })

export const addNewReview = (values: Record<string, any>) => new ReviewModel(values).save().then((review) => review.toObject({ useProjection: true }))
export const deleteReviewById = (id: string) => ReviewModel.findOneAndDelete({ _id: id })
