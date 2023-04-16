import {Timestamp} from 'firebase/firestore';

export interface ILevel {
  categoryId: string;
  categoryTitle: string;
  title: string;
  subTitle: string;
  description: string;
  text: string;
  inputType: string;
  difficulty: string;
  language: string;
  id: string;
  writerUid: string | null;
  writerEmail: string | null;
  createdAt: Timestamp | null;
  modifiedAt: Timestamp | null;
  order: number;
}

export interface ILevelListParams {
  categoryId?: string;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface IKeyInput {
  code: string;
  key: string;
  shiftKey: boolean;
  timestamp: Timestamp | null;
}

export interface IKeyMap {
  code: string;
  key: string;
  han: string;
  shiftKey: boolean;
}

export interface ILetter {
  sampleText: string | string[];
  typingText?: string[] | string[][];
}
