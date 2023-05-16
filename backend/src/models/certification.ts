import { InferSchemaType, model, Schema } from "mongoose";

const certificationSchema = new Schema({
    userid:{type:String, required:true, unique:true},
    acqdate: {type:String, required:true},
    source : {type:String, required:true},
    name : {type:String, required:true},
    delflg: {type:Number, required:true, default:0}
}, {timestamps:true});

type Certification = InferSchemaType<typeof certificationSchema>;

export default model<Certification>("Certification", certificationSchema);