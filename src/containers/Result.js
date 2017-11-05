import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './../actions';
import { store } from '../store/createStore';
import FileSaver from 'file-saver';

require('codemirror/mode/css/css');
require('codemirror/mode/javascript/javascript');

class Result extends Component {

	
	componentWillMount () {
		if(!this.props.data){
			window.location = '/';
		}
	}


	render() {
		const options = this.props.data;
		const codeMirrorCssOptions = {
			mode: 'css',
			lineNumbers: false,
			readOnly: true			
		};
		const codeMirrorJsOptions = {
			mode: 'javascript',
			lineNumbers: false,
			lineWrapping: true,
			readOnly: true			
		};
		const menuName = `${(options['type'] == 'id')? `#`: `.`}${options['className']}`;
		const direction = `${(options['direction'] == 'rtl')? 'right':'left'}`;
		const CSS_CODES = `

#responsive-menu__js {
	width: 32px;
	height: 16px;
	position: relative;
	display: block;
}
#responsive-menu__js .line {
	display: block;
	background: #ecf0f1;
	width: 32px;
	height: 2.5px;
	position: absolute;
	left: 0;
	border-radius: 1.25px;
	transition: all 0.4s;
	-webkit-transition: all 0.4s;
	-moz-transition: all 0.4s;
}
#responsive-menu__js .line.line-1 {
	top: 0;
}
#responsive-menu__js .line.line-2 {
	top: 50%;
}
#responsive-menu__js .line.line-3 {
	top: 100%;
}
#responsive-menu__js:hover .line-1, #responsive-menu__js:focus .line-1 {
	transform: translateY(-1.25px);
	-webkit-transform: translateY(-1.25px);
	-moz-transform: translateY(-1.25px);
}
#responsive-menu__js:hover .line-3, #responsive-menu__js:focus .line-3 {
	transform: translateY(1.25px);
	-webkit-transform: translateY(1.25px);
	-moz-transform: translateY(1.25px);
}
#responsive-menu__js.active .line-1 {
	transform: translateY(8px) translateX(0) rotate(45deg);
	-webkit-transform: translateY(8px) translateX(0) rotate(45deg);
	-moz-transform: translateY(8px) translateX(0) rotate(45deg);
}
#responsive-menu__js.active .line-2 {
	opacity: 0;
}
#responsive-menu__js.active .line-3 {
	transform: translateY(-8px) translateX(0) rotate(-45deg);
	-webkit-transform: translateY(-8px) translateX(0) rotate(-45deg);
	-moz-transform: translateY(-8px) translateX(0) rotate(-45deg);
}

#responsive-menu__js {
	text-decoration: none;
	color: #95a5a6;
	margin: 20px !important;
	display: inline-block;
	float: ${(direction == 'right'? 'left': 'right')}
}
#responsive-menu__js:hover, #responsive-menu__js:focus {
	color: #ecf0f1;
}
		  
		  
@media (min-width: 0px) and (max-width: 572px) {
	${menuName}{
		direction: ${options['direction']};
		left: right!important;
		margin: 0!important;
		list-style: none!important;
		position: absolute!important;
		${direction}: -400px;
		top: 0!important;
		bottom: 0!important;
		background-color: #${(options['backgroundColor'])?(options['backgroundColor']):'FFFFFF'} !important;
		z-index: 99!important;
		width: 70%!important;
		padding-top:30px !important;
	}
	${menuName} li {
		float: none!important;
		display: inline-block!important;
		width: 100%!important;
		text-align: center!important;
	}
	${menuName} li a{
		padding: 15px 0 !important;
	}
	#responsive-menu__js {
		display: block;
	}
	${menuName} li a {
		width: 100%!important;
	}
}
		`;	
		const JS_CODES = `
$(document).ready(function(){
	let responsiveHamburgerMenu = '<a id="responsive-menu__js" href="#">'
									+'<span class="line line-1"></span>'
									+'<span class="line line-2"></span>'
									+'<span class="line line-3"></span>'
								  +'</a>';
	$("${menuName}").after(responsiveHamburgerMenu);
	let responsiveMenu = 0;
	$('#responsive-menu__js').click(function(e) {
	   $(this).toggleClass('active');
	   e.preventDefault();
	   e.stopPropagation();
	   if (!responsiveMenu) {
		   $('${menuName}').animate({${direction}:0}, ${options['speed']});
		   responsiveMenu=1;
	   }else {
		   $('${menuName}').animate({${direction}:'-70%'}, ${options['speed']});
		   responsiveMenu=0;
	   }
	   return false;
	});

	
	$(window).resize(function(event) {
		if (responsiveMenu) {
			$('${menuName}').animate({${direction}:'-70%'}, ${options['speed']});
			responsiveMenu=0;
		}
	});
	$(document).click(function(){
		if (responsiveMenu) {
			$('${menuName}').animate({${direction}:'-70%'}, ${options['speed']});
			responsiveMenu=0;
		}
	});



})
				`;	
				const export_css= (e)=>{
					e.preventDefault();
					let blob = new Blob([CSS_CODES], {type: "text/plain;charset=utf-8"});
					FileSaver.saveAs(blob, "responsiveJS.css");
				}
			const export_js = (e)=>{
					e.preventDefault();
					let blob = new Blob([JS_CODES], {type: "text/plain;charset=utf-8"});
					FileSaver.saveAs(blob, "responsiveJS.js");
				}
			
		return (
			<div>
				<Helmet>
					<link rel="stylesheet" href="src/styles/codemirror.css" />
				</Helmet>
				<div id="responsiveMenu--codemirror_css" className="grid grid--gutters grid--1of2 grid--center">
					<div className="cell">
						<CodeMirror options={codeMirrorCssOptions} value={CSS_CODES} />
					</div>
					<a href="#" onClick={e => export_css(e)} className="cell btns-submit">export CSS</a>
				</div>
				<div id="responsiveMenu--codemirror_js" className="grid grid--gutters grid--1of2 grid--center">
					<div className="cell">
						<CodeMirror options={codeMirrorJsOptions} value={JS_CODES} />
					</div>
					<a href="#" onClick={e => export_js(e)} id="export_js" className="cell btns-submit">export JS</a>					
				</div>
			</div>
		);
	}

}


const mapStateToProps = (state)=> ({
	data: state.main.data
})
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(Actions, dispatch)
  });


export default connect(mapStateToProps, mapDispatchToProps)(Result);