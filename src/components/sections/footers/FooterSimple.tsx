import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { ThemeConfig } from '../../../types';

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

interface FooterSimpleProps {
  content: {
    companyName: string;
    description: string;
    socialLinks: SocialLink[];
    copyright: string;
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
}

const iconMap: Record<string, any> = {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
};

const getIconComponent = (iconName: string) => {
  return iconMap[iconName] || Facebook;
};

const FooterSimple: React.FC<FooterSimpleProps> = ({ content, isEditing, onChange, theme }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleSocialLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...content.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    handleChange('socialLinks', updatedLinks);
  };

  return (
    <footer 
      className="py-12 text-white"
      style={{ 
        background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          {isEditing ? (
            <>
              <input
                type="text"
                value={content.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="text-2xl font-bold mb-4 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 text-center text-white placeholder-white/70"
                placeholder="Company Name"
                style={{ fontFamily: theme?.fonts?.primary }}
              />
              <textarea
                value={content.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="mb-6 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 text-center w-full max-w-md mx-auto text-white placeholder-white/70 resize-none"
                placeholder="Company description"
                rows={2}
                style={{ fontFamily: theme?.fonts?.secondary }}
              />
            </>
          ) : (
            <>
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                {content.companyName}
              </h3>
              <p 
                className="mb-6"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                {content.description}
              </p>
            </>
          )}

          <div className="flex justify-center space-x-6 mb-6">
            {content.socialLinks.map((link, index) => {
              const IconComponent = getIconComponent(link.icon);
              
              return (
                <div key={index} className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <select
                        value={link.icon}
                        onChange={(e) => handleSocialLinkChange(index, 'icon', e.target.value)}
                        className="w-8 h-8 text-center bg-transparent border border-white/50 rounded text-white"
                      >
                        <option value="Facebook">FB</option>
                        <option value="Twitter">TW</option>
                        <option value="Linkedin">LI</option>
                        <option value="Instagram">IG</option>
                      </select>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                        className="px-2 py-1 bg-transparent border border-white/50 rounded text-white placeholder-white/70 text-sm"
                        placeholder="URL"
                      />
                    </>
                  ) : (
                    <a
                      href={link.url}
                      className="hover:opacity-70 transition-opacity"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent className="w-6 h-6" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {isEditing ? (
            <input
              type="text"
              value={content.copyright}
              onChange={(e) => handleChange('copyright', e.target.value)}
              className="text-sm opacity-70 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-2 text-center w-full max-w-md mx-auto text-white placeholder-white/70"
              placeholder="© 2024 Your Company. All rights reserved."
              style={{ fontFamily: theme?.fonts?.secondary }}
            />
          ) : (
            <p 
              className="text-sm opacity-70"
              style={{ fontFamily: theme?.fonts?.secondary }}
            >
              {content.copyright}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default FooterSimple;