import React, { Component } from 'react';
import Header from './../components/elements/Header';


export default class Main extends Component {
	render() {
		return(
			<div>
				<Header/>
				<main id="main-content">
					{this.props.children}				
				</main>
			</div>
		);
	}
}