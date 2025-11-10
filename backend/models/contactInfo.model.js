import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema({
    email: {
        type: String,
        default: ""
    },
    phone1: {
        type: String,
        default: ""
    },
    phone2: {
        type: String,
        default: ""
    },
    location1: {
        type: String,
        default: ""
    },
    location2: {
        type: String,
        default: ""
    },
    socialLinks: {
        linkedin: {
            type: String,
            default: ""
        },
        instagram: {
            type: String,
            default: ""
        },
        twitter: {
            type: String,
            default: ""
        },
        github: {
            type: String,
            default: ""
        }
    }
}, {
    timestamps: true,
});

// Ensure only one document exists
contactInfoSchema.statics.getContactInfo = async function() {
    let contactInfo = await this.findOne();
    if (!contactInfo) {
        contactInfo = await this.create({});
    }
    return contactInfo;
};

const ContactInfo = mongoose.model("ContactInfo", contactInfoSchema);
export default ContactInfo;

