export interface LinkModule {
  id: string;
  name: string;
  subtext: string;
  url: string;
  themeColor: string; // Tailwind color class or hex
}

export interface Note {
  id: string;
  driveId?: string; // L'ID du fichier sur Google Drive
  title: string;
  content: string;
  lastModified: number;
  synced: boolean;
}

export interface RecentFile {
  driveId: string;
  title: string;
  lastAccessed: number;
}

export interface Notification {
  id: string;
  message: string;
  type: 'SUCCESS' | 'ERROR' | 'INFO';
  link?: string;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface CalendarCategory {
  id: string;
  name: string;
  color: string; // Hex code
  active: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // Format YYYY-MM-DD
  categoryId: string;
  description?: string;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  EDITOR = 'EDITOR',
  CALENDAR = 'CALENDAR',
  SETTINGS = 'SETTINGS'
}