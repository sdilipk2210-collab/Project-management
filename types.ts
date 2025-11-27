
export enum Company {
  MAKTUNE = 'Maktune',
  DK = 'DK',
  DE = 'DE',
  PERSONAL = 'Personal',
  ALL = 'All'
}

export interface Task {
  id: string;
  title: string;
  company: Company | string;
  tag: string;
  date: string;
  priority: 'P1' | 'P2' | 'P3';
  status: 'Todo' | 'In Progress' | 'Done';
  description?: string;
  projectId?: string;
  projectTitle?: string;
}

export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Project {
  id: string;
  title: string;
  company: Company | string;
  subTag: string;
  status: 'In Progress' | 'Planning' | 'Completed' | 'Backlog' | 'In Testing' | 'Design';
  description?: string;
  subtasks?: Subtask[];
}

export interface Idea {
  id: string;
  title: string;
  company: Company | string;
  stage: 'Brain Dump' | 'Under Validation' | 'In Project' | 'Implemented';
  impact: 'Low' | 'Medium' | 'High';
  description?: string;
}

export type ItemType = 'task' | 'project' | 'idea';
