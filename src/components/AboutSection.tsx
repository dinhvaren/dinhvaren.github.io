import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl md:text-5xl font-light mb-12 flex items-center gap-4">
          <Terminal className="w-8 h-8 text-green-500" aria-hidden="true" />
          <span>whoami</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-gray-400 leading-relaxed">
              I'm a <span className="text-green-400">cybersecurity builder</span> and <span className="text-green-400">offensive developer </span> 
              with a strong passion for designing and deploying security-focused tools. What started as a love for programming 
              quickly turned into a deep dive into exploitation, red teaming, and <span className="text-green-400">understanding systems by breaking them</span>.
            </p>
            
            <p className="text-gray-400 leading-relaxed mt-4">
              I'm currently sharpening my edge through <span className="text-green-400">offensive labs</span>, developing proof-of-concept exploits, 
              and testing my skills in <span className="text-green-400">Capture The Flag (CTF)</span> challenges. I also contribute to 
              open-source tooling that supports red teaming, automation, and offensive research.
            </p>

          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-mono text-sm bg-[rgba(var(--bg-rgb),0.3)] p-6 rounded-xl border border-green-500/20 shadow-lg relative group"
          >
            <motion.div 
              className="ghost-ascii relative w-fit mx-auto"
              animate={{
                y: [0, -10, 0],
                x: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div 
                className="ghost-bubble opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500/10 px-3 py-1 rounded-full text-green-400 border border-green-500/20"
                initial={{ y: 10 }}
                animate={{ y: [10, 0, 10] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Boo!
              </motion.div>
              <motion.pre 
                className="text-green-500 text-center transition-colors duration-300 relative ghost-glow"
              >
{`
⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣦⠀
⠀⠀⠀⠀⣰⣿⡟⢻⣿⡟⢻⣧
⠀⠀⠀⣰⣿⣿⣇⣸⣿⣇⣸⣿
⠀⠀⣴⣿⣿⣿⣿⠟⢻⣿⣿⣿
⣠⣾⣿⣿⣿⣿⣿⣤⣼⣿⣿⠇
⢿⡿⢿⣿⣿⣿⣿⣿⣿⣿⡿⠀
⠀⠀⠈⠿⠿⠋⠙⢿⣿⡿⠁⠀
`}
              </motion.pre>
              <div className="absolute inset-0 -z-10 opacity-20 blur-xl bg-green-500/20 rounded-full filter" />
            </motion.div>

            <div className="text-gray-300 space-y-1 mt-6 relative z-10">
               <p><span className="text-green-400">Alias:</span> d1nhvar3n</p>
              <p><span className="text-green-400">Focus:</span> Penetration Testing, Security Research, CTF Challenges</p>
              <p><span className="text-green-400">Toolset:</span> Burp Suite, Nmap, Amass, FFUF, Arjun</p>
              <p><span className="text-green-400">Languages:</span> JavaScript, Java, C++, Python</p>
              <p><span className="text-green-400">Specialty:</span> Building offensive PoCs</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}