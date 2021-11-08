import React, { useState } from 'react';

import logo from "../assets/logo.png";
import { InfoContainer, SettingsContainer } from "../containers";


const App = () => {
	const [ updatePage, useUpdatePage ] = useState(false)
	
	const handleToggleUpdate = () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useUpdatePage(!updatePage);
	}
	
	return (
		<div className="container">
			<SettingsContainer onToggleUpdate={ handleToggleUpdate }/>
			
			<img className="image" src={ logo } alt="COVID-19" />
			
			<InfoContainer/>
		</div>
	)
};


export default App;
