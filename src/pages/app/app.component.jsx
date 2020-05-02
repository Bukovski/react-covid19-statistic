import React from 'react';
import i18next from 'i18next';

import { fetchData } from "../../api";

import { Info, Chart, Countries, Settings } from '../../components';

import logo from "../../assets/logo.png";
import './app.style.css';



class App extends React.Component {
	state = {
		data: {},
		country: '',
		language: 'en'
	};
	
	async componentDidMount() {
		const data = await fetchData();
		
		this.setState({ data });
		
		this.setLanguage('ru');
	}
	
	setLanguage(language) {
		i18next.init({
			lng: language,
			resources: require(`../../assets/language/${language}.json`)
		});
		
		this.setState({ language: i18next.language });
	}
	
	handleCountryChange = async (event) => {
		const country = event.target.value;
		const data = await fetchData(country);

		this.setState({
			data,
			country
		});
	};
	
	handleLanguageChange = (event) => {
		const language = event.target.value;
		
		this.setLanguage(language);
	};
	
	render() {
		const { data, country, language } = this.state;
		
		return (
			<div className="container">
				<Settings language={ language } handleLanguageChange={ this.handleLanguageChange }/>
				<img className="image" src={ logo } alt="COVID-19" />
				
				<Info data={ data }/>
				<Countries handleCountryChange={ this.handleCountryChange }/>
				<Chart data={ data } country={ country } />
			</div>
		)
	}
}


export default App;
