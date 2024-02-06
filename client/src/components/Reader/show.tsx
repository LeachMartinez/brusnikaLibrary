import axios from "axios";
import Button from "../../ui/Button"
import Modal from "../../ui/Modal"
import { initialModalState } from "../Library"
import { TReaderShow } from "./types"
import { config } from "../../config";
import { useQueryClient } from "react-query";
import ReaderCreate from "./create";

export default function ShowReader({ reader, setModal }: TReaderShow) {
  const queryClient = useQueryClient();

  async function deleteReader () {
    try {
      await axios.delete(`${config.api_url}/reader/${reader.id}`);
      setModal(() => initialModalState);
      queryClient.refetchQueries(["readers"]);
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
  
  return (
    <Modal onClose={() => setModal(() => initialModalState)}>
      <div>
        <h2>Читатель</h2>
        <h3>{reader.name}</h3>
        <span>Читает:</span>
        <div>
          {
            reader.books.map((book) => (
              <div key={book.id}>
                <h3>{book.name}</h3>
                <span>{book.author}</span>
                <Button>Удалить</Button>
              </div>
            ))
          }
        </div>
        <Button onClick={editReader}>Редактировать</Button>
        <Button onClick={deleteReader}>Удалить читателя</Button>
      </div>
    </Modal>
  )
}