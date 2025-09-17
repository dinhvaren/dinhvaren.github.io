import React, {
  useState,
  useRef,
  useEffect,
  lazy,
  Suspense,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Github, X, Maximize2, Minimize2 } from "lucide-react";
import TypeWriter from "./TypeWriter";
import LineByLine from "./LineByLine";
import { createCommands, CommandOutput } from "./terminalCommands";

const MatrixBackground = lazy(() =>
  import("./MatrixBackground").then((module) => ({
    default: module.MatrixBackground,
  }))
);

const TERMINAL_VERSION = "1.1.0";

const titleBanner = String.raw`
 ____  _       _       _                            
|  _ \(_)_ __ | |__   | |   _   _  ___  _ __   __ _ 
| | | | | '_ \| '_ \  | |  | | | |/ _ \| '_ \ / _\` |
| |_| | | | | | | | | | |__| |_| | (_) | | | | (_| |
|____/|_|_| |_|_| |_| |_____\__,_|\___/|_| |_|\__, |
                                              |___/ 
`;

const socialLinks = [
  { name: "GitHub", url: "https://github.com/dinhvaren", icon: Github },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/dinhvaren/",
    icon: Github,
  },
];

export function Terminal() {
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState<CommandOutput[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileKeyboardOpen, setIsMobileKeyboardOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setOutput([
        {
          type: "ascii",
          content: (
            <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-8">
              <motion.pre
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-green-400 text-[8px] xs:text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre font-bold glitch-text hidden sm:block"
              >
                {titleBanner}
              </motion.pre>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-green-400 text-xl sm:text-2xl md:text-3xl font-bold sm:hidden text-center"
              >
                {`Terminal v${TERMINAL_VERSION}`}
              </motion.h1>
            </div>
          ),
        },
      ]);

      if (!hasInitializedRef.current) {
        hasInitializedRef.current = true;
        const steps = [
          "msf exploit(linux/ssh/libssh_auth_bypass) > exploit",
          "[*] Started reverse TCP handler on 192.168.10.1:4444",
          "[*] Attempting to bypass authentication...",
          "[*] Exploit successful, sending payload...",
          "[*] Meterpreter session 1 opened (192.168.10.1:4444 -> 192.168.10.1:58342)",
          "meterpreter > shell",
        ];

        setIsTyping(true);
        setOutput((prev) => [
          ...prev,
          {
            type: "output",
            content: (
              <LineByLine
                lines={steps}
                onComplete={() => setIsTyping(false)}
                speed="fast"
              />
            ),
          },
        ]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getAboutData = () => {
    const aboutContent = [
      "╭─ About Me ───────────────────────────────────╮",
      "│                                           ",
      "│  Name: Luong Nguyen Ngoc Dinh             ",
      "│  Role: Cybersecurity Student & Developer  ",
      "│                                           ",
      "│  Focused on offensive security labs and   ",
      "│  building tools that break, exploit, and  ",
      "│  better understand system vulnerabilities.",
      "│                                           ",
      "│  Backend developer in the cybersecurity   ",
      "│  realm, blending code with exploitation.  ",
      "│  Passionate about malware analysis, CTFs, ",
      "│  and red team research.                   ",
      "│                                           ",
      "╰───────────────────────────────────────────────╯",
    ];
    return aboutContent.join("\n");
  };

  const getProjectsData = () => {
    const projects = [
      "╭─ Featured Projects ────────────────────────────────╮",
      "│                                                 ",
      "│  1. AI SmartControl                             ",
      "│     AI-powered voice-controlled computer system ",
      "│                                                 ",
      "│  2. Video NFT DEX                               ",
      "│     Decentralized video sharing + NFT & DEX     ",
      "│                                                 ",
      "│  3. Noi That Phu Quy                            ",
      "│     Full-stack furniture e-commerce platform    ",
      "│                                                 ",
      "│  4. Coza Store                                  ",
      "│     Spring Boot e-commerce web application      ",
      "│                                                 ",
      "│  5. Personal Blog (Planned)                     ",
      "│     Blogging platform with markdown support     ",
      "│                                                 ",
      "│  6. Personal Exploit Framework Tool (Planned)   ",
      "│     Security exploit research framework         ",
      "│                                                 ",
      "│  → More available on GitHub or in the full      ",
      "│    portfolio                                     ",
      "╰──────────────────────────────────────────────────────╯",
    ];
    return projects.join("\n");
  };

  const getSkillsData = () => {
    const skillsContent = [
      "╭─ Technical Skills ────────────────────────────────────────────────╮",
      "│                                                                ",
      "│  Programming:  JavaScript, Java, Python (basic)                ",
      "│                                                                ",
      "│  Web Security: Black-box & White-box testing, OWASP Top 10     ",
      "│                Code review, File upload, Path traversal,       ",
      "│                Command & SQL injection, etc                    ",
      "│                                                                ",
      "│  Tools:        Burp Suite, Nmap, Amass, FFUF, Arjun, Nmap, etc ",
      "│                                                                ",                                                                
      "│  Workflow:     Enumeration, Exploitation, Post-exploitation,   ",
      "│                Report writing                                  ",
      "│                                                                ",
      "│  Practice:     TryHackMe, Hack The Box, picoCTF, PortSwigger,  ",
      "│                CyberJutsu                                      ",
      "│                                                                ",
      "│  Other:        Spring Boot, Node.js Framework                  ",
      "│                                                                ",
      "│  Soft Skills:  Communication, Teamwork, Time Management,       ",
      "│                Ability to Learn & Self-Improve                 ",
      "│                                                                ",
      "╰──────────────────────────────────────────────────────────────────────╯",
    ];

    return skillsContent.join("\n");
  };

  const getContactData = () => {
    const contactContent = [
      "╭─ Contact Information ─────────────────────────╮",
      "│                                            ",
      "│  Email:  dinhlnng2003@gmail.com            ",
      "│  GitHub: github.com/dinhvaren              ",
      "│  LinkedIn: linkedin.com/in/dinhvaren      ",
      "│                                            ",
      "│  Open for collaborations and opportunities ",
      "│  Feel free to reach out anytime.           ",
      "│                                            ",
      "╰─────────────────────────────────────────────────╯",
    ];

    return contactContent.join("\n");
  };

  const getExperienceData = () => {
    const exp = [
      "╭─ Awards & Honors ───────────────────────╮",
      "│                                         ",
      "│  Technology Innovation Contest -        ",
      "│  University Cluster 22                  ",
      "│  Van Hien University                    ",
      "│  2025                                   ",
      "│  → Special Prize                        ",
      "│                                         ",
      "│  Mammothon Hackathon - Celestia Viet Nam",
      "│  Gia Dinh University                    ",
      "│  2024                                   ",
      "│  → Top 13 Finalist                      ",
      "│                                         ",
      "│  Creative Tech Product Design Contest   ",
      "│  for People with Disabilities 2025      ",
      "│  Young Sci. & Tech. Dev Center           ",
      "│  2025                                   ",
      "│  → Top 35 Semifinalist                   ",
      "│                                         ",
      "│  17th Youth Innovation Ideas Contest    ",
      "│  Young Sci. & Tech. Dev Center           ",
      "│  2025                                   ",
      "│  → Top 50 Semifinalist                   ",
      "│                                         ",
      "╰───────────────────────────────────────────╯",
    ];
    return exp.join("\n");
  };

  const getAboutEducation = () => {
    const aboutContent = [
      "╭─ About Me ───────────────────────────────────╮",
      "│                                           ",
      "│  Name: Luong Nguyen Ngoc Dinh             ",
      "│  Role: Cybersecurity Student & Developer  ",
      "│                                           ",
      "│  Focused on offensive security labs and   ",
      "│  building tools that break, exploit, and  ",
      "│  better understand system vulnerabilities.",
      "│                                           ",
      "│  Backend developer in the cybersecurity   ",
      "│  realm, blending code with exploitation.  ",
      "│  Passionate about malware analysis, CTFs, ",
      "│  and red team research.                   ",
      "│                                           ",
      "╰───────────────────────────────────────────────╯",
    ];
    return aboutContent.join("\n");
  };
  const commands = useMemo(
    () =>
      createCommands({
        navigate,
        setOutput,
        setIsTyping,
        titleBanner,
        terminalVersion: TERMINAL_VERSION,
        socialLinks,
        getAboutData,
        getProjectsData,
        getSkillsData,
        getContactData,
        getExperienceData,
        getAboutEducation,
      }),
    [navigate]
  );

  const processCommand = (cmd: string) => {
    const args = cmd.trim().split(" ");
    const command = args[0].toLowerCase();

    setIsTyping(true);
    const foundCommand = commands.find((c) => c.name === command);

    if (foundCommand) {
      foundCommand.action();
    } else {
      setOutput((prev) => [
        ...prev,
        {
          type: "error",
          content: (
            <TypeWriter
              text={`Command not found: ${command}. Type 'help' for available commands.`}
              onComplete={() => setIsTyping(false)}
              speed="fast"
            />
          ),
        },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsTyping(true);
    setOutput((prev) => [
      ...prev,
      {
        type: "input",
        content: (
          <TypeWriter
            text={`dinhvaren@portfolio:~$ ${input}`}
            onComplete={() => {
              processCommand(input);
            }}
            showCursor={false}
            speed="fast"
          />
        ),
      },
    ]);

    setHistory((prev) => [input, ...prev]);
    setInput("");
    setHistoryIndex(-1);

    if (terminalContentRef.current) {
      setTimeout(() => {
        terminalContentRef.current?.scrollTo({
          top: terminalContentRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[rgb(var(--bg-rgb))] flex items-center justify-center">
        <div className="text-green-500 text-xl animate-pulse">
          Initializing Terminal...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-h-[calc(var(--vh,1vh)*100)] bg-[rgb(var(--bg-rgb))] flex items-center justify-center p-2 sm:p-4 relative overflow-hidden cursor-default">
      <Suspense fallback={null}>
        <MatrixBackground />
      </Suspense>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`w-full bg-[rgba(var(--bg-rgb),0.8)] border border-green-500/20 backdrop-blur-sm relative z-10 flex flex-col ${
          isMaximized
            ? "fixed inset-0 m-0 max-w-none h-full rounded-none"
            : "max-w-4xl rounded-lg"
        }`}
      >
        <div className="flex items-center justify-between p-2 bg-[rgba(var(--bg-rgb),0.5)] border-b border-green-500/20">
          <div className="flex items-center gap-2">
            <button
              aria-label="Close terminal"
              onClick={() => navigate("/")}
              className="group w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center rounded-full bg-red-500/50 hover:bg-red-500"
            >
              <X
                className="w-2 h-2 text-black opacity-75 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
            </button>
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-500/50" />
            <button
              aria-label={
                isMaximized ? "Restore terminal" : "Maximize terminal"
              }
              onClick={() => setIsMaximized((v) => !v)}
              className="group w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center rounded-full bg-green-500/50 hover:bg-green-500"
            >
              {isMaximized ? (
                <Minimize2
                  className="w-2 h-2 text-black opacity-75 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              ) : (
                <Maximize2
                  className="w-2 h-2 text-black opacity-75 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-[10px] sm:text-xs text-gray-500">{`v${TERMINAL_VERSION}`}</span>
            <span className="text-[10px] sm:text-xs text-gray-500">
              dinhvaren@portfolio:~
            </span>
          </div>
        </div>

        <div
          ref={terminalContentRef}
          className="flex-1 h-[60vh] sm:h-[70vh] md:h-[calc(100vh-12rem)] md:max-h-[700px] p-3 sm:p-6 font-mono text-xs sm:text-sm overflow-y-auto custom-scrollbar"
          onClick={() => inputRef.current?.focus()}
          style={{
            height: isMobileKeyboardOpen ? "40vh" : undefined,
          }}
        >
          <AnimatePresence>
            {output.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`${
                  line.type === "input"
                    ? "text-green-400"
                    : line.type === "ascii"
                    ? ""
                    : line.type === "error"
                    ? "text-red-400"
                    : line.type === "success"
                    ? "text-green-400"
                    : "text-gray-300"
                } whitespace-pre-wrap mb-4 matrix-text break-words`}
              >
                {line.content}
              </motion.div>
            ))}
          </AnimatePresence>

          {!isTyping && (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-green-400 text-xs sm:text-sm whitespace-nowrap">
                dinhvaren@portfolio:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                onFocus={() => setIsMobileKeyboardOpen(true)}
                onBlur={() => setIsMobileKeyboardOpen(false)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-[rgb(var(--text-rgb))] caret-green-500 text-xs sm:text-sm w-full"
                autoFocus
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
            </form>
          )}
        </div>

        <div className="p-2 border-t border-green-500/20 bg-[rgba(var(--bg-rgb),0.5)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-green-400 transition-colors"
                    aria-label={link.name}
                  >
                    <Icon
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>
            <span className="text-[10px] sm:text-xs text-gray-500">
              Type <span className="rainbow-text font-bold">'help'</span> for
              commands
            </span>
          </div>
        </div>

        <div className="scan-lines hidden sm:block" />
      </motion.div>
    </div>
  );
}

export default Terminal;
