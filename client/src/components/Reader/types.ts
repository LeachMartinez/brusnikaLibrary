import { type TBook } from "../Book/types";

export type TReaderCreate = {
  setModal: React.Dispatch<React.SetStateAction<{
    open: boolean;
    content: JSX.Element | null;
  }>>
}
export type TReader = {
  id?: number;
  name: string;
  books: TBook[];
}