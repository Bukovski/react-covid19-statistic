import React from 'react';
import CountUp from 'react-countup';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

import Spinner from "../spinner/spinner.component";

import './info.style.css';


const Info = (props) => {
	const { data: { confirmed, recovered, deaths, lastUpdate } } = props;
	
	if (!confirmed) return <Spinner />;
	
	const dateUpdate = new Date(lastUpdate).toDateString();
	
	return (
		<div className="info-container">
			<Grid container spacing={ 3 } justify="center">
				
				<Grid item component={ Card } xs={ 12 } md={ 3 } className="card infected">
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							Infected
						</Typography>
						<Typography variant="h5" component="h2">
							<CountUp start={ 0 } end={ confirmed.value } duration={ 2.75 } separator="," />
						</Typography>
						<Typography color="textSecondary">
							{ dateUpdate }
						</Typography>
						<Typography variant="body2" component="p">
							Number of active cases of COVID-19.
						</Typography>
					</CardContent>
				</Grid>
				
				<Grid item component={ Card } xs={ 12 } md={ 3 } className="card recovered">
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							Recovered
						</Typography>
						<Typography variant="h5" component="h2">
							<CountUp start={ 0 } end={ recovered.value } duration={ 2.75 } separator="," />
						</Typography>
						<Typography color="textSecondary">
							{ dateUpdate }
						</Typography>
						<Typography variant="body2" component="p">
							Number of recoveries from COVID-19.
						</Typography>
					</CardContent>
				</Grid>
				
				<Grid item component={ Card } xs={ 12 } md={ 3 } className="card deaths">
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							Deaths
						</Typography>
						<Typography variant="h5" component="h2">
							<CountUp start={ 0 } end={ deaths.value } duration={ 2.75 } separator="," />
						</Typography>
						<Typography color="textSecondary">
							{ dateUpdate }
						</Typography>
						<Typography variant="body2" component="p">
							Number of deaths caused by COVID-19.
						</Typography>
					</CardContent>
				</Grid>
			
			</Grid>
		</div>
	)
};


export default Info;
