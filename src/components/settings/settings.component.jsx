import React from 'react';
import i18next from 'i18next';
import { NativeSelect, FormControl, FormHelperText, Typography } from '@material-ui/core';

import './settings.style.css';


const Settings = ({ language, handleLanguageChange }) => {
	
	return (
		<FormControl className="formControl settings-language">
			
			<NativeSelect value={ language } onChange={ handleLanguageChange }>
				<option value="ru">RU</option>
				<option value="en">EN</option>
			</NativeSelect>
			
			<FormHelperText>{ i18next.t('settings-language') }</FormHelperText>
		</FormControl>
	);
};


export default Settings;