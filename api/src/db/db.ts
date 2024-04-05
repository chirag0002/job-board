const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.DB)

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 64,
        required: true
    },
    email: {
        type: String,
        unique: true,
        maxlength: 128,
        required: true
    },
    role:{
        type: String,
        required: true
    }
});

const jobSchema = new mongoose.Schema({
    logo:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    org:{
        type: String,
        required: true
    },
    compensation:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    admin:{
        email:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        role:{
            type: String,
            required: true
        }
    }
});


export const Admin = mongoose.model('Admin', adminSchema)
export const Job = mongoose.model('Job', jobSchema)