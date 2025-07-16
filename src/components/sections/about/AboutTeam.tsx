import React from 'react';
import { motion } from 'framer-motion';
import { ThemeConfig } from '../../../types';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface AboutTeamProps {
  content: {
    title: string;
    subtitle: string;
    teamMembers: TeamMember[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
}

const AboutTeam: React.FC<AboutTeamProps> = ({ content, isEditing, onChange, theme }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...content.teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    handleChange('teamMembers', updatedMembers);
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
          {content.teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center rounded-xl p-6"
              style={{ 
                backgroundColor: theme?.colors?.surface,
                boxShadow: theme?.shadows?.lg
              }}
            >
              {isEditing ? (
                <>
                  <input
                    type="url"
                    value={member.image}
                    onChange={(e) => handleMemberChange(index, 'image', e.target.value)}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-dashed p-2 text-center text-xs"
                    style={{ borderColor: theme?.colors?.border }}
                    placeholder="Image URL"
                  />
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                    className="text-xl font-semibold mb-2 bg-transparent border-2 border-dashed rounded-lg p-1 w-full text-center"
                    style={{ 
                      color: theme?.colors?.text,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.primary
                    }}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
                    className="mb-3 bg-transparent border-2 border-dashed rounded-lg p-1 w-full text-center"
                    style={{ 
                      color: theme?.colors?.primary,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="Role"
                  />
                  <textarea
                    value={member.bio}
                    onChange={(e) => handleMemberChange(index, 'bio', e.target.value)}
                    className="text-sm bg-transparent border-2 border-dashed rounded-lg p-2 w-full resize-none"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      borderColor: `${theme?.colors?.primary}50`,
                      fontFamily: theme?.fonts?.secondary
                    }}
                    placeholder="Bio"
                    rows={3}
                  />
                </>
              ) : (
                <>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ 
                      color: theme?.colors?.text,
                      fontFamily: theme?.fonts?.primary
                    }}
                  >
                    {member.name}
                  </h3>
                  <p 
                    className="mb-3"
                    style={{ 
                      color: theme?.colors?.primary,
                      fontFamily: theme?.fonts?.secondary
                    }}
                  >
                    {member.role}
                  </p>
                  <p 
                    className="text-sm"
                    style={{ 
                      color: theme?.colors?.textSecondary,
                      fontFamily: theme?.fonts?.secondary
                    }}
                  >
                    {member.bio}
                  </p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;