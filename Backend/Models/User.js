import mongoose from 'mongoose';
const { Schema } = mongoose;

// Student Schema
const StudentSchema = new Schema({
    stuName: { type: String, required: true, trim: true },
    stuGender: { type: String, required: true, trim: true },
    stuEmail: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        trim: true, 
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    stuId: { type: String, required: true, trim: true },
    stuPhone: { 
        type: String, 
        required: true, 
        trim: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    stuPassword: { type: String, required: true },
    stuPhoto: { type: String, required: true },
    // cameraStatus: { type: Boolean, default: false }
});

// Apply toJSON transformation to StudentSchema
StudentSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.stuPassword;
        return ret;
    }
});

// Teacher Schema
const TeacherSchema = new Schema({
    teaName: { type: String, required: true, trim: true },
    teaId: { type: String, required: true, trim: true },
    teaGender: { type: String, required: true, trim: true },
    teaEmail: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        trim: true, 
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    teaPassword: { type: String, required: true },
    teaStatus: { type: String, required: true, default: "OFF" },
});

// Apply toJSON transformation to TeacherSchema
TeacherSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.teaPassword;
        return ret;
    }
});

// Create Models
export const StudentModel = mongoose.model('Student', StudentSchema);
export const TeacherModel = mongoose.model('Teacher', TeacherSchema);
