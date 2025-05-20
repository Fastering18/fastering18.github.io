"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { siteConfig } from '@/config/siteConfig';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const pathname = usePathname();

  const updateHash = (hash = window.location.hash) => {
    setCurrentHash(hash);
    //alert(`target: '${hash}', current: '${currentHash}'`)
  };

  useEffect(() => {
    // Check for dark mode preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);

    // Update hash on pathname change or hashchange
    
    //router.events.on("hashChangeStart", updateHash);
    updateHash(); // set initial hash

    return () => {
      window.removeEventListener('scroll', handleScroll);
      //router.events.off("hashChangeStart", updateHash);
    };
  }, [pathname]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  // Helper to determine if nav link is active
  const isActive = (href: string) => {
    // if (href === '/') {
    //   return pathname === '/' && (currentHash === "/"  || currentHash === "")
    // }
    // if (href.startsWith('/#')) {
    //   return pathname === '/' && href.endsWith(currentHash);
    // }
    return pathname === href;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-200 ${
      isScrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-primary-400">
              {siteConfig.personalInfo.shortName}
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {siteConfig.navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => updateHash(item.href)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-400'
                      : 'text-gray-300 hover:text-primary-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-300 hover:text-primary-400 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 