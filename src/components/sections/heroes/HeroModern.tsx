import React from 'react';
import { motion } from 'framer-motion';
import { ThemeConfig } from '../../../types';

interface HeroModernProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    backgroundImage: string;
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
}

const HeroModern: React.FC<HeroModernProps> = ({ content, isEditing, onChange, theme }) => {
  const handleChange = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center"
      style={{ 
        backgroundImage: `url('${content.backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        {isEditing ? (
          <>
            <input
              type="text"
              value={content.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="text-4xl md:text-6xl font-bold mb-6 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 text-center w-full text-white placeholder-white/70"
              placeholder="Enter title"
              style={{ fontFamily: theme?.fonts?.primary }}
            />
            <input
              type="text"
              value={content.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="text-xl md:text-2xl mb-4 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 text-center w-full text-white placeholder-white/70"
              placeholder="Enter subtitle"
              style={{ fontFamily: theme?.fonts?.secondary }}
            />
            <textarea
              value={content.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="text-lg mb-8 max-w-2xl mx-auto bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 text-center w-full text-white placeholder-white/70 resize-none"
              placeholder="Enter description"
              rows={3}
              style={{ fontFamily: theme?.fonts?.secondary }}
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="text"
                value={content.ctaText}
                onChange={(e) => handleChange('ctaText', e.target.value)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg border-2 border-dashed border-white/50 placeholder-white/70"
                placeholder="CTA Text"
              />
              {content.secondaryCtaText && (
                <input
                  type="text"
                  value={content.secondaryCtaText}
                  onChange={(e) => handleChange('secondaryCtaText', e.target.value)}
                  className="px-6 py-3 border-2 border-white text-white rounded-lg bg-transparent placeholder-white/70"
                  placeholder="Secondary CTA"
                />
              )}
            </div>
          </>
        ) : (
          <>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ fontFamily: theme?.fonts?.primary }}
            >
              {content.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-4"
              style={{ fontFamily: theme?.fonts?.secondary }}
            >
              {content.subtitle}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg mb-8 max-w-2xl mx-auto opacity-90"
              style={{ fontFamily: theme?.fonts?.secondary }}
            >
              {content.description}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a 
                href={content.ctaLink} 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                {content.ctaText}
              </a>
              {content.secondaryCtaText && (
                <a 
                  href="#" 
                  className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-semibold"
                  style={{ fontFamily: theme?.fonts?.secondary }}
                >
                  {content.secondaryCtaText}
                </a>
              )}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroModern;