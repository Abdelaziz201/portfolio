import mongoose from "mongoose";

const getInTouchSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
}, {
        timestamps: true,
    
})

const GetInTouch = mongoose.model("GetInTouch", getInTouchSchema);
export default GetInTouch;
