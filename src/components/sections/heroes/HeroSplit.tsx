import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ThemeConfig } from '../../../types';

interface HeroSplitProps {
  content: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    image: string;
    features: string[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
}

const HeroSplit: React.FC<HeroSplitProps> = ({ content, isEditing, onChange, theme }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...content.features];
    updatedFeatures[index] = value;
    handleChange('features', updatedFeatures);
  };

  return (
    <section 
      className="py-20"
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="text-3xl md:text-4xl font-bold mb-6 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                  style={{ 
                    color: theme?.colors?.primary,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.primary
                  }}
                  placeholder="Enter title"
                />
                <input
                  type="text"
                  value={content.subtitle}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                  className="text-xl mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="Enter subtitle"
                />
                <textarea
                  value={content.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="text-lg mb-6 bg-transparent border-2 border-dashed rounded-lg p-2 w-full resize-none"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="Enter description"
                  rows={3}
                />
                {content.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: theme?.colors?.success }}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 bg-transparent border-2 border-dashed rounded-lg p-1"
                      style={{ 
                        color: theme?.colors?.text,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      placeholder="Feature"
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-3xl md:text-4xl font-bold mb-6"
                  style={{ 
                    color: theme?.colors?.primary,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  {content.title}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl mb-4"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  {content.subtitle}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg mb-6"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  {content.description}
                </motion.p>
                {content.features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 mb-3"
                  >
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: theme?.colors?.success }}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span 
                      style={{ 
                        color: theme?.colors?.text,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      {feature}
                    </span>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-8"
                >
                  <a 
                    href={content.ctaLink}
                    className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
                    style={{ fontFamily: theme?.fonts?.secondary }}
                  >
                    {content.ctaText}
                  </a>
                </motion.div>
              </>
            )}
          </div>
          
          <div className="relative">
            {isEditing ? (
              <input
                type="url"
                value={content.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className="w-full h-96 border-2 border-dashed rounded-2xl p-4 text-center"
                style={{ 
                  borderColor: theme?.colors?.border,
                  backgroundColor: theme?.colors?.surface
                }}
                placeholder="Image URL"
              />
            ) : (
              <motion.img 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                src={content.image} 
                alt={content.title} 
                className="rounded-2xl w-full"
                style={{ boxShadow: theme?.shadows?.lg }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSplit;