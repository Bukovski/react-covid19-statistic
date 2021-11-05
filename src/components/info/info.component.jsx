import React from 'react';
import CountUp from 'react-countup';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

import './info.style.css';


const Info = (props) => {
	const { data: { confirmed, recovered, deaths, lastUpdate } } = props;
	
	const dateUpdate = new Date(lastUpdate).toLocaleString(i18next.t('language'), {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	
	return (
		<div className="info-container">
			<Grid container spacing={ 3 } justify="center">
				
				<Grid item component={ Card } xs={ 12 } md={ 3 } className="card infected">
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							{ i18next.t('info-title_infected') }
						</Typography>
						<Typography variant="h5" component="h2">
							<CountUp start={ 0 } end={ confirmed.value } duration={ 2.75 } separator="," />
						</Typography>
						<Typography color="textSecondary">
							{ dateUpdate }
						</Typography>
						<Typography variant="body2" component="p">
							{ i18next.t('info-number_active') }
						</Typography>
					</CardContent>
				</Grid>
				
				<Grid item component={ Card } xs={ 12 } md={ 3 } className="card recovered">
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							{ i18next.t('info-title_recovered') }
						</Typography>
						<Typography variant="h5" component="h2">
							<CountUp start={ 0 } end={ recovered.value } duration={ 2.75 } separator="," />
						</Typography>
						<Typography color="textSecondary">
							{ dateUpdate }
						</Typography>
						<Typography variant="body2" component="p">
							{ i18next.t('info-number_recoveries') }
						</Typography>
					</CardContent>
				</Grid>
				
				<Grid item component={ Card } xs={ 12 } md={ 3 } className="card deaths">
					<CardContent>
						<Typography color="textSecondary" gutterBottom>
							{ i18next.t('info-title_deaths') }
						</Typography>
						<Typography variant="h5" component="h2">
							<CountUp start={ 0 } end={ deaths.value } duration={ 2.75 } separator="," />
						</Typography>
						<Typography color="textSecondary">
							{ dateUpdate }
						</Typography>
						<Typography variant="body2" component="p">
							{ i18next.t('info-number_deaths') }
						</Typography>
					</CardContent>
				</Grid>
			
			</Grid>
		</div>
	)
};


Info.propTypes = {
	data: PropTypes.shape({
		confirmed: PropTypes.object,
		recovered: PropTypes.object,
		deaths: PropTypes.object,
		lastUpdate: PropTypes.string,
	})
};


export default Info;
