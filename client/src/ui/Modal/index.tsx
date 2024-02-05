import { PropsWithChildren } from "react";
import styles from "./Modal.module.scss"

type TModalProps = {
  onClose: () => void;
} & PropsWithChildren
export default function Modal(props: TModalProps) {
  return (
    <>
      <div className={styles.modal}>{props.children}</div>
      <div className={styles.backdrop} onClick={props.onClose}></div>
    </>
  )
}