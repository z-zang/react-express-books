import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false }, // do not provide pw data to api
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false }
    }
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