import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    tags: [String],
    githubUrl: String,
    demoUrl: String,
}, {
        timestamps: true,
})

const Projects = mongoose.model("Projects", projectsSchema);
export default Projects;