import React from 'react';

import classes from './Navigationitems.module.css';
import Navigationitem from './Navigationitem/Navigationitem';



const navigationitems = () => (

		<div>
			<ul className={classes.Navigationitems}>
				
				<Navigationitem link="/">
					Glaucomark
				</Navigationitem>
				<Navigationitem link="/about">About</Navigationitem>
			</ul>

            
		</div>
	
	
		



        
);

export default navigationitems;
