const mongoose = require("mongoose");
/* For more information, see https://mongoosejs.com/docs/schematypes.html#objectids */

const notificationSchema = new mongoose.Schema({
    Task: {
        type: Schema.Types.ObjectId,
        reference: "Task",
        required: true,
    },
    enabled: {
        type: Boolean,
        default: true,
    },
    channel: {
        email: { type: Boolean, default: false },
        push: { type: Boolean, default: true },
    },
    triggerDay: Date,
    notificationTimeMinutesBefore: {
        type: Number,
        default: 60,
    },
    isRecurring: { type: Boolean, default: false },
    intervalInDays: { type: Number },
    repeatUntil: { type: Date },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
