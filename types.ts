
export enum Subject {
  OS = "Operating Systems",
  Maths = "Mathematics",
  DSA = "Data Structures & Algorithms",
  DBMS = "Database Management Systems",
  Python = "Python Programming",
}

export interface Book {
  name: string;
  subject: Subject;
}

export interface Notes {
  aiNotes: string[];
  readyReckoner: string[];
}
