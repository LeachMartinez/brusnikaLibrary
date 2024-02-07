import axios from "axios";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { initialModalState } from "../Library";
import { TShowBook } from "./types";
import { config } from "../../config";
import { useQueryClient } from "react-query";
import BookCreate from "./Сreate";
import styles from "./Book.module.scss";

export default function ShowBook({ book, setModal}: TShowBook) {
  const queryClient = useQueryClient();

  async function deleteBook () {
    try {
      await axios.delete(`${config.api_url}/book/${book.id}`);
      setModal(() => initialModalState);
      queryClient.refetchQueries(["books"]);
      queryClient.refetchQueries(["readers"]);
    } catch (error) {
      console.log(error);
      alert("Что-то пошло не так")
    }
  }

  function editBook() {
    setModal(() => ({
      open: true,
      content: <BookCreate setModal={setModal} book={book} />
    }));
  }

  return (
    <Modal onClose={() => setModal(() => initialModalState)}>
      <div>
        <div className={styles.books__show__wrapper}>
          <h2 className={styles.books__show__title}>Информация о книге</h2>
          <div className={styles.books__show__info}>
            <span>Название:</span>
            <span>{book.name}</span>
          </div>
          <div className={styles.books__show__info}>
            <span>Автор:</span>
            <span>{book.author}</span>
          </div>
          <div className={styles.books__show__info}>
            <span>Описание:</span>
            <span>{book.description}</span>
          </div>
          <div className={styles.books__show__info}>
            <span>Читатель:</span>
            <span>{book.reader?.name}</span>
          </div>
        </div>
        <div className={styles.books__buttons}>
          <Button onClick={editBook}>Редактировать</Button>
          <Button onClick={deleteBook}>удалить книгу</Button>
        </div>
      </div>
    </Modal>
  )
}