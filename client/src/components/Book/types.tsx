import { TSetModal } from "../Reader/types";

export type TBookCreate = {
  book?: TBook;
  setModal: TSetModal;
}
export type TBook = {
  id?: number;
  author: string;
  description?: string;
  name: string;
  readerId?: number;
}

export type TBookList = {
  setModal: TSetModal
}

export type TBookItem = {
  book: TBook,
  setModal: TSetModal
}
export type TShowBook = TBookItem

