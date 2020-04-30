import React, { useState, useEffect } from 'react';

import { fetchCountries } from "../../api";

import './countries.style.css';


const Countries = () => {
	const [ countries, setCountries ] = useState([]);
	
	useEffect(() => {
		const fetchAPI = async () => {
			setCountries(await fetchCountries());
		};
		
		fetchAPI();
	}, []);
	
	console.log(countries)
	
	return (
		<h1>Countries</h1>
	)
};


export default Countries;