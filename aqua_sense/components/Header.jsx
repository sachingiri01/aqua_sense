'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Droplet, Menu, X } from 'lucide-react';
import Image from 'next/image';
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/water-monitor', label: 'Live Monitor' },
    { href: '/ai-chat', label: 'AI Chat' },
    { href: '/learn', label: 'Learn' },
    { href: '/community', label: 'Community' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-shakespeare-200 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            {/* <div className="w-10 h-10 rounded-full bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 flex items-center justify-center shadow-lg">
              <Droplet className="w-6 h-6 text-white" />
            </div> */}
            <Image 
      src="/logo.png"   // file in public folder
      alt="Water tank"
      width={40}
      height={30}
      className="rounded-lg"
    />
            <span className="text-2xl font-bold text-gradient">AquaSense</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-shakespeare-800 hover:text-shakespeare-500 font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-shakespeare-500 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <button className="hidden md:block relative px-6 py-3 bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold rounded-full overflow-hidden group shadow-lg hover:shadow-xl transition-shadow">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-accent to-shakespeare-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-shakespeare-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-shakespeare-800" />
            ) : (
              <Menu className="w-6 h-6 text-shakespeare-800" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-shakespeare-800 hover:text-shakespeare-500 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button className="w-full px-6 py-3 bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold rounded-full shadow-lg">
              Get Started
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}