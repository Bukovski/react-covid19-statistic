import React from 'react';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { NativeSelect, FormControl, FormHelperText } from '@material-ui/core';

import './settings.style.css';


const Settings = ({ language, theme, handleLanguageChange, handleThemeChange }) => {
	return (
		<div className="settings-container">
			<FormControl className="formControl settings-language">
				
				<NativeSelect value={ language } onChange={ handleLanguageChange }>
					<option value="ru">RU</option>
					<option value="en">EN</option>
				</NativeSelect>
				
				<FormHelperText className="settings-text">{ i18next.t('settings-language') }</FormHelperText>
			</FormControl>
			
			<FormControl className="formControl settings-language">
				<NativeSelect value={ theme } onChange={ handleThemeChange }>
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</NativeSelect>
				
				<FormHelperText className="settings-text">{ i18next.t('settings-theme') }</FormHelperText>
			</FormControl>
		</div>
	);
};


Settings.propTypes = {
	language: PropTypes.string,
	theme: PropTypes.string,
	handleLanguageChange: PropTypes.func.isRequired,
	handleThemeChange: PropTypes.func.isRequired
};


export default Settings;