import { InferSchemaType, model, Schema } from "mongoose";

const specExpSchema = new Schema({
    userid:{type:String, required:true, unique:true},
    content: {type:String, required:true},
    specexp : {type:String, required:true},
    exptypeflg : {type:Number, required:true},
    delflg: {type:Number, required:true, default:0}
}, {timestamps:true});

type SpecExp = InferSchemaType<typeof specExpSchema>;

export default model<SpecExp>("SpecExp", specExpSchema);