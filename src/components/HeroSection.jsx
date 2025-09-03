import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export const HeroSection = () => {
    const [showScroll, setShowScroll] = useState(true);
    useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScroll(false);
      } else {
        setShowScroll(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    return ( 
    <section id="hero" className="relative min-h-screen flex flex-col item-center justify-center px-4">
        <div className="container max-w-4xl mx-auto text-center relative z-10">
            <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    <span className="opacity-0 animate-fade-in">Hi, I'm</span>
                    <span className="text-primary opacity-0 animate-fade-in-delay-1"> Abdelaziz</span>
                    <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2"> Abdelkarim</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">Recently graduated in Software Engineering. Motivated and results-driven Full-Stack
                    Developer with a strong foundation in front-end and back-end technologies, with
                    professional focus on building scalable applications using Node.js and React.js.
                    Experienced in developing efficient, user-friendly solutions and collaborating across
                    teams to deliver impactful projects. Passionate about exploring FastAPI for AI-driven
                    backends and expanding expertise in DevOps to enhance deployment and system
                    reliability.
                </p>

                <div className="pt-4 opacity-0 animate-fade-in-delay-4">
                    <a href="#projects" className="cosmic-button ">
                        View My Work
                    </a>
                </div>
            </div>
        </div>

        {/* Only show if user hasn’t scrolled */}
        
        {showScroll && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce transition-opacity duration-500 ">
            <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
            <ArrowDown className="h-5 w-5 text-primary" />
            </div>
        )}
    </section>

    );
};