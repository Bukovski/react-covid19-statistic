import React from 'react';

import IsLoading from "../is-loading/is-loading.component";

import './info.style.css';


const Info = (props) => {
	const { data: { confirmed, recovered, deaths, lastUpdate } } = props;
	
	
	console.log(props.data)
	
	return (
		<IsLoading isLoading={ !confirmed }>
			<h1>Info</h1>
		</IsLoading>
	)
};


export default Info;
