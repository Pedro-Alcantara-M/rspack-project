import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Button } from "./button";

function App() {
	return (
		<div className="App">
			<div>
				<a href="https://reactjs.org" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Rspack + React + TypeScript</h1>
			<div className="card">
				<Button />
			</div>
		</div>
	);
}

export default App;
