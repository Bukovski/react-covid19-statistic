import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from "../../api";

import './chart.style.css';
import i18next from "i18next";


const Chart = (props) => {
	const { data: { confirmed, recovered, deaths }, country } = props;
	const [ dailyData, setDailyData ] = useState({});
	
	useEffect(() => {
		const fetchMyAPI = async () => {
			const initialDailyData = await fetchDailyData();
			
			setDailyData(initialDailyData);
		};
		
		fetchMyAPI();
	}, []);
	
	const lineChart = (
		dailyData[ 0 ]
			? (<Line
				data={{
					labels: dailyData.map(({ date }) => date),
					datasets: [
						{
							data: dailyData.map((data) => data.confirmed),
							label: i18next.t('info-title_infected'),
							borderColor: '#3333ff',
							fill: true,
						},
						{
							data: dailyData.map((data) => data.deaths),
							label: i18next.t('info-title_deaths'),
							borderColor: 'red',
							backgroundColor: 'rgba(255,0,0,0.5)',
							fill: true,
						}
					]
				}}
			/>)
			: null
	);
	
	const barChart = (
		confirmed
			? (<Bar
				data={{
					labels: [ i18next.t('info-title_infected'), i18next.t('info-title_recovered'), i18next.t('info-title_deaths') ],
					datasets: [
						{
							label: 'People',
							backgroundColor: [ 'rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)' ],
							data: [ confirmed.value, recovered.value, deaths.value ],
						}
					],
				}}
				options={{
					legend: { display: false },
					title: { display: true, text: i18next.t('chart-state', { country }), },
				}}
			/>)
			: null
	);
	
	return (
		<div className="chart-container">
			{ country ? barChart : lineChart }
		</div>
	);
};


export default Chart;
