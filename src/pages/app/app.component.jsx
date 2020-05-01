import React from 'react';

import { fetchData } from "../../api";

import { Info, Chart, Countries } from '../../components';

import logo from "../../assets/logo.png";
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
		const { data, country } = this.state;
		
		return (
			<div className="container">
				<img className="image" src={ logo } alt="COVID-19" />
				
				<Info data={ data }/>
				<Countries handleCountryChange={ this.handleCountryChange }/>
				<Chart data={ data } country={ country } />
			</div>
		)
	}
}


export default App;
