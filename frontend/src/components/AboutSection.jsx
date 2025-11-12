import { Briefcase, Code, User, Container, Bug, FileCode2 } from "lucide-react";
import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Icon mapping
const iconMap = {
  Code: Code,
  User: User,
  Briefcase: Briefcase,
  Container: Container,
  Bug: Bug,
  FileCode: FileCode2,
};

export const AboutSection = () => {
  const [aboutData, setAboutData] = useState({
    title: "Passionate Full-Stack Developer",
    firstParagraph: "write here more",
    secondParagraph: "write here even more",
    services: [
      { icon: "Code", title: "Web Development", description: "Creating responsive websites and web applications with modern frameworks." },
      { icon: "User", title: "UI/UX Design", description: "Designing intuitive user interfaces and seamless user experiences." },
      { icon: "Briefcase", title: "Project Management", description: "Leading projects from conception to completion with agile methodologies." }
    ],
    cvUrl: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutMe = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/aboutMe`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const about = data[0];
            
            // Parse services from grid fields (only first 3)
            let services = [];
            const gridFields = ['fisrtGrid', 'secondGrid', 'thirdGrid'];
            
            try {
              gridFields.forEach((field) => {
                if (about[field]) {
                  const service = JSON.parse(about[field]);
                  if (service && service.title) {
                    services.push(service);
                  }
                }
              });
            } catch (e) {
              console.error('Error parsing service data:', e);
            }
            
            // If no services found, use defaults
            if (services.length === 0) {
              services = [
                { icon: "Code", title: "Web Development", description: "Creating responsive websites and web applications with modern frameworks." },
                { icon: "User", title: "UI/UX Design", description: "Designing intuitive user interfaces and seamless user experiences." },
                { icon: "Briefcase", title: "Project Management", description: "Leading projects from conception to completion with agile methodologies." }
              ];
            }
            
            // Limit to 3 services
            services = services.slice(0, 3);

            setAboutData({
              title: about.title || "Passionate Full-Stack Developer",
              firstParagraph: about.firstParagraph || "",
              secondParagraph: about.secondParagraph || "",
              services: services,
              cvUrl: ""
            });
          }
        }
      } catch (error) {
        console.error('Error fetching about me:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutMe();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-24 px-4 relative">
      
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          About <span className="text-primary"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              {aboutData.title}
            </h3>

            <p className="text-muted-foreground">
              {aboutData.firstParagraph}
            </p>

            <p className="text-muted-foreground">
              {aboutData.secondParagraph}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>

              {aboutData.cvUrl && (
                <a
                  href={aboutData.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                >
                  Download CV
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {aboutData.services.slice(0, 3).map((service, index) => {
              const IconComponent = iconMap[service.icon] || Code;
              return (
                <div key={index} className="gradient-border p-6 card-hover">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-lg">{service.title}</h4>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};