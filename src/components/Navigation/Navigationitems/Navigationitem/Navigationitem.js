import React from 'react';
import {  Link } from 'react-router-dom';
import classes from './Navigationitem.module.css';
const navigationitem = (props) => (

		<nav>
			<ul>
				<li className={classes.Navigationitem}>
					<Link
						to={props.link}
						className={props.active ? classes.active : null}
					>
						{props.children}
					</Link>
				</li>
			</ul>
		</nav>
	
);

export default navigationitem;
