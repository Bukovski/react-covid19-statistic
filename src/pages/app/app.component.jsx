import React from 'react';

import { fetchData } from "../../api";

import { Info, Chart, Countries } from '../../components';

import './app.style.css';


class App extends React.Component {
	state = {
		data: {},
		country: ''
	};
	
	async componentDidMount() {
		const data = await fetchData();
		
		this.setState({ data });
	}
	
	handleCountryChange = async (event) => {
		const country = event.target.value;
		const data = await fetchData(country);

		this.setState({
			data,
			country
		});
	};
	
	render() {
		const { data } = this.state;
		
		return (
			<div className="container">
				<Info data={ data }/>
				<Countries handleCountryChange={ this.handleCountryChange }/>
				<Chart />
			</div>
		)
	}
}


export default App;
