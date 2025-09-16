import React from 'react';
import { motion } from 'framer-motion';
import { NavigateFunction } from 'react-router-dom';
import TypeWriter from './TypeWriter';
export interface CommandOutput {
  type: 'input' | 'output' | 'ascii' | 'error' | 'success';
  content: string | React.ReactNode;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface CommandContext {
  navigate: NavigateFunction;
  setOutput: React.Dispatch<React.SetStateAction<CommandOutput[]>>;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  titleBanner: string;
  terminalVersion: string;
  socialLinks: SocialLink[];
  getAboutData: () => string;
  getProjectsData: () => string;
  getSkillsData: () => string;
  getContactData: () => string;
  getExperienceData: () => string;
}

export interface TerminalCommand {
  name: string;
  description: string;
  action: () => void;
}

export function createCommands(ctx: CommandContext): TerminalCommand[] {
  const {
    navigate,
    setOutput,
    setIsTyping,
    titleBanner,
    terminalVersion,
    socialLinks,
    getAboutData,
    getProjectsData,
    getSkillsData,
    getContactData,
    getExperienceData,
  } = ctx;

  return [
    {
      name: 'help',
      description: 'Display available commands',
      action: () => {
        const helpContent = [
          '╭─ Available Commands ─────────────────────────────────╮',
          '│                                                      ',
          '│  help     - Display this help message              ',
          '│  about    - Display portfolio info                 ',
          '│  awards   - List of awards and achievements ',
          '│  projects - List project details                   ',
          '│  skills   - Display technical skills               ',
          '│  contact  - Show contact information               ',
          '│  ls       - List available sections                ',
          '│  whoami   - Display current user                     ',
          '│  version  - Terminal version                         ',
          '│  social   - Social links                             ',
          '│  clear    - Clear terminal screen                    ',
          '│  home     - Return to main portfolio                 ',
          '│  exit     - Same as home                             ',
          '│  quit     - Alias for exit                           ',
          '│                                                      ',
          '╰────────────────────────────────────────────────────────╯',
        ];
        setOutput(prev => [
          ...prev,
          {
            type: 'success',
            content: (
              <TypeWriter
                text={`\n${helpContent.join('\n')}\n`}
                onComplete={() => setIsTyping(false)}
                speed="fast"
              />
            ),
          },
        ]);
      },
    },
    {
      name: 'about',
      description: 'Display portfolio owner info',
      action: () => {
        setOutput(prev => [
          ...prev,
          {
            type: 'success',
            content: (
              <TypeWriter
                text={`\n${getAboutData()}\n`}
                onComplete={() => setIsTyping(false)}
                speed="fast"
              />
            ),
          },
        ]);
      },
    },
    {
      name: 'awards',
      description: 'List of awards and achievements',
      action: () => {
        setOutput(prev => [
          ...prev,
          {
            type: 'success',
            content: (
              <TypeWriter
                text={`\n${getExperienceData()}\n`}
                onComplete={() => setIsTyping(false)}
                speed="fast"
              />
            ),
          },
        ]);
      },
    },
    {
      name: 'projects',
      description: 'List project details',
      action: () => {
        setOutput(prev => [
          ...prev,
          {
            type: 'success',
            content: (
              <TypeWriter
                text={`\n${getProjectsData()}\n`}
                onComplete={() => setIsTyping(false)}
                speed="fast"
              />
            ),
          },
        ]);
      },
    },
    {
      name: 'skills',
      description: 'Display technical skills',
      action: () => {
        setOutput(prev => [
          ...prev,
          {
            type: 'success',
            content: (
              <TypeWriter
                text={`\n${getSkillsData()}\n`}
                onComplete={() => setIsTyping(false)}
                speed="fast"
              />
            ),
          },
        ]);
      },
    },
    {
      name: 'contact',
      description: 'Show contact information',
      action: () => {
        setOutput(prev => [
          ...prev,
          {
            type: 'success',
            content: (
              <TypeWriter
                text={`\n${getContactData()}\n`}
                onComplete={() => setIsTyping(false)}
                speed="fast"
              />
            ),
          },
        ]);
      },
    },
    {
      name: 'ls',
      description: 'List available sections',
      action: () => {
        setOutput(prev => [
          ...prev,
          {
            type: 'output',
            content: (
              <TypeWriter
                text={'about\nawards\nprojects\nskills\ncontact'}
                onComplete={() => setIsTyping(false)}
                speed="fast"
              />
            ),
          },
        ]);
      },
    },
    {
      name: 'whoami',
      description: 'Display current user',
      action: () => {
        setOutput(prev => [
          ...prev,
          {
            type: 'output',
            content: (
              <TypeWriter
                text="dinhvaren"
                onComplete={() => setIsTyping(false)}
                speed="fast"
              />
            ),
          },
        ]);
      },
    },
    {
      name: 'version',
      description: 'Show terminal version',
      action: () => {
        setOutput(prev => [
          ...prev,
          {
            type: 'output',
            content: (
              <TypeWriter
                text={`v${terminalVersion}`}
                onComplete={() => setIsTyping(false)}
                speed="fast"
              />
            ),
          },
        ]);
      },
    },
    {
      name: 'social',
      description: 'Display social links',
      action: () => {
        setOutput(prev => [
          ...prev,
          {
            type: 'output',
            content: (
              <TypeWriter
                text={socialLinks.map(l => `${l.name}: ${l.url}`).join('\n')}
                onComplete={() => setIsTyping(false)}
                speed="fast"
              />
            ),
          },
        ]);
      },
    },
    {
      name: 'clear',
      description: 'Clear terminal screen',
      action: () => {
        setOutput([
          {
            type: 'ascii',
            content: (
              <div className="flex flex-col items-center space-y-6">
                <motion.pre
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-green-400 text-[8px] xs:text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre font-bold hidden sm:block"
                >
                  {titleBanner}
                </motion.pre>
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-green-400 text-xl sm:text-2xl md:text-3xl font-bold sm:hidden text-center"
                >
                  {`Terminal v${terminalVersion}`}
                </motion.h1>
              </div>
            ),
          },
          {
            type: 'output',
            content: (
              <TypeWriter
                text="Terminal cleared. Type 'help' for commands."
                onComplete={() => setIsTyping(false)}
                speed="fast"
              />
            ),
          },
        ]);
      },
    },
    {
      name: 'home',
      description: 'Return to main portfolio',
      action: () => {
        navigate('/');
      },
    },
    {
      name: 'exit',
      description: 'Exit the terminal',
      action: () => {
        navigate('/');
      },
    },
    {
      name: 'quit',
      description: 'Alias for exit',
      action: () => {
        navigate('/');
      },
    },
  ];
}
