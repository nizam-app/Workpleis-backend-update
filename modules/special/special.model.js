import { Schema, model } from "mongoose";


const specialSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim : true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim : true
    },
    description: {
        type: String
    },
    urgency: {
        type: String,
        enum: ["Immediate", "1-2 weeks", "Flexible"],
        required: [true, 'Urgency is required'],
        trim : true
    },
    nda: {
        type: Boolean,
        default: true
    },
    budgetRange: {
        type: String,
        required: [true, 'Budget is required'],
        trim : true
    },
    photos: {
        type: [String]
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim : true
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        trim : true
    },
    prefferredCommunication: {
        type: String,
        enum: ["Email", "Phone", "In_app"],
        default: "In_app",
        trim : true
    },
    contactTime: {
        type: String,
        enum: ["Morning", "Afternoon", "Evening"],
        trim : true
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

const Special = model('Special', specialSchema);

export default Special;
