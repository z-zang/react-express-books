import mongoose from "mongoose";

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
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
})

export const UserModel = mongoose.model('User', UserSchema)

export const getUsers = () => UserModel.find();
export const getUserById = (id: string) => UserModel.findById(id)
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken
})
export const createUser = (values: Record<string, any>) => {
    new UserModel(values).save()
    return getUserByEmail(values.email)
} // TODO: fix: currently refetching instead of returning user as select: false fields were being returned
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id })
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values, { new: true })