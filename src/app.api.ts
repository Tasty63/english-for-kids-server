export type UserType = {
  username: string;
  password: string;
  id: string;
};

export interface CategoryType {
  __id: string;
  cloudinary_id: string;
  name: string;
  preview: string;
  words: WordDataType[];
}

export type WordDataType = {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
  id: string;
};

export type StatisticWordType = {
  id: string;
  trained: number;
  guesses: number;
  mistakes: number;
};
