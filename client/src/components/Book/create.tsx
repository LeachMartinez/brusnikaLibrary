
import axios from "axios";
import { config } from "../../config";
import { TBookCreate } from "./types";
import { initialModalState } from "../Library";
import { useQueryClient } from "react-query";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import styles from "./Book.module.scss";
import Input from "../../ui/Input";

export default function BookCreate(props: TBookCreate) {
  const queryClient = useQueryClient();

  async function handleSubmitCreateReader(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement,
          bookName = form.bookName.value as HTMLInputElement,
          description = form.description.value as HTMLInputElement,
          author = form.author.value as HTMLInputElement;

    if (!bookName || !description || !author) return;

    try {
      const method = props.book ? "patch" : "post"
      await axios[method](`${config.api_url}/book`, {
        id: props.book ? props.book.id : null,
        name: bookName,
        author,
        description
      });

      queryClient.refetchQueries(["books"])
      props.setModal(() => initialModalState);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal onClose={() => {props.setModal(() => initialModalState)}}>
      <form onSubmit={handleSubmitCreateReader} className={styles.books__create}>
        <h2 className={styles.books__create__title}> {props.book ? "Редактировние" : "Создание"} книги</h2>
        <div className={styles.books__create__input__wrapper}>
          <span className={styles.books__create__input__name}>Название</span>
          <Input defaultValue={props.book && props.book.name} type="text" name="bookName"/>
        </div>
        <div className={styles.books__create__input__wrapper}>
          <span className={styles.books__create__input__name}>Автор</span>
          <Input defaultValue={props.book && props.book.author} type="text" name="author"/>
        </div>
        <div className={styles.books__create__input__wrapper}>  
          <span className={styles.books__create__input__name}>Описание</span>
          <Input defaultValue={props.book && props.book.description} type="text" name="description"/>
        </div>

        <div className={styles.books__create__button}>  
          <Button>{props.book ? "Редактировать" :"Добавить"} книгу</Button>
        </div>  
      </form>
    </Modal>
  )
}