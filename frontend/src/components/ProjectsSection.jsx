

import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // Track current image index for each project
  const [projectImageIndices, setProjectImageIndices] = useState({});

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
          // Initialize image indices for all projects
          const indices = {};
          data.forEach((_, index) => {
            indices[index] = 0;
          });
          setProjectImageIndices(indices);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Helper to update image index for a specific project
  const updateProjectImageIndex = (projectIndex, newIndex) => {
    setProjectImageIndices(prev => ({
      ...prev,
      [projectIndex]: newIndex
    }));
  };

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    // If it's already a full URL (http/https), return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    // If it starts with /api/photos, prepend the base URL
    if (imagePath.startsWith('/api/photos/')) {
      const baseUrl = API_BASE_URL.replace('/api', '');
      return `${baseUrl}${imagePath}`;
    }
    // If it's a relative path, assume it's from public folder
    return imagePath;
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 relative bg-gradient-to-b from-background to-muted/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-20 px-4 relative bg-gradient-to-b from-background to-muted/5">
        <div className="container mx-auto max-w-6xl">
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
          <div className="text-center py-20">
            <p className="text-muted-foreground">No projects available yet.</p>
          </div>
        </div>
      </section>
    );
  }

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

        {/* Projects Grid - All projects stacked vertically */}
        <div className="space-y-8">
          {projects.map((project, projectIndex) => {
            const projectImages = project.images || [];
            const currentImageIdx = projectImageIndices[projectIndex] || 0;
            const currentImageUrl = projectImages[currentImageIdx] ? getImageUrl(projectImages[currentImageIdx]) : '';

            return (
              <div key={project._id || projectIndex} className="bg-card rounded-2xl shadow-2xl border overflow-hidden">
                {/* Project Content Grid - Symmetrical by design */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image Section - Left side */}
                  <div className="relative group">
                    <div className="aspect-video bg-muted/10 flex items-center justify-center p-4">
                      {currentImageUrl ? (
                        <img
                          src={currentImageUrl}
                          alt={`${project.title} screenshot`}
                          className="w-full h-full object-contain rounded-lg cursor-pointer transition-transform duration-500 group-hover:scale-105"
                          onClick={() => {
                            setSelectedImage(currentImageUrl);
                            setSelectedProjectIndex(projectIndex);
                            setSelectedImageIndex(currentImageIdx);
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="text-muted-foreground">No image available</div>
                      )}
                      
                      {/* Navigation Arrows */}
                      {projectImages.length > 1 && (
                        <>
                          <button 
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/90 p-2 rounded-full hover:bg-background transition-colors shadow-md z-10"
                            onClick={(e) => {
                              e.stopPropagation();
                              const newIndex = currentImageIdx === 0 ? projectImages.length - 1 : currentImageIdx - 1;
                              updateProjectImageIndex(projectIndex, newIndex);
                            }}
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button 
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/90 p-2 rounded-full hover:bg-background transition-colors shadow-md z-10"
                            onClick={(e) => {
                              e.stopPropagation();
                              const newIndex = currentImageIdx === projectImages.length - 1 ? 0 : currentImageIdx + 1;
                              updateProjectImageIndex(projectIndex, newIndex);
                            }}
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}
                    </div>
                    
                    {/* Image Indicators - Centered */}
                    {projectImages.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-background/80 px-3 py-1.5 rounded-full">
                        {projectImages.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentImageIdx ? 'bg-primary scale-125' : 'bg-muted-foreground/50'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              updateProjectImageIndex(projectIndex, index);
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
                      {project.title || 'Untitled Project'}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 text-center lg:text-left leading-relaxed">
                      {project.description || 'No description available.'}
                    </p>
                    
                    {/* Tags - Centered for symmetry */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Buttons - Centered for symmetry */}
                    <div className="flex gap-4 justify-center lg:justify-start">
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-md"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 border rounded-full font-medium hover:bg-accent transition-colors"
                        >
                          <Github size={16} />
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Image Preview Modal - Much Larger */}
      {selectedImage && projects[selectedProjectIndex] && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative max-w-6xl w-full max-h-[90vh] bg-background rounded-xl overflow-hidden shadow-2xl flex flex-col">
              {/* Header with title and close button */}
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">{projects[selectedProjectIndex].title} - Preview</h3>
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
                  onError={(e) => {
                    e.target.src = '';
                    e.target.alt = 'Image failed to load';
                  }}
                />
              </div>
              
              {/* Navigation controls for modal */}
              {projects[selectedProjectIndex].images && projects[selectedProjectIndex].images.length > 1 && (
                <div className="p-4 border-t flex justify-center gap-4">
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    onClick={() => {
                      const selectedImages = projects[selectedProjectIndex].images || [];
                      const newIndex = selectedImageIndex === 0 
                        ? selectedImages.length - 1 
                        : selectedImageIndex - 1;
                      setSelectedImageIndex(newIndex);
                      const newImageUrl = getImageUrl(selectedImages[newIndex]);
                      setSelectedImage(newImageUrl);
                    }}
                  >
                    <ChevronLeft size={20} />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {projects[selectedProjectIndex].images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === selectedImageIndex ? 'bg-primary' : 'bg-muted-foreground/50'
                        }`}
                        onClick={() => {
                          setSelectedImageIndex(index);
                          const newImageUrl = getImageUrl(projects[selectedProjectIndex].images[index]);
                          setSelectedImage(newImageUrl);
                        }}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    onClick={() => {
                      const selectedImages = projects[selectedProjectIndex].images || [];
                      const newIndex = selectedImageIndex === selectedImages.length - 1 
                        ? 0 
                        : selectedImageIndex + 1;
                      setSelectedImageIndex(newIndex);
                      const newImageUrl = getImageUrl(selectedImages[newIndex]);
                      setSelectedImage(newImageUrl);
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
        <div className="text-center mt-12">
            <a className="cosmic-button w-fit flex items-center mx-auto gap-2" 
              target="_blank" 
              href="https://github.com/Abdelaziz201"
              >
              Check My Github <ArrowRight size={16}/>
            </a>
        </div> 
    </section>
  );
};