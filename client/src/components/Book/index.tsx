import BookCreate from "./create";
import { useQuery } from "react-query";
import axios from "axios";
import { config } from "../../config";
import { TBook, TBookItem, type TBookList } from "./types";
import styles from "./Book.module.scss";
import Button from "../../ui/Button";
import ShowBook from "./show";
import TakeBook from "./take";

function BookItem({ setModal, book }: TBookItem) {
  function showBookModal() {
    setModal(() => ({
      open: true,
      content: <ShowBook
        book={book}
        setModal={setModal}
      />
    }))
  }

  return (
    <div className={[styles.books__item, book.reader ? styles.required : styles.free].join(" ")} key={book.id} onClick={showBookModal}>
      {book.name}
      { book.reader && <span className={styles.books__item__reader}>Читатель: {book.reader.name}</span>}
    </div>
  )
}

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

  function takeBooks() {
    setModal(() => ({
      open: true,
      content: <TakeBook
        setModal={setModal}
        books={books.filter(book => !book.reader)}
      />
    }))
  }

  return (
    <div className={styles.books__container}>
      <div className={styles.books__info}>
        <span>Книги</span>
        <span>Всего: {books.length}</span>
      </div>
      <div className={styles.books__list}>
        {
          books.map((book) => <BookItem book={book} setModal={setModal} key={book.id}/>)
        }
      </div>
      <div className={styles.books__buttons}>
        <Button onClick={showBookModal}>Добавить Книгу</Button>
        <Button onClick={takeBooks}>Взять Книги</Button>
      </div>
    </div>
  )
}