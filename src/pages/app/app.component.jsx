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
		language: '',
		theme: 'light'
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
	
	handleThemeChange = (event) => {
		const theme = event.target.value;
		
		if (theme === "light") {
			document.documentElement.setAttribute('data-theme', 'light');
		} else {
			document.documentElement.setAttribute('data-theme', 'dark');
		}
		
		this.setState({ theme });
	};
	
	render() {
		const { data, country, language, theme } = this.state;
		
		return (
			<div className="container">
				<Settings
					language={ language }
					theme={ theme }
					handleLanguageChange={ this.handleLanguageChange }
					handleThemeChange={ this.handleThemeChange }
				/>
				<img className="image" src={ logo } alt="COVID-19" />
				
				<Info data={ data }/>
				<Countries handleCountryChange={ this.handleCountryChange }/>
				<Chart data={ data } country={ country } />
			</div>
		)
	}
}


export default App;
