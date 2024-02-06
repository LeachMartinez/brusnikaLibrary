import axios from "axios";
import React from "react";
import { config } from "../../config";
import { initialModalState } from "../Library";
import { TReaderCreate } from "./types";
import { useQueryClient } from "react-query";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import styles from "./Reader.module.scss";

export default function ReaderCreate(props: TReaderCreate) {
  const queryClient = useQueryClient();

  async function handleSubmitCreateReader(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const form = event.target as HTMLFormElement;

      const readerName = form.readerName.value as HTMLInputElement;
  
      if (!readerName) return;
  
      try {
        const method = props.reader ? "patch" : "post"
        await axios[method](`${config.api_url}/reader`, {
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
      <h2 className={styles.reader__create__title}> {props.reader ? "Редактировние" : "Создание"} читателя</h2>
         
        <div className={styles.reader__create__input__wrapper}>
          <span className={styles.reader__create__input__name}>Имя</span>
          <Input type="text" defaultValue={props.reader && props.reader.name} name="readerName"/>
        </div>
        <div className={styles.reader__create__button}>
          <Button>Добавить читателя</Button>
        </div>
      </form>
    </Modal>
  )
}