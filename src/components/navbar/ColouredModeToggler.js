import React, { Component } from 'react';

class ColouredModeToggler extends Component {
	constructor(props) {
        super(props);
		
		//lista di icone e classi
		this.classes = [undefined, "dark", "blue", "red", "high-contrast-white", "high-contrast-dark"];	
		this.icons = ["fa-sun", "fa-moon", "fa-cloud", "fa-fire-alt", "fa-glasses", "fa-glasses"];
		
		//state
        this.state = {mode: window.settings.theme || 0};
		
		//aggiorno il tema
		document.documentElement.classList.remove(...this.classes);
		document.documentElement.classList.add(this.classes[this.state.mode]);

        //bind del metodo
        this.switchMode = this.switchMode.bind(this);
	}
	
	switchMode() {
		let next = (this.state.mode + 1 === this.classes.length) ? 0 : this.state.mode + 1

		this.setState(state => ({
			mode: next
		}));

		document.documentElement.classList.remove(...this.classes);
		document.documentElement.classList.add(this.classes[next]);
		
		//aggiorno le impostazioni
		window.settings.updateSettings('{"theme":' + next  + '}');
	}
	
	render() {
		return <button onClick={this.switchMode} className="subnav-item subnav-icon" aria-label="Change page style"><i className={"fas " + this.icons[this.state.mode]}/> Change theme</button>
	}
}

export default ColouredModeToggler;