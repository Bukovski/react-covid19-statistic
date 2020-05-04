import { useState, useEffect } from 'react';

import useLocalStorage from "./useLocalStorage";


const _localSettingName = process.env.REACT_APP_LOCAL_STORAGE_NAME;
const _defaultData = { language: 'ru', theme: 'light' };


const useLocalStorageSetting = (objValue, setObjValue = {}) => {
	const [ value, setValue ] = useLocalStorage(_localSettingName);
	const [ localSetting, setLocalSetting ] = useState(setObjValue);
	
	let dataSetting;
	
	try {
		dataSetting = JSON.parse(value)
	} catch (e) {
		dataSetting = _defaultData;
	}
	
	const setSettings = () => {
		const key = Object.keys(localSetting);
		
		if ((key.length && dataSetting.hasOwnProperty(key)) || !value.length ) {
			dataSetting = { ...dataSetting, ...localSetting };
			
			const jsonData = JSON.stringify(dataSetting);
			
			setValue(jsonData);
		}
	};
	
	useEffect(setSettings, [ localSetting ]);
	
	return [ dataSetting, setLocalSetting ]
};


export default useLocalStorageSetting;
