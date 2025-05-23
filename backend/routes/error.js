const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require('dotenv').config();

router.post("/error/sendReport", async (req, res) => {
    try {
        const { issueType, moreInfo } = req.body;

        const mailer = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    } catch (error) {
        console.error("Error sending report:", error);
    }
})

module.exports = router;