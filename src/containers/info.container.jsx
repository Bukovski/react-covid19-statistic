import React, { useState, useEffect, Fragment } from 'react';
import { fetchStatisticData } from "../api";
import { Info, Chart, Countries, Spinner } from '../components';
import useLocalStorageSetting from "../hooks/useLocalStorageSetting.container";


const InfoContainer = () => {
	const [ localSetting, setLocalSetting ] = useLocalStorageSetting({});
	const [ data, setData ] = useState({});
	const [ country, setCountry ] = useState(localSetting.country || "");

	
	useEffect(() => {
		const fetchAPI = async (countryName) => {
			const dataFetch = await fetchStatisticData(countryName);

			setData(dataFetch);
		};
		
		fetchAPI(country);
	}, [ country ]);
	
	const handleCountryChange = (event) => {
		const country = event.target.value;
		
		setLocalSetting({ country: country })
		setCountry(country);
	};
	
	if (data && !data.confirmed) return <Spinner />;
	
	return (
		<Fragment>
			<Info data={ data }/>
			<Countries countryValue={ country } handleCountryChange={ handleCountryChange }/>
			<Chart data={ data } country={ country } />
		</Fragment>
	)
};


export default InfoContainer;
