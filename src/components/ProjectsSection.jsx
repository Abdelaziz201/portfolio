// import { ExternalLink, Github } from "lucide-react";
// import { useState } from "react";

// const projects = [
//   {
//     id: 1,
//     title: "Event management",
//     Description: "An Event management website for companies that organize venues",
//     images: [
//       "projects/bokd 1.png",
//       "projects/bokd 2.png"
//     ],
//     tags: ["React.js", "Node.js", "MongoDB"],
//     githupUrl: "https://github.com/Abdelaziz201/bokd",
//     demoUrl: "https://bokd.onrender.com/"
//   }
// ];

// export const ProjectsSection = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   return (
//     <section id="projects" className="py-24 px-4 relative">
//       <div className="container mx-auto max-w-5xl">
//         <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
//           Featured <span className="text-primary">Projects</span>
//         </h2>
//         <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
//           Here are some of my recent projects. Each project was carefully created with
//           attention to detail, performance, and user experience.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {projects.map((project, key) => (
//             <div
//               key={key}
//               className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
//             >
//               <div className="grid grid-cols-2 gap-2 h-48 overflow-hidden">
//                 {project.images.map((img, i) => (
//                   <img
//                     key={i}
//                     src={img}
//                     alt={`${project.title} screenshot ${i + 1}`}
//                     className="w-full h-full object-contain rounded-md cursor-pointer "
//                     onClick={() => setSelectedImage(img)} 
//                   />
//                 ))}
//               </div>

//               <div className="p-6">
//                     <div className="flex flex-wrap gap-2 mb-4">
//                     {project.tags.map((tag) => (
//                         <span
//                         key={tag}
//                         className="px-2 py-1 text-xs border font-medium rounded-full bg-secondary text-secondary-foreground"
//                         >
//                         {tag}
//                         </span>
//                     ))}
//                     </div>
                
//                 <h3 className="text-xl font-semibold mb-1">
//                     {project.title}
//                 </h3>
//                 <p className="text-muted-foreground text-sm mb-4">
//                     {project.Description}
//                 </p>
//                 <div className="flex justify-between items-center">
//                     <div className="flex space-x-3">
//                         <a href={project.demoUrl} target="_blank" className="text-foreground/80 hover:text-primary transition-colors duration-300">
//                             <ExternalLink size={20}/>
//                         </a>
//                         <a href={project.githupUrl} target="_blank" className="text-foreground/80 hover:text-primary transition-colors duration-300">
//                             <Github size={20}/>
//                         </a>
//                     </div>
//                 </div>
//               </div>    
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Image Preview Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//           onClick={() => setSelectedImage(null)}
//         >
//           <img
//             src={selectedImage}
//             alt="Full Preview"
//             className="max-w-[90%] max-h-[90%] rounded-lg"
//           />
//         </div>
//       )}
//     </section>
//   );
// };

import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Event Management System",
    description: "An event management website for companies that organize venues with booking capabilities and admin dashboard",
    images: [
      "projects/bokd1.png",
      "projects/bokd2.png"
    ],
    tags: ["React.js", "Node.js", "MongoDB", "Express"],
    githubUrl: "https://github.com/Abdelaziz201/bokd",
    demoUrl: "https://bokd.onrender.com/"
  }
];

export const ProjectsSection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <section id="projects" className="py-20 px-4 relative bg-gradient-to-b from-background to-muted/5">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header - Centered for symmetry */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are my recent projects, carefully crafted with attention to detail, 
            performance, and user experience.
          </p>
        </div>

        {/* Main Project Card - Perfectly symmetrical */}
        <div className="bg-card rounded-2xl shadow-2xl border overflow-hidden mx-auto max-w-4xl">
          {/* Project Content Grid - Symmetrical by design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section - Left side */}
            <div className="relative group">
              <div className="aspect-video bg-muted/10 flex items-center justify-center p-4">
                <img
                  src={projects[0].images[currentImageIndex]}
                  alt={`${projects[0].title} screenshot`}
                  className="w-full h-full object-contain rounded-lg cursor-pointer transition-transform duration-500 group-hover:scale-105"
                  onClick={() => setSelectedImage(projects[0].images[currentImageIndex])}
                />
                
                {/* Navigation Arrows */}
                {projects[0].images.length > 1 && (
                  <>
                    <button 
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/90 p-2 rounded-full hover:bg-background transition-colors shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => 
                          prev === 0 ? projects[0].images.length - 1 : prev - 1
                        );
                      }}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/90 p-2 rounded-full hover:bg-background transition-colors shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => 
                          prev === projects[0].images.length - 1 ? 0 : prev + 1
                        );
                      }}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
              
              {/* Image Indicators - Centered */}
              {projects[0].images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-background/80 px-3 py-1.5 rounded-full">
                  {projects[0].images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-primary scale-125' : 'bg-muted-foreground/50'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details Section - Right side */}
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left">
                {projects[0].title}
              </h3>
              
              <p className="text-muted-foreground mb-6 text-center lg:text-left leading-relaxed">
                {projects[0].description}
              </p>
              
              {/* Tags - Centered for symmetry */}
              <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                {projects[0].tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Buttons - Centered for symmetry */}
              <div className="flex gap-4 justify-center lg:justify-start">
                <a 
                  href={projects[0].demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-md"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
                <a 
                  href={projects[0].githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 border rounded-full font-medium hover:bg-accent transition-colors"
                >
                  <Github size={16} />
                  View Code
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Section - Perfectly centered */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-0.5 my-8 bg-border border-0 rounded" />
            <span className="absolute px-3 font-medium text-muted-foreground -translate-x-1/2 bg-background left-1/2">
              More Coming Soon
            </span>
          </div>
          
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="w-3 h-3 rounded-full bg-muted animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Image Preview Modal - Much Larger */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative max-w-6xl w-full max-h-[90vh] bg-background rounded-xl overflow-hidden shadow-2xl flex flex-col">
              {/* Header with title and close button */}
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">{projects[0].title} - Preview</h3>
                <button 
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Image container with maximum size */}
              <div className="flex-1 overflow-auto flex items-center justify-center p-4">
                <img
                  src={selectedImage}
                  alt="Full Preview"
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
              
              {/* Navigation controls for modal */}
              {projects[0].images.length > 1 && (
                <div className="p-4 border-t flex justify-center gap-4">
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    onClick={() => {
                      const newIndex = currentImageIndex === 0 
                        ? projects[0].images.length - 1 
                        : currentImageIndex - 1;
                      setCurrentImageIndex(newIndex);
                      setSelectedImage(projects[0].images[newIndex]);
                    }}
                  >
                    <ChevronLeft size={20} />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {projects[0].images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-primary' : 'bg-muted-foreground/50'
                        }`}
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setSelectedImage(projects[0].images[index]);
                        }}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    onClick={() => {
                      const newIndex = currentImageIndex === projects[0].images.length - 1 
                        ? 0 
                        : currentImageIndex + 1;
                      setCurrentImageIndex(newIndex);
                      setSelectedImage(projects[0].images[newIndex]);
                    }}
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};