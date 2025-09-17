import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
              I'm a third-year <span className="text-green-400 font-semibold">Information Security</span> student 
              driven by a passion for <span className="text-green-400 font-semibold">web application exploitation</span> and <span className="text-green-400">offensive security</span>. What began as a love for coding 
              has evolved into uncovering vulnerabilities, <span className="text-green-400 font-semibold">breaking systems</span>, 
              and understanding how they work from the inside out.
            </p>

            <p className="text-gray-400 leading-relaxed mt-4">
              I’m currently sharpening my skills through <span className="text-green-400 font-semibold">offensive security labs</span>, 
              developing <span className="text-green-400">proof-of-concept exploits</span>, and competing in 
              <span className="text-green-400"> Capture The Flag (CTF)</span> challenges — mainly focused on 
              <span className="text-green-400"> web exploitation</span>. 
              I'm <span className="text-green-400 font-semibold">self-motivated</span>, <span className="text-green-400 font-semibold">independent</span>, 
              and <span className="text-green-400 font-semibold">quick to adapt</span> when facing new technologies or challenges.
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
                ease: "easeInOut",
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
              <motion.pre className="text-green-500 text-center transition-colors duration-300 relative ghost-glow">
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
              <p>
                <span className="text-green-400">Alias:</span> d1nhvar3n
              </p>
              <p>
                <span className="text-green-400">Focus:</span> Penetration
                Testing, Security Research, CTF Challenges
              </p>
              <p>
                <span className="text-green-400">Toolset:</span> Burp Suite,
                Nmap, Amass, FFUF, Arjun, etc
              </p>
              <p>
                <span className="text-green-400">Languages:</span> JavaScript,
                Java, Python (basic)
              </p>
              <p>
                <span className="text-green-400">Specialty:</span> Building
                offensive PoCs
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
