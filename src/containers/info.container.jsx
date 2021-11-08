import React, { useState, useEffect, Fragment } from 'react';
import { fetchStatisticData } from "../api";
import { Info, Chart, Countries, Spinner } from '../components';


const InfoContainer = () => {
	const [ data, setData ] = useState({});
	const [ country, setCountry ] = useState('');
	
	useEffect(() => {
		const fetchAPI = async () => {
			const dataFetch = await fetchStatisticData();

			setData(dataFetch);
		};
		
		fetchAPI();
	}, []);
	
	const handleCountryChange = async (event) => {
		const country = event.target.value;
		const data = await fetchStatisticData(country);
		
		setData(data);
		setCountry(country);
	};
	
	if (data && !data.confirmed) return <Spinner />;
	
	return (
		<Fragment>
			<Info data={ data }/>
			<Countries handleCountryChange={ handleCountryChange }/>
			<Chart data={ data } country={ country } />
		</Fragment>
	)
};


export default InfoContainer;
