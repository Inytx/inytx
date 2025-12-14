import { HardDrive, Globe, Mail, BookOpen, GraduationCap, FileText, Cpu, LayoutGrid, Terminal } from 'lucide-react';
import { LinkModule } from './types';

export const MODULES: LinkModule[] = [
  {
    id: '01',
    name: 'G-DRIVE',
    subtext: 'CLOUD STORAGE',
    url: 'https://drive.google.com',
    themeColor: 'text-yellow-400'
  },
  {
    id: '02',
    name: 'NOTEBOOK LM',
    subtext: 'AI RESEARCH',
    url: 'https://notebooklm.google.com/',
    themeColor: 'text-purple-400'
  },
  {
    id: '03',
    name: 'HIPHIPHIP',
    subtext: 'PRODUCTIVITY',
    url: 'https://www.hiphiphip.app/',
    themeColor: 'text-orange-400'
  },
  {
    id: '04',
    name: 'DOCS',
    subtext: 'TEXT EDITOR',
    url: 'https://docs.google.com',
    themeColor: 'text-blue-400'
  },
  {
    id: '05',
    name: 'GMAIL',
    subtext: 'COMMUNICATION',
    url: 'https://mail.google.com/',
    themeColor: 'text-pink-400'
  },
  {
    id: '06',
    name: 'THEIA',
    subtext: 'LEARNING SYS',
    url: 'https://elffe.theia.fr/learning/index',
    themeColor: 'text-green-400'
  }
];

export const ICONS = {
  Drive: HardDrive,
  Web: Globe,
  Mail: Mail,
  Book: BookOpen,
  School: GraduationCap,
  File: FileText,
  Cpu: Cpu,
  Grid: LayoutGrid,
  Terminal: Terminal
};