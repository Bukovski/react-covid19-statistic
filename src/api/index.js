import axios from 'axios';

const _apiBase = process.env.REACT_APP_API_ADDRESS;


export const fetchData = async (country) => {
	let changeableUrl = _apiBase;
	
	try {
		const response = await axios.get(changeableUrl);
		const { data: { confirmed, recovered, deaths, lastUpdate } } = response;
		
		return { confirmed, recovered, deaths, lastUpdate };
	} catch (error) {
		throw new Error(`Could not fetch ${ changeableUrl }`)
	}
};

const _transformDailyData = (data) => {
	const { confirmed, deaths, reportDate: date } = data;
	
	return {
		confirmed: confirmed.total,
		deaths: deaths.total,
		date
	}
};

export const fetchDailyData = async () => {
	const url = `${ _apiBase }/daily`;
	
	try {
		const response = await axios.get(url);
		
		return response.data.map(_transformDailyData);
	} catch (error) {
		throw new Error(`Could not fetch ${ url }`)
	}
};

export const fetchCountries = async () => {
	const url = `${ _apiBase }/countries`;
	
	try {
		const { data: { countries } } = await axios.get(url);
		
		return countries.map((country) => country.name);
	} catch (error) {
		throw new Error(`Could not fetch ${ url }`)
	}
};

