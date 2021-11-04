import React, { useState, useEffect } from 'react';
import i18next from 'i18next';
import { Settings } from "../components";
import useLocalStorageSetting from "../hooks/useLocalStorageSetting.container";


const SettingsContainer = () => {
	const [ language, setLanguage ] = useState('ru');
	const [ theme, setTheme ] = useState('light');
	const [ localSetting, setLocalSetting ] = useLocalStorageSetting({});
	
	useEffect(() => {
			languageToggle(localSetting.language);
			themeToggle(localSetting.theme);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ localSetting ]);
	
	const languageToggle = (language) => {
		i18next.init({
			lng: language,
			resources: require(`../assets/language/${language}.json`)
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
	
	return (<Settings
		language={ language }
		theme={ theme }
		handleLanguageChange={ handleLanguageChange }
		handleThemeChange={ handleThemeChange }
	/>)
}


export default SettingsContainer;
