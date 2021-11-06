import React from 'react';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { NativeSelect, FormControl, FormHelperText } from '@material-ui/core';

import './settings.style.css';


function Settings ({ children }) {
	return (
		<div className="settings-container">
			{ children }
		</div>
	);
};

Settings.Language = ({ language, handleLanguageChange }) => (
	<FormControl className="formControl settings-language">
		
		<NativeSelect data-testid="test-language" value={ language } onChange={ handleLanguageChange }>
			<option value="ru">RU</option>
			<option value="en">EN</option>
		</NativeSelect>
		
		<FormHelperText className="settings-text">{ i18next.t('settings-language') }</FormHelperText>
	</FormControl>
)

Settings.Theme = ({ theme, handleThemeChange }) => (
	<FormControl className="formControl settings-language">
		<NativeSelect value={ theme } onChange={ handleThemeChange }>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</NativeSelect>
		
		<FormHelperText className="settings-text">{ i18next.t('settings-theme') }</FormHelperText>
	</FormControl>
)


Settings.propTypes = {
	children: PropTypes.node,
};
Settings.prototype.Theme = {
	theme: PropTypes.string,
	handleThemeChange: PropTypes.func.isRequired
}
Settings.prototype.Language = {
	language: PropTypes.string,
	handleLanguageChange: PropTypes.func.isRequired,
}

export default Settings;