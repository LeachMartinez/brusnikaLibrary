import { FormEvent } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { initialModalState } from "../Library";
import { TReader, TSetModal } from "../Reader/types";
import styles from "./Book.module.scss";
import { TBook } from "./types";
import axios from "axios";
import { config } from "../../config";
import { useQuery, useQueryClient } from "react-query";

export default function TakeBook({ setModal, books }: { books: TBook[], setModal: TSetModal}) {
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery( 'takeReaders', () => { return axios.get(`${config.api_url}/readers`) }, {
    refetchOnWindowFocus: false,
  });
  
  if (isLoading) {
    return <span>Загрузка...</span>;
  }

  const readers = data?.data as  TReader[];

  async function onSubmitTakeBooks(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as HTMLFormElement,
          bookSelect = form.takeBooks as HTMLSelectElement,
          readerSelect = form.readers as HTMLSelectElement,
          booksIds = Array.from(bookSelect.selectedOptions).flatMap((selectedOption: HTMLOptionElement) => Number(selectedOption.value)),
          reader = Number(readerSelect.selectedOptions[0].value);

    if (booksIds.length < 1 || !reader) return alert("Произошла ошибка при взятии книги");

    try {
      await axios.post(`${config.api_url}/take_book`, {
        booksIds,
        readerId: reader
      })
      queryClient.refetchQueries(["books"])
      queryClient.refetchQueries(["readers"])
      setModal(() => initialModalState)
    } catch (error) {
      console.log(error);
      alert("Что-то пошло не так")
    }
  }

  return (
    <Modal onClose={() => setModal(() => initialModalState)}>
      <form onSubmit={onSubmitTakeBooks}>
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
