import styles from "./styles.module.scss";
import Logo from "../../assets/logo.svg";
import React from "react";

export default function Header(): JSX.Element {
	return (
		<header>
			<img className={styles.imageLogo} src={Logo} alt="Vexcited" />
		</header>
	);
}