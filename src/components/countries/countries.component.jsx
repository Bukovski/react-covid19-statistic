import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchCountries } from "../../api";

import Spinner from "../spinner/spinner.component";

import './countries.style.css';


const Countries = ({ handleCountryChange }) => {
	const [ countries, setCountries ] = useState([]);
	
	useEffect(() => {
		const fetchAPI = async () => {
			setCountries(await fetchCountries());
		};
		
		fetchAPI();
	}, []);
	
	if (!countries[ 0 ]) return <Spinner />;
	
	return (
		<FormControl className="formControl">
			<NativeSelect defaultValue="" onChange={ handleCountryChange }>
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