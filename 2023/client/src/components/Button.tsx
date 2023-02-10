import React, { ReactNode } from "react";
import "../css/Button.css";

const Lobby = ({ children }: { children: ReactNode }) => {
	return (
		<div id="btn">
			<span className="noselect">{children}</span>
			<div id="circle"></div>
		</div>
	);
};

export default Lobby;
