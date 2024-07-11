import mongoose from "mongoose";

export const connectDB =async ()=>{
    await mongoose.connect('mongodb+srv://sauravlokare:5085@cluster0.hpxh0vc.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}