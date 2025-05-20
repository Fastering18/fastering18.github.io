import Link from 'next/link';
import { FaGithub, FaLinkedin, FaDiscord, FaTwitter } from 'react-icons/fa';
import { siteConfig } from '@/config/siteConfig';

const socialLinks = [
  {
    name: 'GitHub',
    href: siteConfig.socialLinks.github,
    icon: FaGithub,
  },
  {
    name: 'LinkedIn',
    href: siteConfig.socialLinks.linkedin,
    icon: FaLinkedin,
  },
  {
    name: 'Discord',
    href: siteConfig.socialLinks.discord,
    icon: FaDiscord,
  },
  {
    name: 'Twitter',
    href: siteConfig.socialLinks.twitter,
    icon: FaTwitter,
  },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Muhammad Brahmana Priambudi. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                aria-label={item.name}
              >
                <item.icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 