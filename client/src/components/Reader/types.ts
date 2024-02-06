import { type TBook } from "../Book/types";

export type TReaderCreate = {
  setModal: TSetModal;
  reader?: TReader;
}
export type TReader = {
  id?: number;
  name: string;
  books: TBook[];
}

export type TReaderList = {
  setModal: TSetModal
}

export type TReaderItem = {
  reader: TReader;
  setModal: TSetModal;
}

export type TSetModal = React.Dispatch<React.SetStateAction<{
  open: boolean;
  content: JSX.Element | null;
}>>

export type TReaderShow = TReaderItem