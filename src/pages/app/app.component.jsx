import React, { useState, useEffect } from 'react';
import i18next from 'i18next';

import { fetchData } from "../../api";
import useLocalStorageSetting from "../../hooks/useLocalStorageSetting.container";

import { Info, Chart, Countries, Settings } from '../../components';

import logo from "../../assets/logo.png";
import './app.style.css';



const App = () => {
	const [ data, setData ] = useState({});
	const [ country, setCountry ] = useState('');
	const [ language, setLanguage ] = useState('');
	const [ theme, setTheme ] = useState('');
	
	const [ localSetting, setLocalSetting ] = useLocalStorageSetting({});
	
	
	useEffect(() => {
		const fetchAPI = async () => {
			const dataFetch = await fetchData();
			
			setData(dataFetch);
		};
		
		fetchAPI();
		
		languageToggle(localSetting.language);
		themeToggle(localSetting.theme);
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	
	const languageToggle = (language) => {
		i18next.init({
			lng: language,
			resources: require(`../../assets/language/${language}.json`)
		});
		
		setLanguage(i18next.language);
	};
	
	const themeToggle = (theme) => {
		if (theme === "light") {
			document.documentElement.setAttribute('data-theme', 'light');
		} else {
			document.documentElement.setAttribute('data-theme', 'dark');
		}
		
		setTheme(theme);
	};
	
	const handleCountryChange = async (event) => {
		const country = event.target.value;
		const data = await fetchData(country);
		
		setData(data);
		setCountry(country);
	};
	
	const handleLanguageChange = (event) => {
		const language = event.target.value;
		
		setLocalSetting({ language: language });
		
		languageToggle(language);
	};
	
	const handleThemeChange = (event) => {
		const theme = event.target.value;
		
		setLocalSetting({ theme: theme });
		
		themeToggle(theme);
	};
	
	return (
		<div className="container">
			<Settings
				language={ language }
				theme={ theme }
				handleLanguageChange={ handleLanguageChange }
				handleThemeChange={ handleThemeChange }
			/>
			<img className="image" src={ logo } alt="COVID-19" />
			
			<Info data={ data }/>
			<Countries handleCountryChange={ handleCountryChange }/>
			<Chart data={ data } country={ country } />
		</div>
	)
};


export default App;
