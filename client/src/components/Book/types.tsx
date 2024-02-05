export type TBookCreate = {
  setModal: React.Dispatch<React.SetStateAction<{
    open: boolean;
    content: JSX.Element | null;
  }>>
}
export type TBook = {
  id?: number;
  author: string;
  description?: string;
  name: string;
  readerId?: number;
}

export type TBookList = {
  setModal: React.Dispatch<React.SetStateAction<{
    open: boolean;
    content: JSX.Element | null;
  }>>
}