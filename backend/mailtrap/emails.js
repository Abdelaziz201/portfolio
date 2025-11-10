import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    CONTACT_FORM_NOTIFICATION_TEMPLATE,
} from "./emailTemplates.js";

dotenv.config();

// Transporter for user emails (password reset, etc.)
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Transporter for admin notifications (contact form)
const adminTransporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
        user: process.env.USER_EMAIL || process.env.EMAIL_USER,
        pass: process.env.USER_PASS || process.env.EMAIL_PASS,
    },
});

const defaultFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER;
const adminEmail = process.env.USER_EMAIL || process.env.EMAIL_USER;

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

export const sendContactFormNotification = async (senderName, senderEmail, message) => {
    if (!process.env.USER_EMAIL || !process.env.USER_PASS) {
        console.warn("Admin email credentials (USER_EMAIL/USER_PASS) are missing. Skipping contact form notification.");
        return;
    }

    const html = CONTACT_FORM_NOTIFICATION_TEMPLATE
        .replace(/{senderName}/g, senderName)
        .replace(/{senderEmail}/g, senderEmail)
        .replace(/{message}/g, message);

    try {
        await adminTransporter.sendMail({
            from: adminEmail,
            to: adminEmail,
            subject: `New Contact Form Message from ${senderName}`,
            html,
            replyTo: senderEmail, // Allow replying directly to the sender
        });
        console.log(`Contact form notification sent to ${adminEmail}`);
    } catch (error) {
        console.error("Error sending contact form notification:", error);
        throw error;
    }
};

