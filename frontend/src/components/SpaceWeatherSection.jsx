import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Globe, Calendar, ExternalLink, Loader2, AlertCircle } from "lucide-react";

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY || '';
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod';

export const SpaceWeatherSection = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAPOD = async () => {
      if (!NASA_API_KEY) {
        setError('NASA API key not configured.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        
        // Fetch today's APOD
        const response = await fetch(`${NASA_APOD_URL}?api_key=${NASA_API_KEY}`);
        
        if (!response.ok) {
          throw new Error(`NASA API error: ${response.status}`);
        }
        
        const data = await response.json();
        setApodData(data);
      } catch (err) {
        console.error('Error fetching NASA APOD:', err);
        setError('Failed to fetch space weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAPOD();
  }, []);

  if (loading) {
    return (
      <section id="space-weather" className="py-24 px-4 relative bg-secondary/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 text-primary mx-auto animate-spin" />
            <p className="text-muted-foreground mt-4">Loading space weather...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="space-weather" className="py-24 px-4 relative bg-secondary/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!apodData) {
    return null;
  }

  return (
    <section id="space-weather" className="py-24 px-4 relative bg-secondary/30">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Globe className="h-6 w-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-glow">
              Space Weather
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Today's Astronomy Picture of the Day from NASA
          </p>
        </div>

        {/* APOD Card */}
        <div className="bg-card/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative aspect-video lg:aspect-auto lg:h-full min-h-[300px] bg-background/50">
              {apodData.media_type === 'image' ? (
                <img
                  src={apodData.url}
                  alt={apodData.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <iframe
                  src={apodData.url}
                  title={apodData.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
              
              {/* Date Badge */}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-foreground">{apodData.date}</span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-glow mb-2">
                    {apodData.title}
                  </h3>
                  {apodData.copyright && (
                    <p className="text-sm text-muted-foreground">
                      Copyright: {apodData.copyright}
                    </p>
                  )}
                </div>

                {/* Explanation */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                    {apodData.explanation}
                  </p>
                </div>

                {/* Action Button */}
                {apodData.hdurl && (
                  <div>
                    <a
                      href={apodData.hdurl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 px-6 py-3 rounded-lg",
                        "cosmic-button transition-all duration-300",
                        "hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                      )}
                    >
                      <span>View HD Image</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}

                {/* Link to NASA */}
                <div className="pt-4 border-t border-white/10">
                  <a
                    href="https://apod.nasa.gov/apod/astropix.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Visit NASA APOD
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Data provided by NASA's Astronomy Picture of the Day API
          </p>
        </div>
      </div>
    </section>
  );
};
