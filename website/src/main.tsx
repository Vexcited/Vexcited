import ReactDOM from "react-dom";
import React from "react";

// Components
import Button from "./components/Button";

// Global CSS
import "./assets/globals.scss";

ReactDOM.render(
	<React.StrictMode>

    <div>
      <Button>PROJETS</Button>
      <Button outlined>CV</Button>
    </div>
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
