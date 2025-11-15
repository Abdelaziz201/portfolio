import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { StarBackground } from './StarBackground';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Plus, Trash2, Edit3, User, Mail, Phone, MapPin, Github, Linkedin, Instagram, Twitter, ExternalLink, Code, Briefcase, MessageSquare, Container, Bug, FileCode2, LogOut } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  // Logout function
  const handleLogout = async () => {
    // Clear all localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('loginTime');
    
    // Clear cookies by calling backend logout endpoint
    try {
      await fetch(`${API_BASE_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include', // Include cookies to clear them
      });
    } catch (error) {
      console.error('Error logging out:', error);
      // Continue with logout even if backend call fails
    }
    
    
    
    navigate('/login');
  };

  // Check authentication on mount
  useEffect(() => {
    const verifyAuthentication = async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        // No token, redirect to login
        navigate('/login');
        return;
      }
      
      // Verify token with backend
      try {
        const response = await fetch(`${API_BASE_URL}/users/verify`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Send token in Authorization header
          },
          credentials: 'include', // Also send cookies if available
        });

        const data = await response.json();

        if (response.ok && data.valid) {
          // Token is valid, allow access
          setIsAuthenticated(true);
          setCheckingAuth(false);
        } else {
          // Token is invalid or expired
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          localStorage.removeItem('loginTime');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        // On error, remove token and redirect to login for security
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('loginTime');
        navigate('/login');
      }
    };

    verifyAuthentication();
  }, [navigate]);
  
  // State for all portfolio data
  const [aboutData, setAboutData] = useState({
    _id: null,
    title: "",
    description1: "",
    description2: "",
    cvUrl: "",
    services: []
  });

  const [contactData, setContactData] = useState({
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

  const [projectsData, setProjectsData] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(false);

  const [skillsData, setSkillsData] = useState([]);

  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);
  
  // State for messages
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState('');

  // Fetch about me from backend
  const fetchAboutMe = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/aboutMe`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const about = data[0]; // Get first entry
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
          // if (services.length === 0) {
          //   services = [
          //     { icon: "Code", title: "Web Development", description: "Creating responsive websites and web applications with modern frameworks." },
          //     { icon: "User", title: "UI/UX Design", description: "Designing intuitive user interfaces and seamless user experiences." },
          //     { icon: "Briefcase", title: "Project Management", description: "Leading projects from conception to completion with agile methodologies." }
          //   ];
          // }
          
          // Limit to 3 services
          services = services.slice(0, 3);

          setAboutData({
            _id: about._id,
            title: about.title || "",
            description1: about.firstParagraph || "",
            description2: about.secondParagraph || "",
            cvUrl: "", // CV URL not in backend model yet
            services: services
          });
        }
      }
    } catch (error) {
      console.error('Error fetching about me:', error);
    }
  };

  // Save about me to backend
  const saveAboutMe = async () => {
    try {
      // Map services to grid fields (only first 3)
      const gridFields = ['fisrtGrid', 'secondGrid', 'thirdGrid'];
      const updateData = {
        title: aboutData.title,
        firstParagraph: aboutData.description1,
        secondParagraph: aboutData.description2,
      };
      
      // Add each service to corresponding grid field (limit to 3)
      const servicesToSave = aboutData.services.slice(0, 3);
      gridFields.forEach((field, index) => {
        updateData[field] = servicesToSave[index] 
          ? JSON.stringify(servicesToSave[index]) 
          : '';
      });

      if (aboutData._id) {
        // Update existing
        const response = await fetch(`${API_BASE_URL}/aboutMe/${aboutData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          throw new Error('Failed to save about me');
        }
      } else {
        // Create new
        const response = await fetch(`${API_BASE_URL}/aboutMe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          throw new Error('Failed to create about me');
        }
        const created = await response.json();
        setAboutData({ ...aboutData, _id: created._id });
      }

      return true;
    } catch (error) {
      console.error('Error saving about me:', error);
      alert('Failed to save about me information. Please try again.');
      return false;
    }
  };

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
    let allSaved = true;
    
    // Save about me if on about tab
    if (activeTab === 'about') {
      const aboutSaved = await saveAboutMe();
      if (!aboutSaved) allSaved = false;
    }
    
    // Save contact info if on contact tab
    if (activeTab === 'contact') {
      const contactSaved = await saveContactInfo();
      if (!contactSaved) allSaved = false;
    }
    
    if (allSaved) {
      setIsEditing(false);
      alert('Data saved successfully!');
    }
  };

  // Load about me when about tab is active
  useEffect(() => {
    if (activeTab === 'about') {
      fetchAboutMe();
    }
  }, [activeTab]);

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

  // Load projects when projects tab is active
  useEffect(() => {
    if (activeTab === 'projects') {
      fetchProjects();
    }
  }, [activeTab]);

  // Fetch projects from backend
  const fetchProjects = async () => {
    setProjectsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (response.ok) {
        const data = await response.json();
        // Transform backend data to frontend format
        const transformedProjects = data.map(project => ({
          _id: project._id,
          id: project._id, // Keep both for compatibility
          title: project.title || "",
          description: project.description || "",
          images: project.images || [],
          tags: project.tags || [],
          githubUrl: project.githubUrl || "",
          demoUrl: project.demoUrl || ""
        }));
        setProjectsData(transformedProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setProjectsLoading(false);
    }
  };

  const addNewProject = async () => {
    const newProject = {
      title: "New Project",
      description: "A new project description. Describe what this project does, the technologies used, and its key features.",
      images: [],
      tags: ["React", "Node.js"],
      githubUrl: "https://github.com/yourusername/project-name",
      demoUrl: "https://your-project-demo.com"
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const created = await response.json();
        const transformedProject = {
          _id: created._id,
          id: created._id,
          title: created.title || "",
          description: created.description || "",
          images: created.images || [],
          tags: created.tags || [],
          githubUrl: created.githubUrl || "",
          demoUrl: created.demoUrl || ""
        };
        setProjectsData([...projectsData, transformedProject]);
      } else {
        alert('Failed to create project. Please try again.');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    }
  };

  const removeProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProjectsData(projectsData.filter(project => project._id !== id && project.id !== id));
      } else {
        alert('Failed to delete project. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
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

  const updateProject = async (id, field, value) => {
    // Update locally first for immediate UI feedback
    const updatedProjects = projectsData.map(project => 
      (project._id === id || project.id === id) ? { ...project, [field]: value } : project
    );
    setProjectsData(updatedProjects);

    // Find the project to update
    const project = updatedProjects.find(p => p._id === id || p.id === id);
    if (!project || !project._id) {
      return; // New project not yet saved
    }

    // Update in backend
    try {
      const updateData = {
        title: project.title,
        description: project.description,
        tags: project.tags,
        githubUrl: project.githubUrl,
        demoUrl: project.demoUrl,
        images: project.images
      };

      const response = await fetch(`${API_BASE_URL}/projects/${project._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        // Revert on error
        setProjectsData(projectsData);
        throw new Error('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      // Revert on error
      setProjectsData(projectsData);
      alert('Failed to update project. Please try again.');
    }
  };

  const uploadProjectImage = async (projectId, file) => {
    try {
      const formData = new FormData();
      formData.append('images', file);

      const response = await fetch(`${API_BASE_URL}/projects/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.images && data.images.length > 0) {
          const imageUrl = data.images[0].url;
          
          // Find the project
          const project = projectsData.find(p => p._id === projectId || p.id === projectId);
          if (!project) return;

          // Add image to project
          const updatedImages = [...(project.images || []), imageUrl];
          
          // Update project with new image
          if (project._id) {
            const updateData = {
              title: project.title,
              description: project.description,
              tags: project.tags,
              githubUrl: project.githubUrl,
              demoUrl: project.demoUrl,
              images: updatedImages
            };

            const updateResponse = await fetch(`${API_BASE_URL}/projects/${project._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updateData),
            });

            if (updateResponse.ok) {
              setProjectsData(projectsData.map(p => 
                (p._id === projectId || p.id === projectId) 
                  ? { ...p, images: updatedImages }
                  : p
              ));
            } else {
              alert('Failed to save image to project.');
            }
          } else {
            // New project, just update locally
            setProjectsData(projectsData.map(p => 
              (p.id === projectId) 
                ? { ...p, images: updatedImages }
                : p
            ));
          }
        }
      } else {
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  const removeProjectImage = async (projectId, imageIndex) => {
    const project = projectsData.find(p => p._id === projectId || p.id === projectId);
    if (!project) return;

    const imageUrl = project.images[imageIndex];
    const updatedImages = project.images.filter((_, index) => index !== imageIndex);

    // Update locally first
    setProjectsData(projectsData.map(p => 
      (p._id === projectId || p.id === projectId) 
        ? { ...p, images: updatedImages }
        : p
    ));

    // If it's a server image, try to delete it
    if (imageUrl && imageUrl.startsWith('/api/photos/')) {
      const filename = imageUrl.split('/').pop();
      try {
        await fetch(`${API_BASE_URL}/projects/images/${filename}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    // Update project in backend
    if (project._id) {
      try {
        const updateData = {
          title: project.title,
          description: project.description,
          tags: project.tags,
          githubUrl: project.githubUrl,
          demoUrl: project.demoUrl,
          images: updatedImages
        };

        const response = await fetch(`${API_BASE_URL}/projects/${project._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          // Revert on error
          setProjectsData(projectsData);
          alert('Failed to remove image. Please try again.');
        }
      } catch (error) {
        console.error('Error updating project:', error);
        // Revert on error
        setProjectsData(projectsData);
        alert('Failed to remove image. Please try again.');
      }
    }
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

  // Show loading while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex items-center justify-center">
        <StarBackground />
        <div className="text-center">
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <StarBackground />
      
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
            
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 rounded-lg transition-colors flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
            >
              <LogOut size={16} />
              Logout
            </button>
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
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Services (Maximum 3)</h3>
                  {isEditing && aboutData.services.length < 3 && (
                    <button
                      onClick={() => {
                        const newService = {
                          icon: "Code",
                          title: "New Service",
                          description: "Service description"
                        };
                        setAboutData({
                          ...aboutData,
                          services: [...aboutData.services, newService]
                        });
                      }}
                      className="cosmic-button flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Add Service
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {aboutData.services.map((service, index) => (
                    <div key={index} className="p-4 border border-white/10 rounded-lg relative">
                      {isEditing && (
                        <button
                          onClick={() => {
                            const newServices = aboutData.services.filter((_, i) => i !== index);
                            setAboutData({...aboutData, services: newServices});
                          }}
                          className="absolute top-2 right-2 p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
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
                            <option value="Container">Container</option>
                            <option value="Bug">Bug</option>
                            <option value="FileCode">FileCode</option>
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
                  {aboutData.services.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No services added yet. Click "Add Service" to add one.</p>
                  )}
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
                <div className="flex gap-2">
                  <button
                    onClick={fetchProjects}
                    disabled={projectsLoading}
                    className={cn(
                      "px-4 py-2 rounded-lg border transition-colors flex items-center gap-2",
                      "bg-background/50 backdrop-blur-sm border-white/20",
                      "hover:bg-white/10 disabled:opacity-50"
                    )}
                  >
                    {projectsLoading ? 'Loading...' : 'Refresh'}
                  </button>
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
              </div>

              {projectsLoading && projectsData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading projects...</p>
                </div>
              ) : projectsData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No projects yet. Add your first project!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projectsData.map((project) => (
                  <div key={project.id} className="bg-card/50 backdrop-blur-md rounded-xl p-6 border border-white/10">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold">{project.title}</h4>
                      {isEditing && (
                        <button
                          onClick={() => removeProject(project._id || project.id)}
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
                          onChange={(e) => updateProject(project._id || project.id, 'title', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Demo URL</label>
                        <input
                          type="url"
                          value={project.demoUrl}
                          onChange={(e) => updateProject(project._id || project.id, 'demoUrl', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => updateProject(project._id || project.id, 'description', e.target.value)}
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
                          onChange={(e) => updateProject(project._id || project.id, 'githubUrl', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={Array.isArray(project.tags) ? project.tags.join(', ') : (project.tags || '')}
                          onChange={(e) => {
                            // Update locally immediately for smooth typing
                            const updatedProjects = projectsData.map(p => 
                              (p._id === project._id || p.id === project.id) 
                                ? { ...p, tags: e.target.value } 
                                : p
                            );
                            setProjectsData(updatedProjects);
                          }}
                          onBlur={(e) => {
                            // Process tags when user finishes editing (on blur)
                            const processedTags = e.target.value
                              .split(',')
                              .map(tag => tag.trim())
                              .filter(tag => tag);
                            updateProject(project._id || project.id, 'tags', processedTags);
                          }}
                          disabled={!isEditing}
                          placeholder="React.js, Node.js, MongoDB"
                          className="w-full px-4 py-3 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Type tags separated by commas (e.g., React.js, Node.js, MongoDB)</p>
                      </div>
                    </div>
                    
                    {/* Image Management */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-3">Project Images</label>
                      <div className="space-y-3">
                        {project.images && project.images.map((image, imageIndex) => (
                          <div key={imageIndex} className="flex items-center gap-3 p-3 border border-white/10 rounded-lg">
                            <div className="flex-1 flex items-center gap-3">
                              {image && (
                                <img 
                                  src={image.startsWith('http') || image.startsWith('/') ? image : `${API_BASE_URL.replace('/api', '')}${image}`}
                                  alt={`Project image ${imageIndex + 1}`}
                                  className="w-16 h-16 object-cover rounded-lg"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              )}
                              <input
                                type="text"
                                value={image}
                                onChange={(e) => {
                                  const newImages = [...project.images];
                                  newImages[imageIndex] = e.target.value;
                                  updateProject(project._id || project.id, 'images', newImages);
                                }}
                                disabled={!isEditing}
                                placeholder="Image URL or path"
                                className="flex-1 px-3 py-2 rounded-lg border border-white/20 bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 text-sm"
                              />
                            </div>
                            {isEditing && (
                              <button
                                onClick={() => removeProjectImage(project._id || project.id, imageIndex)}
                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                        {isEditing && (
                          <>
                            <label className="w-full p-3 border-2 border-dashed border-primary/30 rounded-lg text-primary hover:border-primary/50 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                              <Plus size={16} />
                              Upload Image
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    uploadProjectImage(project._id || project.id, file);
                                  }
                                  e.target.value = ''; // Reset input
                                }}
                              />
                            </label>
                            <button
                              onClick={() => {
                                const newImages = [...(project.images || []), ''];
                                updateProject(project._id || project.id, 'images', newImages);
                              }}
                              className="w-full p-3 border-2 border-dashed border-primary/30 rounded-lg text-primary hover:border-primary/50 transition-colors flex items-center justify-center gap-2"
                            >
                              <Plus size={16} />
                              Add Image URL
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              )}
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
