import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const defaultFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER;

const sendMail = async ({ to, subject, html }) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("Email credentials are missing. Skipping email send.");
        return;
    }

    await transporter.sendMail({
        from: defaultFrom,
        to,
        subject,
        html,
    });
};

export const sendPasswordResetEmail = async (email, resetToken) => {
    const baseUrl = process.env.PASSWORD_RESET_URL || process.env.FRONTEND_URL || "http://localhost:3000";
    const resetURL = `${baseUrl.replace(/\/$/, "")}/reset-password?token=${resetToken}`;
    const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL);

    await sendMail({
        to: email,
        subject: "Reset your password",
        html,
    });
};

export const sendPasswordResetSuccessEmail = async (email) => {
    const html = PASSWORD_RESET_SUCCESS_TEMPLATE;

    await sendMail({
        to: email,
        subject: "Your password has been reset",
        html,
    });
};

