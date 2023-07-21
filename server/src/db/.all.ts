import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    // bookId
    title: { type: String, required: true },
    author: { type: String, required: true },
    tags: [{ type: String }],
    pages: { type: Number },
    imageUrl: { type: String },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review", required: true }]
})

export const BookModel = mongoose.model('Book', BookSchema)

const ListSchema = new mongoose.Schema({
    // listId
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    books: [{
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
        progress: { type: Number }
    }]
})

const ReviewSchema = new mongoose.Schema({
    // reviewId
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    reviewText: { type: String },
})

const UserSchema = new mongoose.Schema({
    // userId
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    authentication: {
        password: { type: String, required: true, select: false }, // do not provide pw data to api
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    history: [{
        actionTime: { type: Date },
        actionType: { type: String },
        details: {}
    }]
})

export const UserModel = mongoose.model('User', UserSchema)

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken
})
export const getUserById = (id: string) => UserModel.findById(id)

// TODO: fix: currently refetching instead of returning user as select: false fields were being returned
// export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject({ useProjection: true }))
export const createUser = (values: Record<string, any>) => {
    new UserModel(values).save()
    return getUserByEmail(values.email)
}

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id })
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values, { new: true })