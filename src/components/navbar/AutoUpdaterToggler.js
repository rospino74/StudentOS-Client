import React, { Component } from 'react';

class AutoUpdaterToggler extends Component {
	constructor(props) {
        super(props);
		
		//state
        this.state = {active: window.settings.autoUpdate || false};

        //bind del metodo
        this.switchMode = this.switchMode.bind(this);
	}
	
	switchMode() {
		let next = !this.state.active;

		this.setState({
			active: next
		});
		
		//aggiorno le impostazioni
		window.settings.updateSettings('{"autoUpdate":' + next  + '}');
	}
	
	render() {
		return <button onClick={this.switchMode} className="subnav-item subnav-icon" aria-label="Toggle the auto updater" aria-checked={this.state.active} role="switch"><i className={"fas " + (this.state.active ? "fa-clock" : "fa-times-circle")}/> {this.state.active ? "Auto update" : "Manual update"}</button>
	}
}

export default AutoUpdaterToggler;