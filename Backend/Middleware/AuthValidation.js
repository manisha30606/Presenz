import Joi from 'joi';

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        stuName: Joi.string()
            .min(3)
            .max(100)
            .required()
            .messages({
                "string.stuty": "stuloyee name is required.",
                "string.min": "stuloyee name must be at least 3 characters long.",
                "string.max": "stuloyee name must not exceed 100 characters."
            }),
            stuGender: Joi.string()
            .min(4)
            .max(10)
            .required()
            .messages({
                "string.stuty": "stuloyee gender is required.",
                "string.min": "stuloyee gender must be at least 3 characters long.",
                "string.max": "stuloyee gender must not exceed 100 characters."
            }),
        stuEmail: Joi.string()
            .email()
            .required()
            .messages({
                "string.stuty": "Email is required.",
                "string.email": "Please provide a valid email address."
            }),
        stuPhone: Joi.string()
            .pattern(/^[0-9]{10}$/, 'numbers')
            .required()
            .messages({
                "string.stuty": "Phone number is required.",
                "string.pattern.base": "Phone number must be a valid 10-digit number."
            }),
        stuPassword: Joi.string()
            .min(6)
            .max(15)
            .required()
            .messages({
                "string.stuty": "Password is required.",
                "string.min": "Password must be at least 6 characters long.",
                "string.max": "Password must not exceed 15 characters."
            }),
        stuId: Joi.string()
            .min(4)
            .max(8)
            .required()
            .messages({
                "string.stuty": "stuloyee ID is required.",
                "string.min": "stuloyee ID must be at least 4 characters long.",
                "string.max": "stuloyee ID must not exceed 8 characters."
            }),
        stuPhoto: Joi.string()
            .required()
            .messages({
                "string.stuty": "Photo is required."
            }),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: "Validation failed.",
            errors: error.details.map(err => err.message) // Return an array of validation errors
        });
    }
    next();
};


// Login Validation
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        stuName: Joi.string().min(3).max(100).required(),
        stuId: Joi.string().min(4).max(8).required(),
        stuPassword: Joi.string().min(4).max(10).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message  
        });
    }
    next();
};

// teacher Signup Validation
const teacherSignupValidation = (req, res, next) => {
    const schema = Joi.object({
        teaName: Joi.string().min(3).max(100).required(),
        teaGender: Joi.string().min(4).max(10).required(),
        teaId: Joi.string().min(3).max(50).required(), // Validating the teaId field
        teaEmail: Joi.string().email().required(),
        teaPassword: Joi.string().min(6).max(12).required(),
        cameraStatus: Joi.boolean().default(false), // Corrected validation for boolean type
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message,
        });
    }
    next();
};

// teacher Login Validation
 const teacherLoginValidation = (req, res, next) => {
    const schema = Joi.object({
        teaEmail: Joi.string().email().required(),
        teaPassword: Joi.string().min(6).max(12).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message,
        });
    }
    next();
};

// Exporting both validations
export { signupValidation, loginValidation, teacherLoginValidation ,teacherSignupValidation};