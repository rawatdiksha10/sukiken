import { InferSchemaType, model, Schema } from "mongoose";

const userInfoSchema = new Schema({
    userid:{type:String, required:true, unique:true},
    recompoint: {type:String, required:true},
    totalexp : {type:String, required:true},
    jpexp : {type:String, required:true},
    japanese : {type:String, required:true},
    jpexamname:{type:String, required:true},
    jppassedlevel: {type:String, required:true},
    english : {type:String, required:true},
    otherlang : {type:String, required:true},
    techskill : {type:String, required:true},
    appeal:{type:String, required:true},
    statusid:{type:Number, required:true},
    hourlywage:{type:Number, required:true},
    delflg: {type:Number, required:true, default:0}
}, {timestamps:true});

type UserInfo = InferSchemaType<typeof userInfoSchema>;

export default model<UserInfo>("UserInfo", userInfoSchema);