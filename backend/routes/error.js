const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require('dotenv').config();


const email = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
router.post("/error/sendReport", async (req, res) => {
    try {
        const { issueType, moreInfo } = req.body;

        const mailer = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: email,
                pass: pass
            }
        })

        const mailInfo = {
            from: `${email}`,
            to: `${email}`,
            subject: `Error Report: ${issueType}`,
            text: `Error Type: ${issueType}\n\nDescription:\n${moreInfo}`
        }

        await mailer.sendMail(mailInfo);
        res.status(200).send("Report sucessfully sent.");
    } catch (error) {
        console.error("Error sending report:", error);
    }
})

module.exports = router;