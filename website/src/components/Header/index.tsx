import styles from "./styles.module.scss";
import Logo from "../../assets/logo.svg";
import React from "react";

export default function Header(): JSX.Element {
	return (
		<header>
			<a className={styles.imageLogoLink} href="/">
				<img className={styles.imageLogo} src={Logo} alt="Vexcited" />
			</a>
		</header>
	);
}
