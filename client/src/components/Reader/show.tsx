import axios from "axios";
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import { initialModalState } from "../Library"
import { TReaderShow } from "./types"
import { config } from "../../config";
import { useQueryClient } from "react-query";
import ReaderCreate from "./Create";
import styles from "./Reader.module.scss";

export default function ShowReader({ reader, setModal }: TReaderShow) {
  const queryClient = useQueryClient();

  async function deleteReader () {
    try {
      await axios.delete(`${config.api_url}/reader/${reader.id}`);
      setModal(() => initialModalState);
      queryClient.refetchQueries(["readers"]);
      queryClient.refetchQueries(["books"]);
    } catch (error) {
      console.log(error);
      alert("Что-то пошло не так")
    }
  }

  function editReader() {
    setModal(() => ({
      open: true,
      content: <ReaderCreate setModal={setModal} reader={reader} />
    }));
  }

  async function onRefundBook(bookId: number) {
    try {
      await axios.post(`${config.api_url}/refund/${bookId}`);
      setModal(() => initialModalState);
      queryClient.refetchQueries(["readers"]);
      queryClient.refetchQueries(["books"]);
    } catch (error) {
      console.log(error);
      alert("Что-то пошло не так")
    }
  }

  return (
    <Modal onClose={() => setModal(() => initialModalState)}>
      <div>
        <div className={styles.reader__show__wrapper}>
          <h2 className={styles.reader__show__title}>Читатель</h2>
          <div className={styles.reader__show__info}>
            <span>Имя: </span>
            <span>{reader.name}</span>
          </div>
        </div>
        {reader.books.length > 0 ? (
          <div>
            <div className={styles.reader__show__book__status}>
              <span>Читает:</span>
              <span>Кол-во книг: {reader.books.length}</span>
            </div>
            <div className={styles.reader__show__book__wrapper}>
              {
                reader.books.map((book) => (
                  <div key={book.id} className={styles.reader__show__book}>
                    <div className={styles.reader__show__book__info}>
                      <span>Название: {book.name}</span>
                      <span>Автор: {book.author}</span>
                    </div>
                    <Button onClick={() => onRefundBook(book.id!)}>Вернуть</Button>
                  </div>
                ))
              }
            </div>
          </div>
        ) : (
          <span>Пользователь ничего не читает</span>
        )}
        <div className={styles.reader__buttons}>
          <Button onClick={editReader}>Редактировать</Button>
          <Button onClick={deleteReader}>Удалить читателя</Button>
        </div>
      </div>
    </Modal>
  )
}