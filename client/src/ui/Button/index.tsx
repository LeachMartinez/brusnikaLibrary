import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styles from "./Button.module.scss";

export default function Button ({children, ...props}: PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={[props.className, styles.button].join(" ")}>
      {children}
    </button>
  )
}