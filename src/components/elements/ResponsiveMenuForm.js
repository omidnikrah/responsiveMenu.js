import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './../../actions';


import './ResponsiveMenuForm.scss';

class ResponsiveMenuFrom extends Component {

	constructor(props){
		super(props);

		this.responsiveMenuOnSubmit = this.responsiveMenuOnSubmit.bind(this);
		this.goResult = this.goResult.bind(this);

		this.state = {
			direction: 'rtl',
			type: 'id',
			fullscreen: false,
		};
	}






	responsiveMenuOnSubmit(e) {
		e.preventDefault();
		this.props.router.push('/result');
		// console.log(this.state.direction);
		const formData = {};
		for (const field in this.refs) {
			if(this.refs[field].type == 'radio'){
				formData[field] = this.state[field];
			}else{
				formData[field] = this.refs[field].value;
			}
		//   console.log(this.refs);
		}
		console.log(formData);
		this.props.action.updateResponsiveMenuForm(formData);
	}

	goResult() {
		// history.push('/result')
	}
	render() {
		let classnameInput;
		return (
			<div>
				<form id="responsiveMenu--form" onSubmit={this.responsiveMenuOnSubmit}>
					<input id="responsiveMenu--form-input" name="className" type="text" placeholder="Your menu class or id"
					ref="className" required/>

					<div id="responsiveMenu--form_options" className="grid grid--gutters grid--1of2 grid--center">
						<div className="cell">
							<span className="responsiveMenu--form-sectionTitle">Options:</span>
							<div className="option">
								<label htmlFor="backgroundColorInput">Direction:</label>
								<label className="radio-button">
									<input type="radio" name="direction" ref="direction" value="rtl" defaultChecked onChange={ () => this.setState({direction: 'rtl'}) }/>
									<span className="custom-radio"></span>
									rtl
								</label>
								<label className="radio-button">
									<input type="radio" name="direction" ref="direction" value="ltr" onChange={ () => this.setState({direction: 'ltr'}) }/>
									<span className="custom-radio"></span>
									ltr
								</label>
							</div>
							<div className="option">
								<label htmlFor="backgroundColorInput">You’r menu type is:</label>
								<label className="radio-button">
									<input type="radio" name="type" ref="type" value="class" onChange={ () => this.setState({type: 'class'}) }/>
									<span className="custom-radio"></span>
									class
								</label>
								<label className="radio-button">
									<input type="radio" name="type" ref="type" value="id" defaultChecked  onChange={ () => this.setState({type: 'id'}) }/>
									<span className="custom-radio"></span>
									id
								</label>
							</div>
							<div className="option">
								<label htmlFor="backgroundColorInput">Fullscreen:</label>
								<label className="radio-button">
									<input type="radio" name="fullscreen" ref="fullscreen" value="true" onChange={ () => this.setState({fullscreen: true}) }/>
									<span className="custom-radio"></span>
									true
								</label>
								<label className="radio-button">
									<input type="radio" name="fullscreen" ref="fullscreen" value="false" defaultChecked onChange={ () => this.setState({fullscreen: false})} />
									<span className="custom-radio"></span>
									false
								</label>
							</div>
							<div className="option">
								<label htmlFor="backgroundColorInput">Menu background color:</label>
								<div id="backgroundColorInput-cover" data-type="color">
									<input type="text" id="backgroundColorInput" className="toUppercase" maxLength="6" name="backgroundColor" ref="backgroundColor" data-type="color"/>
								</div>
							</div>
							<div className="option">
								<label htmlFor="menuSpeedInput">Speed:</label>
								<div id="backgroundColorInput-cover" data-type="speed">
									<input type="number" id="menuSpeedInput" name="speed" ref="speed" data-type="speed"   />
								</div>
							</div>
							<div className="centerAlign">
								<input type="submit" value="Generate" id="responsiveMenu--form-submit"/>
							</div>
						</div>
					</div>

				</form>
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
	...state
});

const mapDispatchToProps = (dispatch) => ({
	action: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveMenuFrom);