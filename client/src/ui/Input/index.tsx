import styles from "./Input.module.scss";

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className={styles.input}/>
  )
}