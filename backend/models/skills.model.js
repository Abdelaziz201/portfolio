import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
    skill:{
        name: String,
        level: Number,
        category: String,
    },
    }, {
        timestamps: true,
    
})

const Skills = mongoose.model("Skills", skillsSchema);
export default Skills;