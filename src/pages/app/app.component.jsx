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
	const [ language, setLanguage ] = useState('ru');
	const [ theme, setTheme ] = useState('light');
	
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
	
	const backgroundSwitcher = () => {
		const getCssBackgroundVar = window
			.getComputedStyle(document.documentElement)
			.getPropertyValue("--primaryBackground");
		
		document.body.style.backgroundColor = getCssBackgroundVar;
	}
	
	const themeToggle = (theme) => {
		const setThemeVar = (theme === "light") ? 'light' : 'dark';
		
		document.documentElement.setAttribute('data-theme', setThemeVar);
		
		setTheme(theme);
		
		backgroundSwitcher();
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
