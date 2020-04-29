import React from 'react';

import { fetchData } from "../../api";

import { Info, Chart, Countries } from '../../components';

import './app.style.css';


class App extends React.Component {
	state = {
		data: {},
	};
	
	async componentDidMount() {
		const data = await fetchData();
		
		this.setState({ data });
	}
	
	render() {
		const { data } = this.state;
		
		return (
			<div className="container">
				<Info data={ data }/>
				<Countries />
				<Chart />
			</div>
		)
	}
}


export default App;
