import React from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { ThemeConfig } from '../../../types';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ServicesGridProps {
  content: {
    title: string;
    subtitle: string;
    services: Service[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  onIconClick?: (field: string) => void;
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ content, isEditing, onChange, theme, onIconClick }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const updatedServices = [...content.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    handleChange('services', updatedServices);
  };

  const addService = () => {
    const newService: Service = {
      icon: 'Zap',
      title: 'New Service',
      description: 'Service description goes here.',
    };
    handleChange('services', [...content.services, newService]);
  };

  const removeService = (index: number) => {
    const updatedServices = content.services.filter((_, i) => i !== index);
    handleChange('services', updatedServices);
  };

  // Get icon component safely
  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent || LucideIcons.Zap;
  };

  return (
    <section 
      className="py-20"
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          {isEditing ? (
            <>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl md:text-4xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full max-w-2xl mx-auto"
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
                className="text-lg bg-transparent border-2 border-dashed rounded-lg p-2 text-center w-full max-w-3xl mx-auto"
                style={{ 
                  color: theme?.colors?.textSecondary,
                  borderColor: `${theme?.colors?.primary}50`,
                  fontFamily: theme?.fonts?.secondary
                }}
                placeholder="Enter subtitle"
              />
            </>
          ) : (
            <>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ 
                  color: theme?.colors?.primary,
                  fontFamily: theme?.fonts?.primary
                }}
              >
                {content.title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg max-w-2xl mx-auto"
                style={{ 
                  color: theme?.colors?.textSecondary,
                  fontFamily: theme?.fonts?.secondary
                }}
              >
                {content.subtitle}
              </motion.p>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.services.map((service, index) => {
            const IconComponent = getIconComponent(service.icon);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl p-8 transition-shadow duration-300 relative group"
                style={{ 
                  backgroundColor: theme?.colors?.surface,
                  boxShadow: theme?.shadows?.lg
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = theme?.shadows?.xl || '0 20px 25px -5px rgb(0 0 0 / 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = theme?.shadows?.lg || '0 10px 15px -3px rgb(0 0 0 / 0.1)';
                }}
              >
                {isEditing && (
                  <button
                    onClick={() => removeService(index)}
                    className="absolute top-2 right-2 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: theme?.colors?.error }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`
                  }}
                >
                  {isEditing ? (
                    <button
                      onClick={() => onIconClick && onIconClick(`services.${index}.icon`)}
                      className="w-full h-full text-center text-white bg-transparent border-2 border-dashed border-white/30 rounded-xl hover:border-white/60 transition-colors flex items-center justify-center"
                      title="Click to change icon"
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </button>
                  ) : (
                    <motion.div
                      key={service.icon}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                  )}
                </div>

                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                      className="text-xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 w-full"
                      style={{ 
                        color: theme?.colors?.text,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.primary
                      }}
                      placeholder="Service title"
                    />
                    <textarea
                      value={service.description}
                      onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                      className="bg-transparent border-2 border-dashed rounded-lg p-2 w-full resize-none"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        borderColor: `${theme?.colors?.primary}50`,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      placeholder="Service description"
                      rows={3}
                    />
                  </>
                ) : (
                  <>
                    <h3 
                      className="text-xl font-bold mb-4"
                      style={{ 
                        color: theme?.colors?.text,
                        fontFamily: theme?.fonts?.primary
                      }}
                    >
                      {service.title}
                    </h3>
                    <p 
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      {service.description}
                    </p>
                  </>
                )}
              </motion.div>
            );
          })}

          {isEditing && (
            <motion.button
              onClick={addService}
              className="border-2 border-dashed rounded-xl p-8 transition-all duration-200 flex items-center justify-center"
              style={{
                borderColor: theme?.colors?.border,
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme?.colors?.primary || '#3b82f6';
                e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}10` || '#dbeafe';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme?.colors?.border || '#d1d5db';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <Plus className="w-8 h-8 mx-auto mb-2" style={{ color: theme?.colors?.textSecondary }} />
                <span style={{ color: theme?.colors?.textSecondary }}>Add Service</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;