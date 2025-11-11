import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
    title: String,
    description: String,
    images: [String], // Array of image paths
    tags: [String],
    githubUrl: String,
    demoUrl: String,
}, {
        timestamps: true,
})

const Projects = mongoose.model("Projects", projectsSchema);
export default Projects;