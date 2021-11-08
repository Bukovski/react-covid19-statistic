import axios from 'axios';

export const _apiBase = process.env.REACT_APP_API_ADDRESS || "https://covid19.mathdro.id/api";


export const fetchStatisticData = async (country = "") => {
	let changeableUrl = _apiBase;
	
	if (country) {
		changeableUrl = `${ _apiBase }/countries/${ country }`;
	}
	
	try {
		const response = await axios.get(changeableUrl);
		const { data: { confirmed, recovered, deaths, lastUpdate } } = response;

		return { confirmed, recovered, deaths, lastUpdate };
	} catch (error) {
		throw new Error(`Could not fetch ${ changeableUrl }`)
	}
};

export const _transformDailyData = (data) => {
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
		const response = await axios.get(url);
		
		if (response.data && response.data.countries) {
			return response.data.countries.map((country) => country.name);
		}
		
		return [];
	} catch (error) {
		throw new Error(`Could not fetch ${ url }`)
	}
};

