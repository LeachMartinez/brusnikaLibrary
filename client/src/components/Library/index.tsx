import { createPortal } from "react-dom"
import { useState } from "react"
import { BookList } from "../Book/list"
import ReaderList from "../Reader/list"
import styles from "./Library.module.scss";

export const initialModalState : {
  open: boolean,
  content: JSX.Element | null
} = {
  open: false,
  content: null,
}

export default function Library() {
  const [modal, setModal] = useState(initialModalState); 

  return (
    <div className={styles.library__container}>
      <div className={styles.library}>
        <h2 className={styles.library__title}>Библиотека</h2>
        <div className={styles.library__elements}>
          <BookList setModal={setModal}/>
          <ReaderList setModal={setModal}/>
        </div>
        {modal.open && createPortal(modal.content, document.body)}
      </div>
    </div>
  )
}