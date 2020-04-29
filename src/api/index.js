import axios from 'axios';

const _url = process.env.REACT_APP_API_ADDRESS;


export const fetchData = async (country) => {
	let changeableUrl = _url;
	
	try {
		const response = await axios.get(changeableUrl);
		const { data: { confirmed, recovered, deaths, lastUpdate } } = response;
		
		return { confirmed, recovered, deaths, lastUpdate };
	} catch (error) {
		throw new Error(`Could not fetch ${ changeableUrl }`)
	}
};

