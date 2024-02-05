import BookCreate from "./create";
import { useQuery } from "react-query";
import axios from "axios";
import { config } from "../../config";
import { TBook, type TBookList } from "./types";
import styles from "./Book.module.scss";

export function BookList({ setModal }: TBookList) {
  const { isLoading, data } = useQuery( 'books', () => { return axios.get(`${config.api_url}/books`) }, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <span>Загрузка...</span>;
  }

  const books = data?.data as TBook[];

  function showBookModal() {   
    setModal(() => ({
      open: true,
      content: <BookCreate
        setModal={setModal}
      />
    }))
  }

  return (
    <div className={styles.books__container}>
      <div className={styles.books__info}>
        <span>Книги</span>
        <span>Всего: {data?.data.length}</span>
      </div>
      <div className={styles.books__list}>
        {
          books.map((book) => <div className={styles.books__item} key={book.id}>{book.name}</div>)
        }
      </div>
      <div className={styles.books__buttons}>
        <button onClick={showBookModal}>Добавить Книгу</button>
        <button>Взять Книгу</button>
      </div>
    </div>
  )
}