import { Schema } from 'mongoose'

export var userSchema: Schema = new Schema(
    {
        createdAt: Date,
        modifiedAt: { type: Date, default: Date.now },
        email: {
            type: String,
            match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        firstName: String,
        LastName: String
    });

userSchema.pre("save", (next) => {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});