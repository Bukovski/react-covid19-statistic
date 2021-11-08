import React, { useState, useEffect } from 'react';
import i18next from 'i18next';
import { Settings } from "../components";
import useLocalStorageSetting from "../hooks/useLocalStorageSetting.container";


const SettingsContainer = ({ onToggleUpdate }) => {
	const [ language, setLanguage ] = useState('ru');
	const [ theme, setTheme ] = useState('light');
	const [ localSetting, setLocalSetting ] = useLocalStorageSetting({});
	
	useEffect(() => {
			languageToggle(localSetting.language);
			themeToggle(localSetting.theme);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
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
		document.documentElement.setAttribute('data-theme', theme);
		
		setTheme(theme);
		
		backgroundSwitcher();
	};
	
	
	const handleLanguageChange = (event) => {
		const language = event.target.value;
		
		setLocalSetting({ language: language });
		
		languageToggle(language);
		
		onToggleUpdate();
	};
	
	const handleThemeChange = (event) => {
		const theme = event.target.value;
		
		setLocalSetting({ theme: theme });

		themeToggle(theme);
	};
	

	return (<Settings>
		<Settings.Language
			language={ language }
			handleLanguageChange={ handleLanguageChange }
		/>
		<Settings.Theme
			theme={ theme }
			handleThemeChange={ handleThemeChange }
		/>
	</Settings>)
}


export default SettingsContainer;
