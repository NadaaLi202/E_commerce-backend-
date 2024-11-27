
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        trim : true,
        minLength : [3, 'User name must be at least 3 characters long'],
        maxLength : [30, 'User name must be at most 30 characters long']
    },

    email : {
        type : String,
        required : true,
        unique : [true, 'User email must be unique'],
        trim : true,
        lowercase : true,
        // validate : {
        //     validator : (value) => {
        //         const re = /^ [a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
        //         return re.test(String(value).toLowerCase())
        //     },
        //     message : 'User email is not valid'
        // },
    },

    password : {
        type : String,
        required : true,
        minLength : [6, 'User password must be at least 6 characters long'],
        maxLength : [30, 'User password must be at most 30 characters long']
    },

    passwordChangedAt : Date ,
    loggedOutAt : Date,
    
    role : {
            type : String,
            enum : ['user','admin'],
            default : 'user'
        },

    isActive : {
        type : Boolean,
        default : true
    },
    verified : {
        type : Boolean,
        default : false
    },
    phone : {
        type : String,
        unique : [true, 'User phone number must be unique'],
    //     validate : {
    //         validator : (value) => {
    //             const re = /^[0-9]{10}$/
    //             return re.test(String(value))
    //         },
    //         message : 'User phone number is not valid'
    //     },
    },
    profilePic : {
        type : String
    },
    wishList :
    [{type: mongoose.Schema.Types.ObjectId, ref: 'product'}],
    addresses:[{
        city: String,
        street: String,
        phone: String
    }],
},{timestamps: true})


// mongoose middleware
// userSchema.pre('save', function ()  {

// this.password = bcrypt.hashSync(this.password,10)
// }) 

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = bcrypt.hashSync(this.password, 10);

    // Set passwordChangedAt when the password is modified or during user creation
    this.passwordChangedAt = Date.now();

    next();
});

userSchema.pre('findOneAndUpdate',function () {

    console.log(this._update.password)
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password,10)
})

export const userModel = mongoose.model('user',userSchema)