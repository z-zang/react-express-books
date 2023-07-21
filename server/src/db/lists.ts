import mongoose from "mongoose"

const ListSchema = new mongoose.Schema({
    // listId
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    books: [{
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
        progress: { type: Number }
    }]
})

export const ListModel = mongoose.model('List', ListSchema)

export const getListsById = (id: string) => ListModel.find(id)
export const getListsByUserId = (userId: string) => ListModel.find({ userId })


export const getListsByUser = (userId: string) => ListModel.findById(userId);
export const getUserById = (id: string) => UserModel.findById(id)
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken
})
export const createUser = (values: Record<string, any>) => {
    new UserModel(values).save()
    return getUserByEmail(values.email)
} // TODO: fix: currently refetching instead of returning user as select: false fields were being returned
export const deleteListById = (id: string) => ListModel.findOneAndDelete({ _id: id })
export const updateUserById = (id: string, values: Record<string, any>) => ListModel.findByIdAndUpdate(id, values, { new: true })