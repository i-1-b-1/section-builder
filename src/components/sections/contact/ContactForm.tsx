import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ThemeConfig } from '../../../types';

interface ContactFormProps {
  content: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    address: string;
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
}

const ContactForm: React.FC<ContactFormProps> = ({ content, isEditing, onChange, theme }) => {
  const handleChange = (field: string, value: string) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <section 
      className="py-20"
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-4xl mx-auto px-4">
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
                className="text-lg"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${theme?.colors?.primary}20` }}
              >
                <Mail className="w-6 h-6" style={{ color: theme?.colors?.primary }} />
              </div>
              <div>
                <h3 
                  className="font-semibold mb-1"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  Email
                </h3>
                {isEditing ? (
                  <input
                    type="email"
                    value={content.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="bg-transparent border-2 border-dashed rounded-lg p-1"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="email@example.com"
                  />
                ) : (
                  <p 
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      fontFamily: theme?.fonts?.secondary
                    }}
                  >
                    {content.email}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${theme?.colors?.primary}20` }}
              >
                <Phone className="w-6 h-6" style={{ color: theme?.colors?.primary }} />
              </div>
              <div>
                <h3 
                  className="font-semibold mb-1"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  Phone
                </h3>
                {isEditing ? (
                  <input
                    type="tel"
                    value={content.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="bg-transparent border-2 border-dashed rounded-lg p-1"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="+1 (555) 123-4567"
                  />
                ) : (
                  <p 
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      fontFamily: theme?.fonts?.secondary
                    }}
                  >
                    {content.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${theme?.colors?.primary}20` }}
              >
                <MapPin className="w-6 h-6" style={{ color: theme?.colors?.primary }} />
              </div>
              <div>
                <h3 
                  className="font-semibold mb-1"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  Address
                </h3>
                {isEditing ? (
                  <input
                    type="text"
                    value={content.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="bg-transparent border-2 border-dashed rounded-lg p-1 w-full"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="123 Business St, City, State 12345"
                  />
                ) : (
                  <p 
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      fontFamily: theme?.fonts?.secondary
                    }}
                  >
                    {content.address}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8"
            style={{ 
              backgroundColor: theme?.colors?.surface,
              boxShadow: theme?.shadows?.lg
            }}
          >
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                  style={{ 
                    borderColor: theme?.colors?.border,
                    backgroundColor: theme?.colors?.background,
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = theme?.colors?.primary || '#3b82f6';
                    e.target.style.boxShadow = `0 0 0 3px ${theme?.colors?.primary}20` || '0 0 0 3px #dbeafe';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = theme?.colors?.border || '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                  style={{ 
                    borderColor: theme?.colors?.border,
                    backgroundColor: theme?.colors?.background,
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.secondary
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = theme?.colors?.primary || '#3b82f6';
                    e.target.style.boxShadow = `0 0 0 3px ${theme?.colors?.primary}20` || '0 0 0 3px #dbeafe';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = theme?.colors?.border || '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-lg border mb-6 focus:outline-none focus:ring-2 transition-colors"
                style={{ 
                  borderColor: theme?.colors?.border,
                  backgroundColor: theme?.colors?.background,
                  color: theme?.colors?.text,
                  fontFamily: theme?.fonts?.secondary
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme?.colors?.primary || '#3b82f6';
                  e.target.style.boxShadow = `0 0 0 3px ${theme?.colors?.primary}20` || '0 0 0 3px #dbeafe';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme?.colors?.border || '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <textarea
                placeholder="Your Message"
                rows={6}
                className="w-full px-4 py-3 rounded-lg border mb-6 focus:outline-none focus:ring-2 transition-colors resize-none"
                style={{ 
                  borderColor: theme?.colors?.border,
                  backgroundColor: theme?.colors?.background,
                  color: theme?.colors?.text,
                  fontFamily: theme?.fonts?.secondary
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = theme?.colors?.primary || '#3b82f6';
                  e.target.style.boxShadow = `0 0 0 3px ${theme?.colors?.primary}20` || '0 0 0 3px #dbeafe';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = theme?.colors?.border || '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              ></textarea>
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg font-semibold transition-colors"
                style={{ 
                  backgroundColor: theme?.colors?.primary,
                  color: '#ffffff',
                  fontFamily: theme?.fonts?.secondary
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme?.colors?.secondary || '#06b6d4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme?.colors?.primary || '#3b82f6';
                }}
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;