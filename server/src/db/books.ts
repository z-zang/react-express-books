import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    // bookId
    title: { type: String, required: true },
    author: { type: String, required: true },
    tags: [{ type: String }],
    pages: { type: Number },
    imageUrl: { type: String },
    // reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review", required: true }]
})

export const BookModel = mongoose.model('Book', BookSchema)

export const getBooks = () => BookModel.find();
export const getBookById = (id: string) => BookModel.findById(id);
export const getBookByTags = (tagsArray: string) => BookModel.find({ pets: { $in: tagsArray } });

/*
In controller:
var keywords = ["xd", "sd", "ad"],
    regex = keywords.join("|");
    pass regex to model


    db.papertest.find({
    "category": {
        "$regex": regex,
        "$options": "i"
    }
});
*/
// export const getBookBySearch = (searchRegex: RegExp) => BookModel.find({})
// get books by tags
// find books in generaL

