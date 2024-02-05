import ReaderCreate from "./create";
import { useQuery } from "react-query";
import axios from "axios";
import { config } from "../../config";
import { TReader } from "./types";
import styles from "./Reader.module.scss";

type TReaderList = {
  setModal: React.Dispatch<React.SetStateAction<{
    open: boolean;
    content: JSX.Element | null;
  }>>
}
export default function ReaderList({ setModal }: TReaderList) {
  const { isLoading, data } = useQuery( 'readers', () => { return axios.get(`${config.api_url}/readers`) }, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <span>Загрузка...</span>;
  }

  const readers = data?.data as TReader[];

  function showReaderModal() {
    setModal(modalParams => ({
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
        {readers.map((reader) => <div className={styles.reader__item} key={reader.id}>{reader.name}</div>)}
      </div>
      <div className={styles.reader__buttons}>
        <button onClick={showReaderModal}>Добавить читателя</button>
      </div>
    </div>
  )
}