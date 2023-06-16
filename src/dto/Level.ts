import {ILevel, IUserTypingData} from 'interfaces/LevelInterface';

export const defaultLevelData: ILevel = {
  categoryId: '',
  categoryTitle: '',
  title: '',
  subTitle: '',
  description: '',
  text: '',
  inputType: 'word',
  difficulty: '1',
  language: 'ko',
  id: '',
  writerUid: null,
  writerEmail: null,
  createdAt: null,
  modifiedAt: null,
  order: 0
};

export const defaultUserTypingData: IUserTypingData = {
  id: '',
  userId: '',
  levelId: '',
  keyInputList: [],
  createdAt: null,
  accuracy: -1,
  realAccuracy: -1,
  speed: -1,
  duration: -1,
  score: -1
};
