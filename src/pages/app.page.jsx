import React from 'react';

import logo from "../assets/logo.png";
import { InfoContainer, SettingsContainer } from "../containers";


const App = () => {
	return (
		<div className="container">
			<SettingsContainer/>
			
			<img className="image" src={ logo } alt="COVID-19" />
			
			<InfoContainer/>
		</div>
	)
};


export default App;
