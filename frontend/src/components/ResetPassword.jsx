import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { StarBackground } from './StarBackground';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/users';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  // State for forgot password (email request)
  const [email, setEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  // State for reset password (with token)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState('');

  const goBack = () => {
    navigate('/login');
  };

  // Handle forgot password (request reset email)
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setEmailError('');
    setEmailSuccess(false);

    if (!email) {
      setEmailError('Please enter your email address');
      return;
    }

    setEmailLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailSuccess(true);
        setEmail('');
      } else {
        setEmailError(data.message || 'Failed to send reset email. Please try again.');
      }
    } catch (error) {
      console.error('Error requesting password reset:', error);
      setEmailError('Network error. Please check your connection and try again.');
    } finally {
      setEmailLoading(false);
    }
  };

  // Handle password reset (with token)
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess(false);

    if (!formData.password || !formData.confirmPassword) {
      setResetError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setResetError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setResetError('Passwords do not match');
      return;
    }

    if (!token) {
      setResetError('Invalid or missing reset token');
      return;
    }

    setResetLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResetSuccess(true);
        setFormData({ password: '', confirmPassword: '' });
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setResetError(data.message || 'Failed to reset password. The token may be invalid or expired.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setResetError('Network error. Please check your connection and try again.');
    } finally {
      setResetLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (resetError) setResetError('');
  };

  // Show reset form if token exists, otherwise show forgot password form
  const showResetForm = !!token;

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
        aria-label="Go back to login"
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </button>

      {/* Form Container */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="bg-card/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10">
            {showResetForm ? (
              /* Reset Password Form */
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-glow mb-2">Reset Password</h1>
                  <p className="text-foreground/70">Enter your new password below</p>
                </div>

                {resetSuccess ? (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Password Reset Successful!</h3>
                      <p className="text-foreground/70 text-center">
                        Your password has been reset successfully. Redirecting to login...
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-6">
                    {/* New Password Field */}
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-foreground/90 flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        New Password
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
                        placeholder="Enter your new password"
                        required
                        minLength={6}
                      />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground/90 flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border transition-all duration-300",
                          "bg-background/50 backdrop-blur-sm border-white/20",
                          "text-foreground placeholder:text-foreground/50",
                          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
                          "hover:border-white/30"
                        )}
                        placeholder="Confirm your new password"
                        required
                        minLength={6}
                      />
                    </div>

                    {/* Error Message */}
                    {resetError && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm">{resetError}</p>
                      </div>
                    )}

                    {/* Reset Button */}
                    <button
                      type="submit"
                      disabled={resetLoading}
                      className={cn(
                        "w-full cosmic-button py-3 text-lg font-semibold",
                        "transition-all duration-300 transform",
                        "hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]",
                        "active:scale-95",
                        resetLoading && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {resetLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                  </form>
                )}
              </>
            ) : (
              /* Forgot Password Form */
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-glow mb-2">Forgot Password?</h1>
                  <p className="text-foreground/70">Enter your email and we'll send you a reset link</p>
                </div>

                {emailSuccess ? (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Check Your Email</h3>
                      <p className="text-foreground/70 text-center mb-6">
                        If an account with that email exists, we've sent you a password reset link.
                      </p>
                      <button
                        onClick={() => {
                          setEmailSuccess(false);
                          setEmail('');
                        }}
                        className={cn(
                          "px-6 py-2 rounded-lg border transition-all duration-300",
                          "bg-background/50 backdrop-blur-sm border-white/20",
                          "hover:bg-white/10"
                        )}
                      >
                        Send Another Email
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-foreground/90 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError('');
                        }}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg border transition-all duration-300",
                          "bg-background/50 backdrop-blur-sm border-white/20",
                          "text-foreground placeholder:text-foreground/50",
                          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
                          "hover:border-white/30"
                        )}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>

                    {/* Error Message */}
                    {emailError && (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm">{emailError}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={emailLoading}
                      className={cn(
                        "w-full cosmic-button py-3 text-lg font-semibold",
                        "transition-all duration-300 transform",
                        "hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]",
                        "active:scale-95",
                        emailLoading && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {emailLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </form>
                )}

                {/* Back to Login Link */}
                <div className="mt-6 text-center">
                  <button
                    onClick={goBack}
                    className="text-sm text-primary hover:text-primary/80 transition-colors duration-300"
                  >
                    ← Back to Login
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary/40 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
};

