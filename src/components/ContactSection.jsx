import {  Github, Instagram, Linkedin,  Mail, MapPin, Phone, Send, Twitter, X } from "lucide-react";
import { cn } from "@/lib/utils";
export const ContactSection = () =>{
       
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setTimeout(() => {

        },1500);
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
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Email</h4>
                                    <a href="mailto:abdelaziz2012004@gmail.com" className="text-muted-foreground hover:text-primary transition-colors ">
                                        abdelaziz2012004@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Phone</h4>
                                    <a href="tel:+905312468942" className="text-muted-foreground hover:text-primary transition-colors ">
                                        +905312468942
                                    </a>
                                </div>
                            </div> <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="font-medium">Location</h4>
                                    <a className="text-muted-foreground hover:text-primary transition-colors ">
                                       <p>Qatar, Doha</p>
                                       <p>Turkey, Ankara</p>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <h4 className="font-medium mb-4"> Connect with me </h4>
                            <div className="flex space-x-4 justify-center">
                                <a href="https://www.linkedin.com/in/abdelaziz201/" target="_blank" rel="noopener noreferrer">
                                    <Linkedin />
                                </a>
                                <a>
                                    <Instagram />
                                </a> <a>
                                    <X />
                                </a> <a>
                                    <Github />
                                </a>

                            </div>
                        </div>
                    </div>
                    <div className="bg-card p-8 rounded-lg shadow-xs">
                        <h3 className="text-2xl font-semibold mb-6">Send me a message</h3>
                        <form className="space-y-6">
                            <div className="space-y-6">
                                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name"
                                    required
                                    placeholder="Ahmed Yousef"
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary" 
                                />
                            </div>

                            <div className="space-y-6">
                                <label htmlFor="Email" className="block text-sm font-medium mb-2">Your Email</label>
                                <input 
                                    type="text" 
                                    id="Email" 
                                    name="Email"
                                    required
                                    placeholder="example@example.com"
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary" 
                                />
                            </div>
                            
                            <div className="space-y-6">
                                <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                                <textarea 
                                    type="text" 
                                    id="message" 
                                    name="message"
                                    required
                                    placeholder="Hello, I'd like to talk about ..."
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none" 
                                />
                            </div>

                            <button type="submit" className={cn("cosmic-button w-full flex items-center justify-center gap-2")}>
                                Send Message
                                <Send  size={17}/>
                            </button>
                        </form>
                       
                    </div>
                </div>
            </div>
        </section>
    );
};