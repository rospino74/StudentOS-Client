import React, { Component } from 'react';
import Select from "../home/Select";

class Home extends Component {
	render() {
		return (
				<section className="home">
					<header className="welcome">
						<h1 className="name">Hi {window.profile.name}!</h1>
						<h3 className="select">Please select a classroom before continue:</h3>
					</header>
					<Select />
				</section>
		)
	}
}

export default Home;