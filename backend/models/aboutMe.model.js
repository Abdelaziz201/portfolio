import mongoose from "mongoose";

const aboutMeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: false,
    },
    firstParagraph:{
        type: String,
        required: false,
    },
    secondParagraph:{
        type: String,
        required: false,
    },
    fisrtGrid:{
        type: String,
        required: false,
    },
    secondGrid:{
        type: String,
        required: false,
    },
    thirdGrid:{
        type: String,
        required: false,
    },
    fourthGrid:{
        type: String,
        required: false,
    },
    fifthGrid:{
        type: String,
        required: false,
    },
    sixthGrid:{
        type: String,
        required: false,
    },
    cvUrl:{
        type: String,
        required: false,
    },
}, {
        timestamps: true,
    
})

const AboutMe = mongoose.model("AboutMe", aboutMeSchema);
export default AboutMe;