import React from 'react';

import { Info, Chart, Countries } from '../../components';

import './app.style.css';


class App extends React.Component {
	render() {
		return (
			<div>
				<Info />
				<Chart />
				<Countries />
			</div>
		)
	}
}


export default App;
