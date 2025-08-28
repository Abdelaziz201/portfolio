import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "../components/StarBackground";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
export const Home = () => {
    return( 
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            
            {/* them toggle */}    
                <ThemeToggle />

            {/* background Effects */ }
                <StarBackground />

            {/* navbar */}
                <Navbar />

            {/* main content  */}   
                <main>
                    <HeroSection/>
                    <AboutSection/>
                </main> 

        </div>
    );
}