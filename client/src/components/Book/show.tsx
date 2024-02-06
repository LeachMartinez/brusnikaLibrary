import axios from "axios";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { initialModalState } from "../Library";
import { TShowBook } from "./types";
import { config } from "../../config";
import { useQueryClient } from "react-query";
import BookCreate from "./create";

export default function ShowBook({ book, setModal}: TShowBook) {
  const queryClient = useQueryClient();

  async function deleteBook () {
    try {
      await axios.delete(`${config.api_url}/book/${book.id}`);
      setModal(() => initialModalState);
      queryClient.refetchQueries(["books"]);
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
        <div>
          <h2>Информация о книге</h2>
          <h3>Название: {book.name}</h3>
          <h4>Автор: {book.author}</h4>
          <p>Описание: {book.description}</p>
          <span>Читатель: {book.reader?.name}</span>
        </div>
        <div>
          <Button onClick={editBook}>Редактировать</Button>
          <Button onClick={deleteBook}>удалить книгу</Button>
        </div>
      </div>
    </Modal>
  )
}