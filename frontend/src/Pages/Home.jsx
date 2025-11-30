import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { SpaceWeatherSection } from "../components/SpaceWeatherSection";
import {ContactSection} from "../components/ContactSection"
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
export const Home = () => {
    const navigate = useNavigate();

    const handleStarClick = () => {
        // Check if user is logged in
        const token = localStorage.getItem('authToken');
        
        if (token) {
            // User is logged in, go to admin panel
            navigate('/admin');
        } else {
            // User is not logged in, go to login page
            navigate('/login');
        }
    };

    return( 
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">

            {/* background Effects */ }
                <StarBackground />

            {/* Hidden Login Star Button - Top Left */}
            <button
                onClick={handleStarClick}
                className={cn(
                    "fixed left-5 z-50 transition-all duration-300",
                    "focus:outline-none focus:ring-2 focus:ring-primary/30",
                    "hover:scale-110 active:scale-95"
                )}
                aria-label="Login"
                style={{
                    top: '80px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    boxShadow: '0 0 6px 1px rgba(255, 255, 255, 0.3)',
                    opacity: 0.7,
                    animation: 'pulse-subtle 3s ease-in-out infinite'
                }}
            />

            {/* navbar */}
                <Navbar />

            {/* main content  */}   
                <main className="flex-grow">
                    <HeroSection/>
                    <AboutSection/>
                    <SkillsSection/>
                    <ProjectsSection/>
                    {/* <SpaceWeatherSection/> */}
                    <ContactSection/>
                </main> 

            {/* footer */}
                <Footer />

        </div>
    );
}