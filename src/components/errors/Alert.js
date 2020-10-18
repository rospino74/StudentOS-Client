import React, {Component} from 'react';
import "../../style/error/alert.css";

class Alert extends Component {
	render() {
		return (
			<div className="alert">
                <i className={this.props.icon + " icon"}></i>
                <p className="decription">{this.props.description}</p>
            </div>
		)
	}
}

export default Alert;