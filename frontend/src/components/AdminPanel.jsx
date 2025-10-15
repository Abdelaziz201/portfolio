import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { StarBackground } from './StarBackground';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Plus, Trash2, Edit3, User, Mail, Phone, MapPin, Github, Linkedin, Instagram, Twitter, ExternalLink, Code, Briefcase } from 'lucide-react';

export const AdminPanel = () => {
  const navigate = useNavigate();
  
  // State for all portfolio data
  const [aboutData, setAboutData] = useState({
    title: "Passionate Full-Stack Developer",
    description1: "write here more",
    description2: "write here even more",
    cvUrl: "",
    services: [
      {
        icon: "Code",
        title: "Web Development",
        description: "Creating responsive websites and web applications with modern frameworks."
      },
      {
        icon: "User",
        title: "UI/UX Design",
        description: "Designing intuitive user interfaces and seamless user experiences."
      },
      {
        icon: "Briefcase",
        title: "Project Management",
        description: "Leading projects from conception to completion with agile methodologies."
      }
    ]
  });

  const [contactData, setContactData] = useState({
    email: "abdelazizabdelkarim2001@gmail.com",
    phone1: "+905312468942",
    phone2: "+97433042339",
    location1: "Qatar, Doha",
    location2: "Turkey, Ankara",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/abdelaziz201/",
      instagram: "",
      twitter: "",
      github: ""
    }
  });

  const [projectsData, setProjectsData] = useState([
    {
      id: 1,
      title: "Event Management System",
      description: "An event management website for companies that organize venues with booking capabilities and admin dashboard",
      images: ["projects/bokd1.png", "projects/bokd2.png"],
      tags: ["React.js", "Node.js", "MongoDB", "Express"],
      githubUrl: "https://github.com/Abdelaziz201/bokd",
      demoUrl: "https://bokd.onrender.com/"
    }
  ]);

  const [skillsData, setSkillsData] = useState([
    { name: "HTML/CSS", level: 95, category: "frontend" },
    { name: "JavaScript", level: 90, category: "frontend" },
    { name: "React", level: 90, category: "frontend" },
    { name: "Node.js", level: 80, category: "backend" },
    { name: "Express", level: 75, category: "backend" },
    { name: "MongoDB", level: 70, category: "backend" },
    { name: "Git/GitHub", level: 90, category: "tools" },
    { name: "VS Code", level: 95, category: "tools" }
  ]);

  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving data:', { aboutData, contactData, projectsData, skillsData });
    setIsEditing(false);
    // Show success message
    alert('Data saved successfully!');
  };

  const addNewProject = () => {
    const newProject = {
      id: Date.now(),
      title: "New Project",
      description: "A new project description. Describe what this project does, the technologies used, and its key features.",
      images: ["projects/placeholder.png"],
      tags: ["React", "Node.js"],
      githubUrl: "https://github.com/yourusername/project-name",
      demoUrl: "https://your-project-demo.com"
    };
    setProjectsData([...projectsData, newProject]);
  };

  const removeProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjectsData(projectsData.filter(project => project.id !== id));
    }
  };

  const addNewSkill = () => {
    const newSkill = {
      name: "New Technology",
      level: 75,
      category: "frontend"
    };
    setSkillsData([...skillsData, newSkill]);
  };

  const removeSkill = (index) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      setSkillsData(skillsData.filter((_, i) => i !== index));
    }
  };

  const updateProject = (id, field, value) => {
    setProjectsData(projectsData.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const addProjectImage = (projectId, imageUrl) => {
    setProjectsData(projectsData.map(project => 
      project.id === projectId 
        ? { ...project, images: [...project.images, imageUrl] }
        : project
    ));
  };

  const removeProjectImage = (projectId, imageIndex) => {
    setProjectsData(projectsData.map(project => 
      project.id === projectId 
        ? { ...project, images: project.images.filter((_, index) => index !== imageIndex) }
        : project
    ));
  };

  const updateSkill = (index, field, value) => {
    setSkillsData(skillsData.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    ));
  };

  const tabs = [
    { id: 'about', label: 'About Me', icon: User },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'projects', label: 'Projects', icon: ExternalLink },
    { id: 'skills', label: 'Skills', icon: Code }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <StarBackground />
      <ThemeToggle />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-background/90 backdrop-blur-md border-r border-white/10 z-40">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-glow">Admin Panel</h1>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={cn(
                "w-full px-4 py-2 rounded-lg transition-colors flex items-center gap-2",
                isEditing ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              )}
            >
              <Edit3 size={16} />
              {isEditing ? 'Editing Mode' : 'Edit Mode'}
            </button>
            
            {isEditing && (
              <button
                onClick={handleSave}
                className="w-full cosmic-button flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Sections</h3>
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left",
                  activeTab === tab.id 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted"
                )}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-8 pb-8 px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">About Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={aboutData.title}
                      onChange={(e) => setAboutData({...aboutData, title: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description 1</label>
                    <textarea
                      value={aboutData.description1}
                      onChange={(e) => setAboutData({...aboutData, description1: e.target.value})}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Description 2</label>
                    <textarea
                      value={aboutData.description2}
                      onChange={(e) => setAboutData({...aboutData, description2: e.target.value})}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">CV Download URL</label>
                    <input
                      type="url"
                      value={aboutData.cvUrl}
                      onChange={(e) => setAboutData({...aboutData, cvUrl: e.target.value})}
                      disabled={!isEditing}
                      placeholder="https://example.com/cv.pdf"
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-card/50 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Services</h3>
                <div className="space-y-4">
                  {aboutData.services.map((service, index) => (
                    <div key={index} className="p-4 border border-white/10 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Icon</label>
                          <select
                            value={service.icon}
                            onChange={(e) => {
                              const newServices = [...aboutData.services];
                              newServices[index].icon = e.target.value;
                              setAboutData({...aboutData, services: newServices});
                            }}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                          >
                            <option value="Code">Code</option>
                            <option value="User">User</option>
                            <option value="Briefcase">Briefcase</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Title</label>
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => {
                              const newServices = [...aboutData.services];
                              newServices[index].title = e.target.value;
                              setAboutData({...aboutData, services: newServices});
                            }}
                            disabled={!isEditing}
                            className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Description</label>
                          <textarea
                            value={service.description}
                            onChange={(e) => {
                              const newServices = [...aboutData.services];
                              newServices[index].description = e.target.value;
                              setAboutData({...aboutData, services: newServices});
                            }}
                            disabled={!isEditing}
                            rows={2}
                            className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={contactData.email}
                      onChange={(e) => setContactData({...contactData, email: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone 1</label>
                    <input
                      type="tel"
                      value={contactData.phone1}
                      onChange={(e) => setContactData({...contactData, phone1: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone 2</label>
                    <input
                      type="tel"
                      value={contactData.phone2}
                      onChange={(e) => setContactData({...contactData, phone2: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Location 1</label>
                    <input
                      type="text"
                      value={contactData.location1}
                      onChange={(e) => setContactData({...contactData, location1: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Location 2</label>
                    <input
                      type="text"
                      value={contactData.location2}
                      onChange={(e) => setContactData({...contactData, location2: e.target.value})}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-card/50 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Social Media Links</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn</label>
                    <input
                      type="url"
                      value={contactData.socialLinks.linkedin}
                      onChange={(e) => setContactData({
                        ...contactData, 
                        socialLinks: {...contactData.socialLinks, linkedin: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">GitHub</label>
                    <input
                      type="url"
                      value={contactData.socialLinks.github}
                      onChange={(e) => setContactData({
                        ...contactData, 
                        socialLinks: {...contactData.socialLinks, github: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Instagram</label>
                    <input
                      type="url"
                      value={contactData.socialLinks.instagram}
                      onChange={(e) => setContactData({
                        ...contactData, 
                        socialLinks: {...contactData.socialLinks, instagram: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Twitter</label>
                    <input
                      type="url"
                      value={contactData.socialLinks.twitter}
                      onChange={(e) => setContactData({
                        ...contactData, 
                        socialLinks: {...contactData.socialLinks, twitter: e.target.value}
                      })}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Projects Management</h3>
                  <p className="text-muted-foreground">Manage your portfolio projects</p>
                </div>
                {isEditing && (
                  <button
                    onClick={addNewProject}
                    className="cosmic-button flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add New Project
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {projectsData.map((project) => (
                  <div key={project.id} className="bg-card/50 backdrop-blur-md rounded-xl p-6 border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold">{project.title}</h4>
                      {isEditing && (
                        <button
                          onClick={() => removeProject(project.id)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Demo URL</label>
                        <input
                          type="url"
                          value={project.demoUrl}
                          onChange={(e) => updateProject(project.id, 'demoUrl', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                          disabled={!isEditing}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">GitHub URL</label>
                        <input
                          type="url"
                          value={project.githubUrl}
                          onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={project.tags.join(', ')}
                          onChange={(e) => updateProject(project.id, 'tags', e.target.value.split(', ').filter(tag => tag.trim()))}
                          disabled={!isEditing}
                          placeholder="React.js, Node.js, MongoDB"
                          className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                        />
                      </div>
                    </div>
                    
                    {/* Image Management */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-3">Project Images</label>
                      <div className="space-y-3">
                        {project.images.map((image, imageIndex) => (
                          <div key={imageIndex} className="flex items-center gap-3 p-3 border border-white/10 rounded-lg">
                            <input
                              type="text"
                              value={image}
                              onChange={(e) => {
                                const newImages = [...project.images];
                                newImages[imageIndex] = e.target.value;
                                updateProject(project.id, 'images', newImages);
                              }}
                              disabled={!isEditing}
                              placeholder="projects/image.png"
                              className="flex-1 px-3 py-2 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 text-sm"
                            />
                            {isEditing && (
                              <button
                                onClick={() => removeProjectImage(project.id, imageIndex)}
                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                        {isEditing && (
                          <button
                            onClick={() => addProjectImage(project.id, '')}
                            className="w-full p-3 border-2 border-dashed border-primary/30 rounded-lg text-primary hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
                          >
                            <Plus size={16} />
                            Add Image URL
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Skills Management</h3>
                  <p className="text-muted-foreground">Manage your technical skills and proficiency levels</p>
                </div>
                {isEditing && (
                  <button
                    onClick={addNewSkill}
                    className="cosmic-button flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add New Skill
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillsData.map((skill, index) => (
                  <div key={index} className="bg-card/50 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold">{skill.name}</h4>
                      {isEditing && (
                        <button
                          onClick={() => removeSkill(index)}
                          className="p-1 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium mb-1">Name</label>
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => updateSkill(index, 'name', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium mb-1">Level (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={skill.level}
                          onChange={(e) => updateSkill(index, 'level', parseInt(e.target.value))}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium mb-1">Category</label>
                        <select
                          value={skill.category}
                          onChange={(e) => updateSkill(index, 'category', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 text-sm"
                        >
                          <option value="frontend">Frontend</option>
                          <option value="backend">Backend</option>
                          <option value="tools">Tools</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
