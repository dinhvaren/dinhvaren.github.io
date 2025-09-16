import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

export function NotFound() {
  const navigate = useNavigate();

  const handleCustomCursor = (e: React.MouseEvent) => {
    const cursor = document.querySelector('.custom-cursor') as HTMLElement;
    if (cursor) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      cursor.style.transform = `translate(${rect.left + rect.width / 2}px, ${rect.top + rect.height / 2}px) scale(1.5)`;
      cursor.style.opacity = '0.5';
      
      setTimeout(() => {
        cursor.style.transform = '';
        cursor.style.opacity = '1';
      }, 300);
    }
  };

  return (
    <div 
      className="min-h-[100svh] min-h-[100vh] w-screen bg-[rgb(var(--bg-rgb))] overflow-hidden relative flex items-center justify-center p-clamp"
      style={{ '--p-clamp': 'clamp(1rem, 3vw, 2rem)' } as React.CSSProperties}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black" />

      {/* Main Content Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[clamp(300px,90vw,800px)] mx-auto relative z-10"
      >
        <div className="terminal-container bg-[rgba(var(--bg-rgb),0.8)] backdrop-blur-sm border border-green-500/20 rounded-lg overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="terminal-header flex items-center justify-between p-3 border-b border-green-500/20 bg-[rgba(var(--bg-rgb),0.5)]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-xs text-gray-500">system_error.log</span>
          </div>

          {/* Terminal Content */}
          <div className="p-clamp space-y-6">
            {/* ASCII Art */}
            <pre className="text-green-500 whitespace-pre-wrap text-left font-mono text-[clamp(0.75rem,2vw,1rem)] leading-tight">
{`
    .---.    .----.      .---.   
   / .  |   /  ..  \\    / .  |   
  / /|  |  .  /  \\  .  / /|  |   
 / / |  |_ |  |  '  | / / |  |_  
/  '-'    |'  \\  /  '/  '-'    | 
\`----|  |-' \\  \`'  / \`----|  |-' 
     \`--'    \`---''       \`--' 
`}
            </pre>

            {/* Error Message */}
            <div className="h-16">
              <Typewriter
                options={{
                  strings: [
                    'Error 404: Endpoint not found.',
                    '404: Resource unreachable.',
                    'Page not found: Access denied.',
                    '404: Invalid URL request.',
                    'Resource not found. Routing error.',
                    '404: Unauthorized access attempt.',
                    '404: Network anomaly detected.',
                    'Page not found. Invalid request.',
                    '404: Access denied. Intrusion attempt logged.',
                    '404: Resource offline. Review access.',
                    'Error 404: Unknown endpoint.',
                    '404: Suspicious request flagged.',
                    '404: Path not found. Security breach detected.',
                    '404: Target not found. Threat assessment required.'
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                  cursor: '█'
                }}
              />
            </div>

            {/* Error Details */}
            <div className="space-y-2 text-sm text-gray-400 font-mono">
              <p>
                <span className="text-green-500">{'>'}</span> Location: {window.location.pathname}
              </p>
              <p>
                <span className="text-green-500">{'>'}</span> Timestamp: {new Date().toISOString()}
              </p>
              <p>
                <span className="text-green-500">{'>'}</span> Status: 404 Not Found
              </p>
            </div>

            {/* Return Home Button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                handleCustomCursor(e);
                navigate('/');
              }}
              className="group flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-lg 
                         border border-green-500/20 hover:bg-green-500/20 focus:outline-none 
                         focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-black
                         transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Return to home page"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              <span>Return Home</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}