import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

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
		<FormControl className="formControl">
			<NativeSelect defaultValue="">
				<option value="">Global</option>
				{ countries.map((country, i) => <option
					key={ i }
					value={ country }>
					{ country }
				</option>)
				}
			</NativeSelect>
		</FormControl>
	);
};


export default Countries;