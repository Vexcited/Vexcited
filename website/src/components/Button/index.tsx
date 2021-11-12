import styles from "./styles.module.scss";
import React from "react";

type ButtonProps = {
  outlined?: boolean;
  children: React.ReactNode
}

export default function Button({
  outlined = false,
  children
}: ButtonProps): JSX.Element {
	return (
    <button
      className={`${styles.button} ${outlined ? styles.outlined : ""}`}
    >
      {children}
    </button>
	);
}
