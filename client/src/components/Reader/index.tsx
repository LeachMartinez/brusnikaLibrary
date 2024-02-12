import ReaderCreate from "./Create";
import { useQuery } from "react-query";
import axios from "axios";
import { config } from "../../config";
import { TReader, TReaderItem, TReaderList } from "./types";
import styles from "./Reader.module.scss";
import Button from "../../ui/Button";
import ShowReader from "./Show";

function ReaderItem ({ reader, setModal }: TReaderItem) {
  function showReaderModal() {
    setModal(() => ({
      open: true,
      content: <ShowReader
        reader={reader}
        setModal={setModal}
      />
    }))
  }

  return (
    <div className={styles.reader__item} onClick={showReaderModal}>
      {reader.name}
    </div>)
}



export default function ReaderList({ setModal }: TReaderList) {
  let readers: TReader[] = [];
  const { isLoading, data } = useQuery( 'readers', () => { return axios.get(`${config.api_url}/readers`) }, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <span>Загрузка...</span>;
  }

  if (data) {
    readers = data.data as TReader[];
  }

  function showReaderModal() {
    setModal(() => ({
      open: true,
      content: <ReaderCreate
        setModal={setModal}
      />
    }))
  }

  return (
    <div className={styles.reader__container}>
      <div className={styles.reader__info}>
        <span>Читатели</span>
        <span>Всего: {readers.length}</span>
      </div>
      <div className={styles.reader__list}>
        {readers.map((reader) => <ReaderItem reader={reader} setModal={setModal} key={reader.id}/>)}
      </div>
      <div className={styles.reader__buttons}>
        <Button onClick={showReaderModal}>Добавить читателя</Button>
      </div>
    </div>
  )
}
