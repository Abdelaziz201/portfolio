import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { StarBackground } from './StarBackground';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Plus, Trash2, Edit3, User, Mail, Phone, MapPin, Github, Linkedin, Instagram, Twitter, ExternalLink, Code, Briefcase, MessageSquare } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

  const [skillsData, setSkillsData] = useState([]);

  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);
  
  // State for messages
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState('');

  // Fetch contact info
  const fetchContactInfo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contactInfo`);
      if (response.ok) {
        const data = await response.json();
        setContactData({
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

  // Save contact info
  const saveContactInfo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contactInfo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error('Failed to save contact info');
      }

      return true;
    } catch (error) {
      console.error('Error saving contact info:', error);
      alert('Failed to save contact information. Please try again.');
      return false;
    }
  };

  const handleSave = async () => {
    // Save contact info to backend
    const contactSaved = await saveContactInfo();
    
    if (contactSaved) {
      console.log('Saving other data:', { aboutData, projectsData, skillsData });
      setIsEditing(false);
      alert('Data saved successfully!');
    }
  };

  // Load contact info when contact tab is active
  useEffect(() => {
    if (activeTab === 'contact') {
      fetchContactInfo();
    }
  }, [activeTab]);

  // Load skills when skills tab is active
  useEffect(() => {
    if (activeTab === 'skills') {
      fetchSkills();
    }
  }, [activeTab]);

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

  // Fetch skills from backend
  const fetchSkills = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/skills`);
      if (response.ok) {
        const data = await response.json();
        // Transform backend data structure to frontend format
        const transformedSkills = data.map(item => ({
          _id: item._id,
          name: item.skill?.name || "",
          level: item.skill?.level || 0,
          category: item.skill?.category || "frontend"
        }));
        setSkillsData(transformedSkills);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const addNewSkill = async () => {
    const newSkill = {
      name: "New Technology",
      level: 75,
      category: "frontend"
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSkill),
      });

      if (response.ok) {
        const created = await response.json();
        const transformedSkill = {
          _id: created._id,
          name: created.skill?.name || newSkill.name,
          level: created.skill?.level || newSkill.level,
          category: created.skill?.category || newSkill.category
        };
        setSkillsData([...skillsData, transformedSkill]);
      } else {
        alert('Failed to create skill. Please try again.');
      }
    } catch (error) {
      console.error('Error creating skill:', error);
      alert('Failed to create skill. Please try again.');
    }
  };

  const removeSkill = async (skillId) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/skills/${skillId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSkillsData(skillsData.filter(skill => skill._id !== skillId));
      } else {
        alert('Failed to delete skill. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
      alert('Failed to delete skill. Please try again.');
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

  const updateSkill = async (index, field, value) => {
    const skill = skillsData[index];
    if (!skill._id) {
      // If no ID, just update locally (for new skills not yet saved)
      setSkillsData(skillsData.map((s, i) => 
        i === index ? { ...s, [field]: value } : s
      ));
      return;
    }

    // Update locally first for immediate UI feedback
    const updatedSkills = skillsData.map((s, i) => 
      i === index ? { ...s, [field]: value } : s
    );
    setSkillsData(updatedSkills);

    // Update in backend
    try {
      const updatedSkill = updatedSkills[index];
      const response = await fetch(`${API_BASE_URL}/skills/${skill._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedSkill.name,
          level: updatedSkill.level,
          category: updatedSkill.category
        }),
      });

      if (!response.ok) {
        // Revert on error
        setSkillsData(skillsData);
        throw new Error('Failed to update skill');
      }
    } catch (error) {
      console.error('Error updating skill:', error);
      // Revert on error
      setSkillsData(skillsData);
      alert('Failed to update skill. Please try again.');
    }
  };

  const tabs = [
    { id: 'about', label: 'About Me', icon: User },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'projects', label: 'Projects', icon: ExternalLink },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'messages', label: 'Messages', icon: MessageSquare }
  ];

  // Fetch functions for GetInTouch messages
  const fetchMessages = async () => {
    setMessagesLoading(true);
    setMessagesError('');
    try {
      const response = await fetch(`${API_BASE_URL}/getInTouch`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessagesError(error.message || 'Failed to load messages');
    } finally {
      setMessagesLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/getInTouch/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete message');
      }
      // Refresh messages list
      await fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message. Please try again.');
    }
  };

  const updateMessage = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getInTouch/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error('Failed to update message');
      }
      const updatedMessage = await response.json();
      setMessages(messages.map(msg => msg._id === id ? updatedMessage : msg));
      return updatedMessage;
    } catch (error) {
      console.error('Error updating message:', error);
      alert('Failed to update message. Please try again.');
      throw error;
    }
  };

  // Load messages when messages tab is active
  useEffect(() => {
    if (activeTab === 'messages') {
      fetchMessages();
    }
  }, [activeTab]);

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

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Contact Messages</h3>
                  <p className="text-muted-foreground">View and manage messages from your contact form</p>
                </div>
                <button
                  onClick={fetchMessages}
                  disabled={messagesLoading}
                  className={cn(
                    "px-4 py-2 rounded-lg border transition-colors flex items-center gap-2",
                    "bg-background/50 backdrop-blur-sm border-white/20",
                    "hover:bg-white/10 disabled:opacity-50"
                  )}
                >
                  <Mail size={16} />
                  {messagesLoading ? 'Loading...' : 'Refresh'}
                </button>
              </div>

              {messagesError && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                  <p>{messagesError}</p>
                </div>
              )}

              {messagesLoading && messages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No messages yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className="bg-card/50 backdrop-blur-md rounded-xl p-6 border border-white/10"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold">{message.name}</h4>
                            <span className="text-xs text-muted-foreground">
                              {new Date(message.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <a
                            href={`mailto:${message.email}`}
                            className="text-primary hover:text-primary/80 transition-colors text-sm"
                          >
                            {message.email}
                          </a>
                        </div>
                        {isEditing && (
                          <button
                            onClick={() => deleteMessage(message._id)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-foreground/90 whitespace-pre-wrap">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                  <div key={skill._id || index} className="bg-card/50 backdrop-blur-md rounded-xl p-4 border border-white/10">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold">{skill.name}</h4>
                      {isEditing && (
                        <button
                          onClick={() => removeSkill(skill._id)}
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
