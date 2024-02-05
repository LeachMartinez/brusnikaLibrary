import axios from "axios";
import React from "react";
import { config } from "../../config";
import { initialModalState } from "../Library";
import { TReaderCreate } from "./types";
import { useQueryClient } from "react-query";
import Modal from "../../ui/Modal";

export default function ReaderCreate(props: TReaderCreate) {
  const queryClient = useQueryClient();

  async function handleSubmitCreateReader(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const form = event.target as HTMLFormElement;

      const readerName = form.readerName.value as HTMLInputElement;
  
      if (!readerName) return;
  
      try {
        await axios.post(`${config.api_url}/reader`, {
          name: readerName,
        });
  
        queryClient.refetchQueries(["readers"])
        props.setModal(() => initialModalState);
      } catch (error) {
        console.log(error); 
      }
  }

  return (
    <Modal onClose={() => {props.setModal(() => initialModalState)}}>
      <form onSubmit={handleSubmitCreateReader}>
        Имя <input type="text" name="readerName"/>
        <button>Добавить читателя</button>
      </form>
    </Modal>
  )
}