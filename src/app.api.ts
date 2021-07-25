export type UserType = {
  username: string;
  password: string;
  id: string;
};

export interface CategoryType {
  _id: string;
  name: string;
  preview: string;
  words: WordDataType[];
}

export type WordDataType = {
  _id: string;
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
};

export type StatisticWordType = {
  id: string;
  trained: number;
  guesses: number;
  mistakes: number;
};
