import { Schema, model } from "mongoose";


const specialSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    description: {
        type: String
    },
    urgency: {
        type: String,
        enum: ["Immediate", "1-2 weeks", "Flexible"],
        required: [true, 'Category is required']
    },
    nda: {
        type: Boolean,
        default: true
    },
    budgetRange: {
        type: String,
        required: [true, 'Budget is required']
    },
    photos: {
        type: [String]
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    role: {
        type: String,
        required: [true, 'Role is required']
    },
    prefferredCommunication: {
        type: String,
        enum: ["Email", "Phone", "In_app"],
        default: "In_app"
    },
    contactTime: {
        type: String,
        enum: ["Morning", "Afternoon", "Evening"]
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["Submitted", "Proposal_Sent", "In_Progress", "In_Review", "Delivered"],
        default: "Submitted"
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Special = model('Special', specialSchema);