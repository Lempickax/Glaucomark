import React from 'react';

import ioLogo from '../../assets/logo1.png'
import classes from './Logo.module.css';

const logo = (props) => (
	<div className={classes.Logo}>
		<img src={ioLogo} alt="IO" />
	</div>
);

export default logo;
