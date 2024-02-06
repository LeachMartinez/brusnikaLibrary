import { TReader, TSetModal } from "../Reader/types";

export type TBookCreate = {
  book?: TBook;
  setModal: TSetModal;
}
export type TBook = {
  id?: number;
  author: string;
  description?: string;
  name: string;
  reader?: TReader;
}

export type TBookList = {
  setModal: TSetModal
}

export type TBookItem = {
  book: TBook,
  setModal: TSetModal
}
export type TShowBook = TBookItem

