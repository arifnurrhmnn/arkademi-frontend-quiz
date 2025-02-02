interface IQuestion {
  timeout: string;
  correctIndex: string;
  options: string[];
  question: string;
}

export interface IQuiz {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  questions: IQuestion[];
}
