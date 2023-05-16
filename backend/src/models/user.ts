import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    userid:{type:String, required:true, unique:true},
    name: {type:String, required:true},
    password : {type:String, required:true},
    roleflag : {type:Number, required:true}

}, {timestamps:true});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);