import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

import IsLoading from "../is-loading/is-loading.component";

import styles from './info.style.css';


const Info = (props) => {
	const { data: { confirmed, recovered, deaths, lastUpdate } } = props;
	
	
	console.log(props.data)
	
	return (
		<IsLoading isLoading={ !confirmed }>
			<div className={ styles.container }>
				<Grid container spacing={ 3 } justify="center">
					
					<Grid item component={ Card }>
						<CardContent>
							<Typography color="textSecondary" gutterBottom>
								Infected
							</Typography>
							<Typography variant="h5" component="h2">
								{ confirmed?.value }
							</Typography>
							<Typography color="textSecondary">
								{ new Date(lastUpdate).toDateString() }
							</Typography>
							<Typography variant="body2" component="p">
								Number of active cases of COVID-19.
							</Typography>
						</CardContent>
					</Grid>
					
					<Grid item component={ Card }>
						<CardContent>
							<Typography color="textSecondary" gutterBottom>
								Recovered
							</Typography>
							<Typography variant="h5" component="h2">
								{ recovered?.value }
							</Typography>
							<Typography color="textSecondary">
								{ new Date(lastUpdate).toDateString() }
							</Typography>
							<Typography variant="body2" component="p">
								Number of recoveries from COVID-19.
							</Typography>
						</CardContent>
					</Grid>
					
					<Grid item component={ Card }>
						<CardContent>
							<Typography color="textSecondary" gutterBottom>
								Deaths
							</Typography>
							<Typography variant="h5" component="h2">
								{ deaths?.value }
							</Typography>
							<Typography color="textSecondary">
								{ new Date(lastUpdate).toDateString() }
							</Typography>
							<Typography variant="body2" component="p">
								Number of deaths caused by COVID-19.
							</Typography>
						</CardContent>
					</Grid>
					
				</Grid>
			</div>
		</IsLoading>
	)
};


export default Info;
