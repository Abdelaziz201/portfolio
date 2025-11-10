import {  Github, Instagram, Linkedin,  Mail, MapPin, Phone, Send, Twitter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ContactSection = () =>{
    const [formData, setFormData] = useState({
        name: '',
        Email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
    const [contactInfo, setContactInfo] = useState({
        email: "",
        phone1: "",
        phone2: "",
        location1: "",
        location2: "",
        socialLinks: {
            linkedin: "",
            instagram: "",
            twitter: "",
            github: ""
        }
    });

    // Fetch contact information from backend
    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/contactInfo`);
                if (response.ok) {
                    const data = await response.json();
                    setContactInfo({
                        email: data.email || "",
                        phone1: data.phone1 || "",
                        phone2: data.phone2 || "",
                        location1: data.location1 || "",
                        location2: data.location2 || "",
                        socialLinks: {
                            linkedin: data.socialLinks?.linkedin || "",
                            instagram: data.socialLinks?.instagram || "",
                            twitter: data.socialLinks?.twitter || "",
                            github: data.socialLinks?.github || ""
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        };

        fetchContactInfo();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear status when user starts typing
        if (submitStatus.type) {
            setSubmitStatus({ type: '', message: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            // Send email notification to admin
            const emailResponse = await fetch(`${API_BASE_URL}/getInTouch/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.Email,
                    message: formData.message
                }),
            });

            const emailData = await emailResponse.json();

            if (emailResponse.ok) {
                // Also save to database (optional - for admin panel viewing)
                try {
                    await fetch(`${API_BASE_URL}/getInTouch`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: formData.name,
                            email: formData.Email,
                            message: formData.message
                        }),
                    });
                } catch (dbError) {
                    // If database save fails, it's okay - email was sent
                    console.warn('Failed to save message to database:', dbError);
                }

                setSubmitStatus({
                    type: 'success',
                    message: 'Thank you! Your message has been sent successfully.'
                });
                // Reset form
                setFormData({
                    name: '',
                    Email: '',
                    message: ''
                });
                // Clear success message after 5 seconds
                setTimeout(() => {
                    setSubmitStatus({ type: '', message: '' });
                }, 5000);
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: emailData.message || 'Failed to send message. Please try again.'
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus({
                type: 'error',
                message: 'Network error. Please check your connection and try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    }
    return(
        <section
            id="contact" 
            className="py-24 px-4 relative bg-secondary/30"
        > <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    
                    Get In<span className="text-primary">Touch</span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Have a project in mind or want to collaborate? Feel free to reach out.
                    I'm always open to discussing new opportunities.  
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold">Contact Information</h3>
                        <div className="space-y-6 justify-center">
                            {contactInfo.email && (
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <Mail className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Email</h4>
                                        <a href={`mailto:${contactInfo.email}`} className="text-muted-foreground hover:text-primary transition-colors ">
                                            {contactInfo.email}
                                        </a>
                                    </div>
                                </div>
                            )}
                            {(contactInfo.phone1 || contactInfo.phone2) && (
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <Phone className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Phone</h4>
                                        {contactInfo.phone1 && (
                                            <a href={`tel:${contactInfo.phone1.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-primary transition-colors block">
                                                {contactInfo.phone1}
                                            </a>
                                        )}
                                        {contactInfo.phone2 && (
                                            <a href={`tel:${contactInfo.phone2.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-primary transition-colors block">
                                                {contactInfo.phone2}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                            {(contactInfo.location1 || contactInfo.location2) && (
                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <MapPin className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Location</h4>
                                        <div className="text-muted-foreground">
                                            {contactInfo.location1 && <p>{contactInfo.location1}</p>}
                                            {contactInfo.location2 && <p>{contactInfo.location2}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {(contactInfo.socialLinks.linkedin || contactInfo.socialLinks.instagram || contactInfo.socialLinks.twitter || contactInfo.socialLinks.github) && (
                            <div className="pt-8">
                                <h4 className="font-medium mb-4"> Connect with me </h4>
                                <div className="flex space-x-4 justify-center">
                                    {contactInfo.socialLinks.linkedin && (
                                        <a href={contactInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                            <Linkedin />
                                        </a>
                                    )}
                                    {contactInfo.socialLinks.instagram && (
                                        <a href={contactInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                            <Instagram />
                                        </a>
                                    )}
                                    {contactInfo.socialLinks.twitter && (
                                        <a href={contactInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                            <X />
                                        </a>
                                    )}
                                    {contactInfo.socialLinks.github && (
                                        <a href={contactInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                            <Github />
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="bg-card p-8 rounded-lg shadow-xs">
                        <h3 className="text-2xl font-semibold mb-6">Send me a message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-6">
                                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Ahmed Yousef"
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50" 
                                />
                            </div>

                            <div className="space-y-6">
                                <label htmlFor="Email" className="block text-sm font-medium mb-2">Your Email</label>
                                <input 
                                    type="email" 
                                    id="Email" 
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="example@example.com"
                                    disabled={isSubmitting}
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50" 
                                />
                            </div>
                            
                            <div className="space-y-6">
                                <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                                <textarea 
                                    id="message" 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Hello, I'd like to talk about ..."
                                    disabled={isSubmitting}
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none disabled:opacity-50" 
                                />
                            </div>

                            {/* Status Message */}
                            {submitStatus.message && (
                                <div className={cn(
                                    "p-4 rounded-lg border",
                                    submitStatus.type === 'success' 
                                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                                        : "bg-red-500/10 border-red-500/20 text-red-400"
                                )}>
                                    <p className="text-sm">{submitStatus.message}</p>
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className={cn(
                                    "cosmic-button w-full flex items-center justify-center gap-2",
                                    isSubmitting && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                {!isSubmitting && <Send size={17} />}
                            </button>
                        </form>
                       
                    </div>
                </div>
            </div>
        </section>
    );
};