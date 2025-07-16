import React from 'react';
import { motion } from 'framer-motion';
import { Star, Plus, X } from 'lucide-react';
import { ThemeConfig } from '../../../types';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

interface TestimonialsGridProps {
  content: {
    title: string;
    subtitle: string;
    testimonials: Testimonial[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
}

const TestimonialsGrid: React.FC<TestimonialsGridProps> = ({ content, isEditing, onChange, theme }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleTestimonialChange = (index: number, field: string, value: any) => {
    const updatedTestimonials = [...content.testimonials];
    updatedTestimonials[index] = { ...updatedTestimonials[index], [field]: value };
    handleChange('testimonials', updatedTestimonials);
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      name: 'New Customer',
      role: 'Customer',
      company: 'Company',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
      content: 'Great service and amazing results!',
      rating: 5,
    };
    handleChange('testimonials', [...content.testimonials, newTestimonial]);
  };

  const removeTestimonial = (index: number) => {
    const updatedTestimonials = content.testimonials.filter((_, i) => i !== index);
    handleChange('testimonials', updatedTestimonials);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-current' : ''}`}
        style={{ color: theme?.colors?.warning || '#f59e0b' }}
      />
    ));
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
                className="text-lg max-w-3xl mx-auto"
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
          {content.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl p-6 relative group"
              style={{ 
                backgroundColor: theme?.colors?.surface,
                boxShadow: theme?.shadows?.lg
              }}
            >
              {isEditing && (
                <button
                  onClick={() => removeTestimonial(index)}
                  className="absolute top-2 right-2 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: theme?.colors?.error }}
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <div className="flex items-center gap-4 mb-4">
                {isEditing ? (
                  <input
                    type="url"
                    value={testimonial.avatar}
                    onChange={(e) => handleTestimonialChange(index, 'avatar', e.target.value)}
                    className="w-12 h-12 rounded-full border-2 border-dashed p-1 text-xs"
                    style={{ borderColor: theme?.colors?.border }}
                    placeholder="Avatar URL"
                  />
                ) : (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                
                <div className="flex-1">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
                        className="font-semibold bg-transparent border-2 border-dashed rounded-lg p-1 w-full text-sm"
                        style={{ 
                          color: theme?.colors?.text,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.primary
                        }}
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={`${testimonial.role}, ${testimonial.company}`}
                        onChange={(e) => {
                          const [role, company] = e.target.value.split(', ');
                          handleTestimonialChange(index, 'role', role || '');
                          handleTestimonialChange(index, 'company', company || '');
                        }}
                        className="text-sm bg-transparent border-2 border-dashed rounded-lg p-1 w-full"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          borderColor: `${theme?.colors?.primary}50`,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        placeholder="Role, Company"
                      />
                    </>
                  ) : (
                    <>
                      <h4 
                        className="font-semibold"
                        style={{ 
                          color: theme?.colors?.text,
                          fontFamily: theme?.fonts?.primary
                        }}
                      >
                        {testimonial.name}
                      </h4>
                      <p 
                        className="text-sm"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          fontFamily: theme?.fonts?.secondary
                        }}
                      >
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {isEditing ? (
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={testimonial.rating}
                    onChange={(e) => handleTestimonialChange(index, 'rating', parseInt(e.target.value))}
                    className="w-16 px-2 py-1 border rounded text-sm"
                    style={{ borderColor: theme?.colors?.border }}
                  />
                ) : (
                  renderStars(testimonial.rating)
                )}
              </div>

              {isEditing ? (
                <textarea
                  value={testimonial.content}
                  onChange={(e) => handleTestimonialChange(index, 'content', e.target.value)}
                  className="bg-transparent border-2 border-dashed rounded-lg p-2 w-full resize-none"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  placeholder="Testimonial content"
                  rows={3}
                />
              ) : (
                <p 
                  className="italic"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  "{testimonial.content}"
                </p>
              )}
            </motion.div>
          ))}

          {isEditing && (
            <motion.button
              onClick={addTestimonial}
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
                <span style={{ color: theme?.colors?.textSecondary }}>Add Testimonial</span>
              </div>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsGrid;