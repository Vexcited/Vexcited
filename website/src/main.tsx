import ReactDOM from "react-dom";
import React from "react";

// Components
import Header from "./components/Header";

// Global CSS
import "./assets/globals.scss";

ReactDOM.render(
	<React.StrictMode>
		<Header />
		<p>Le site est en cours de reconstruction ! Merci de patienter un peu avant sa réouverture.</p>
		<p>En attendant vous pouvez faire un tour sur mon {" "}
			<a href="https://github.com/Vexcited" target="_blank" rel="noreferrer">
				GitHub
			</a>
			{" "} et sur mon {" "}
			<a href="https://instagram.com/vexcitedoff" target="_blank" rel="noreferrer">
				Instagram
			</a>
			{" "} !
		</p>
	</React.StrictMode>,
	document.getElementById("root")
);