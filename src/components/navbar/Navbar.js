import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../../style/navbar/navbar.css';
import { ReactComponent as Logo } from '../../resources/icon.svg';
import ColouredModeToggler from "./ColouredModeToggler.js";
import AutoUpdaterToggler from './AutoUpdaterToggler';

class Navbar extends Component {
	constructor() {
		super();

		this.state = {subnavOpen: false};

		this.toggleSubnav = this.toggleSubnav.bind(this);
		this.bodyClick = this.bodyClick.bind(this);
	}

	componentDidMount() {
        document.body.addEventListener("click", this.bodyClick);
    }

    componentWillUnmount() {
        document.body.removeEventListener("click", this.bodyClick);
    }

	toggleSubnav() {
		this.setState(state => ({subnavOpen: !state.subnavOpen}));
	}

	bodyClick(e) {
		let tmp = document.querySelector(".subnav");

		if(tmp !== e.target && !tmp.contains(e.target))
        	this.setState({subnavOpen: false});
    }

	render() {
		return (
			<div className="mainNavigation" role="navigation">
				<nav className="navbar">
					<Link to="/" className="navbar-item navbar-img" onClick={window.updateOgUrl} aria-label="Go to the homepage"><Logo alt="StudentOS Logo"/></Link>
					<button onClick={this.toggleSubnav} style={{float: "right", marginRight: "10px", marginLeft: "auto", fontSize: "24px"}} className={"navbar-item " + (window.profile.icon ? "profile-icon" : "navbar-icon fas fa-user")} aria-label="Open user's submenu">{window.profile.icon ? <img src={window.profile.icon}  alt={window.profile.name + "'s profile photo"}/> : ""}</button>
				</nav>
				<nav className="subnav" style={this.state.subnavOpen ? undefined : {display: "none"}}>
					<ColouredModeToggler />
					<AutoUpdaterToggler />
					<Link to="/profile" onClick={window.updateOgUrl} className="subnav-item" aria-label={window.profile.name + "'s profile page"}><i className="fas fa-user"/> Profile</Link>
					<Link to="/logout" onClick={window.updateOgUrl} className="subnav-item" aria-label="logout"><i className="fas fa-sign-out-alt"/> Logout</Link>
				</nav>
			</div>
		)
	}
}

export default Navbar;