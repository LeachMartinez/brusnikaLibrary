
import axios from "axios";
import { config } from "../../config";
import { TBookCreate } from "./types";
import { initialModalState } from "../Library";
import { useQueryClient } from "react-query";
import Modal from "../../ui/Modal";

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
      await axios.post(`${config.api_url}/book`, {
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
      <form onSubmit={handleSubmitCreateReader}>
        Название <input type="text" name="bookName"/>
        Автор <input type="text" name="author"/>
        Описание <input type="text" name="description"/>
        <button>Добавить книгу</button>
      </form>
    </Modal>
  )
}