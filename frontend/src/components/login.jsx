import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { StarBackground } from './StarBackground';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Add your login logic here
    // For now, we'll just navigate to admin panel
    navigate('/admin');
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <StarBackground />
      <ThemeToggle />
      
      {/* Back Button - Top Left */}
      <button
        onClick={goBack}
        className={cn(
          "fixed top-5 left-5 z-50 w-8 h-8 rounded-full transition-all duration-300",
          "bg-white/20 backdrop-blur-sm border border-white/30",
          "hover:bg-white/30 hover:scale-110",
          "focus:outline-none focus:ring-2 focus:ring-primary/50",
          "opacity-70 hover:opacity-100"
        )}
        aria-label="Go back to home"
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </button>

      {/* Login Form */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="bg-card/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-glow mb-2">Welcome Back</h1>
              <p className="text-foreground/70">Sign in to your account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-foreground/90">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border transition-all duration-300",
                    "bg-background/50 backdrop-blur-sm border-white/20",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
                    "hover:border-white/30"
                  )}
                  placeholder="Enter your username"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-foreground/90">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border transition-all duration-300",
                    "bg-background/50 backdrop-blur-sm border-white/20",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
                    "hover:border-white/30"
                  )}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className={cn(
                  "w-full cosmic-button py-3 text-lg font-semibold",
                  "transition-all duration-300 transform",
                  "hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]",
                  "active:scale-95"
                )}
              >
                Sign In
              </button>
            </form>

            {/* Additional Options */}
            <div className="mt-6 text-center space-y-4">
              <a 
                href="#" 
                className="text-sm text-primary hover:text-primary/80 transition-colors duration-300"
              >
                Forgot your password?
              </a>
              
              <div className="text-sm text-foreground/70">
                Don't have an account?{' '}
                <a 
                  href="#" 
                  className="text-primary hover:text-primary/80 transition-colors duration-300 font-medium"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary/40 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
};