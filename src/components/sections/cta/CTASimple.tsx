import React from 'react';
import { motion } from 'framer-motion';
import { ThemeConfig } from '../../../types';

interface CTASimpleProps {
  content: {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
}

const CTASimple: React.FC<CTASimpleProps> = ({ content, isEditing, onChange, theme }) => {
  const handleChange = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <section 
      className="py-20 text-white"
      style={{ 
        background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        {isEditing ? (
          <>
            <input
              type="text"
              value={content.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="text-3xl md:text-4xl font-bold mb-6 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 text-center w-full text-white placeholder-white/70"
              placeholder="Enter title"
              style={{ fontFamily: theme?.fonts?.primary }}
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
                className="px-8 py-4 bg-white text-gray-900 rounded-lg border-2 border-dashed border-white/50 placeholder-gray-500 font-semibold"
                placeholder="CTA Text"
                style={{ fontFamily: theme?.fonts?.secondary }}
              />
              {content.secondaryCtaText && (
                <input
                  type="text"
                  value={content.secondaryCtaText}
                  onChange={(e) => handleChange('secondaryCtaText', e.target.value)}
                  className="px-8 py-4 border-2 border-white text-white rounded-lg bg-transparent placeholder-white/70 font-semibold"
                  placeholder="Secondary CTA"
                  style={{ fontFamily: theme?.fonts?.secondary }}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: theme?.fonts?.primary }}
            >
              {content.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg mb-8 max-w-2xl mx-auto opacity-90"
              style={{ fontFamily: theme?.fonts?.secondary }}
            >
              {content.description}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={content.ctaLink}
                className="inline-block px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                {content.ctaText}
              </a>
              {content.secondaryCtaText && (
                <a
                  href="#"
                  className="inline-block px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-semibold"
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

export default CTASimple;