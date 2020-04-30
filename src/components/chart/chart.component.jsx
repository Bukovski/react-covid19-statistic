import React, { useState, useEffect } from 'react';

import { fetchDailyData } from "../../api";

import './chart.style.css';


const Chart = () => {
	const [ dailyData, setDailyData ] = useState({});
	
	useEffect(() => {
		const fetchMyAPI = async () => {
			const initialDailyData = await fetchDailyData();
			
			setDailyData(initialDailyData);
		};
		
		fetchMyAPI();
	}, []);
	
	console.log(dailyData)
	
	return (
		<h1>Chart</h1>
	)
};


export default Chart;

// 46.30