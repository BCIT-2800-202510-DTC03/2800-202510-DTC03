const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        minimumLength: 10,
        required: true,
    },
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
