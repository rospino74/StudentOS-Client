import React, { Component } from 'react';
import "../../style/home.css";
import { Link } from 'react-router-dom';
import APIWorker from '../../logic/APIWorker';

class Welcome extends Component {
	constructor(props) {
		super(props);

		this.state = {isLoaded: false, classrooms: []};

		this.onClassSelected = this.onClassSelected.bind(this)
		this.getLoader = this.getLoader.bind(this)
	}

	onClassSelected(value) {
		window.location.replace("/classroom/" + value);
	}
	
	getLoader() {
		const fd = new FormData();
		fd.append('what', 'classrooms')
	
		return APIWorker.post('getUserInfo', fd);
	}
	
	componentDidMount() {
		this.getLoader().then(rawResult => rawResult.json()).then(data => {
			this.setState({isLoaded:true, classrooms: data.classrooms});
		});
	}

	render() {
		return (
			<div className="classList">
				{this.state.classrooms.map((e) =>
					<Link key={e.id} className="item" to={"/classroom/" + e.name}>
						<img className="icon" alt={e.name.toUpperCase() + " logo"} src={e.icon}/>
						<p className="name">Classe {e.name.toUpperCase()}</p>
					</Link>
				)}
          </div>
		)
	}
}

export default Welcome;