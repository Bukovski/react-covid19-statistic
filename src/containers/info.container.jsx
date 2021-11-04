import React, { useState, useEffect, Fragment } from 'react';
import { fetchData } from "../api";
import { Info, Chart, Countries } from '../components';


const InfoContainer = () => {
	const [ data, setData ] = useState({});
	const [ country, setCountry ] = useState('');
	
	
	useEffect(() => {
		const fetchAPI = async () => {
			const dataFetch = await fetchData();
			
			setData(dataFetch);
		};
		
		fetchAPI();
	}, []);
	
	const handleCountryChange = async (event) => {
		const country = event.target.value;
		const data = await fetchData(country);
		
		setData(data);
		setCountry(country);
	};
	
	return (
		<Fragment>
			<Info data={ data }/>
			<Countries handleCountryChange={ handleCountryChange }/>
			<Chart data={ data } country={ country } />
		</Fragment>
	)
};


export default InfoContainer;
