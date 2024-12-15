export type BookViewResult = {
    name: string;
    userScore?: number;
  };
  
  export type BooksResult = {
    past: BookViewResult[];
    present: { name: string }[];
  };
  