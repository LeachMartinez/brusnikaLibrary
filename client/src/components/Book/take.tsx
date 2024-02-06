import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { initialModalState } from "../Library";
import { TReader, TSetModal } from "../Reader/types";
import styles from "./Book.module.scss";
import { TBook } from "./types";

export default function TakeBook({ setModal, books }: { books: TBook[], setModal: TSetModal}) {
  const readers = [] as TReader[];
  return (
    <Modal onClose={() => setModal(() => initialModalState)}>
      <form>
        <h2 className={styles.books__create__title}>Выбор книг из библиотеки</h2>
        <div className={styles.books__create__input__wrapper}>
          <span className={styles.books__create__input__name}>Выберите книги, которые хотите взять (можно выбрать несколько)</span>
          <select name="takeBooks" multiple>
            {
              books.map(book => (
                <option value={book.id} key={book.id}>{book.name}</option>
              ))
            }
          </select>
        </div>
        <div className={styles.books__create__input__wrapper}>
          <span className={styles.books__create__input__name}>Читатель, который берет книгу</span>
          <select name="readers">
            {
              readers.map(reader => (
                <option value={reader.id} key={reader.id}>{reader.name}</option>
              ))
            }
          </select>
        </div>

        <div className={styles.books__create__button}>  
          <Button>Взять книги</Button>
        </div>  
      </form>
    </Modal>
  )
}
