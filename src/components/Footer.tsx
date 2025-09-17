import { useState } from 'react';
import { Terminal, Github, ExternalLink, Heart } from 'lucide-react';

const navItems = [
  { name: 'home', href: '#home', label: 'Navigate to home section' },
  { name: 'about', href: '#about', label: 'Learn more about me' },
  { name: 'awards', href: '#awards', label: 'View my awards' },
  { name: 'projects', href: '#projects', label: 'Browse my projects' },
  { name: 'portfolios', href: '#portfolios', label: 'View my portfolios' },
  { name: 'contact', href: '#contact', label: 'Contact me' }
];

export function Footer() {
  const [currentYear] = useState(() => new Date().getFullYear());

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.substring(1));
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer 
      id="footer" 
      role="contentinfo"
      aria-label="Site footer"
      className="bg-[rgba(var(--bg-rgb),0.3)] text-gray-400 py-4 sm:py-6 md:py-8 border-t border-green-500/10 relative z-20"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-green-400 mb-2 sm:mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2 group text-sm sm:text-base"
                  aria-label={item.label}
                >
                  <span>{item.name}.sh</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-green-400 mb-2 sm:mb-4">Connect</h3>
            <div className="flex flex-col gap-2 sm:gap-3">
              <a href="https://github.com/dinhvaren" target="_blank" rel="noopener noreferrer" 
                 className="footer-link hover:text-green-400 transition-colors flex items-center gap-2 group text-sm sm:text-base"
                 aria-label="Visit my GitHub profile">
                <Github className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                <span>GitHub</span>
              </a>
              <a href="mailto:dinhlnng2003@gmail.com" 
                 className="footer-link hover:text-green-400 transition-colors flex items-center gap-2 group text-sm sm:text-base"
                 aria-label="Send me an email">
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                <span>Email</span>
              </a>
              <a href="https://www.linkedin.com/in/dinhvaren/" target="_blank" rel="noopener noreferrer" 
                 className="footer-link hover:text-green-400 transition-colors flex items-center gap-2 group text-sm sm:text-base"
                 aria-label="Connect with me on LinkedIn">
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 lg:text-right">
            <div className="flex items-center gap-2 text-green-500 lg:justify-end">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span className="font-mono text-xs sm:text-sm">v1.0</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed flex items-center gap-2 lg:justify-end">
              Built with <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 animate-pulse" aria-hidden="true" /> using React
            </p>
            <p className="text-[10px] sm:text-xs opacity-60">
              © {currentYear} Luong Nguyen Ngoc Dinh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}