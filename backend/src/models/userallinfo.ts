import { InferSchemaType, model, Schema } from "mongoose";

const userAllInfoSchema = new Schema({
    userid:{type:String, required:true, unique:true},
    name: {type:String, required:true},
    password : {type:String, required:true},
    roleflag : {type:Number, required:true},
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
    hourlywage:{type:Number, required:true},
    speccontent: {type:String, required:true},
    specexp : {type:String, required:true},
    exptypeflg : {type:Number, required:true},
    jobcontent: {type:String, required:true},
    tech : {type:String, required:true},
    roleandscale : {type:String, required:true},
    acqdate: {type:String, required:true},
    source : {type:String, required:true},
    certificatename : {type:String, required:true},
    statusid : {type:Number, required:true},
    statusname : {type:String, required:true},

}, {timestamps:true});

type UserAllInfo = InferSchemaType<typeof userAllInfoSchema>;

export default model<UserAllInfo>("UserAllInfo", userAllInfoSchema);