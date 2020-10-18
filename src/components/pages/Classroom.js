import React, { Component } from 'react';
import Post from "../classroom/Post";
import Alert from '../errors/Alert';
import Write from '../classroom/Write';
import "../../style/classroom/stylePost.css";
import APIWorker from '../../logic/APIWorker';

class Classroom extends Component {
	constructor(props) {
		super(props);
		this.state = {isLoaded:false, data:{}};

		this.onPostUpdate = this.onPostUpdate.bind(this);
		this.getLoader = this.getLoader.bind(this);
	}

	getLoader() {
		const fd = new FormData();
		fd.append('class', this.props.ids.c);
			
		return APIWorker.post(
			'getPost',
			fd
		);
	}

	onPostUpdate() {
		this.getLoader().then(rawResult => rawResult.json()).then(data => {
			this.setState({"data": data, isLoaded: true});
		});
	}
	
	componentDidMount() {
		this.onPostUpdate();

		if(window.settings.autoUpdate === true)
			this.autoUpdater = setInterval(this.onPostUpdate, 6000);
	}

	componentWillUnmount() {
		if (this.autoUpdater)
			clearInterval(this.autoUpdater);
	}

	render() {
		if(!this.state.isLoaded) {
			return (
				<section className="classroom">
					<Alert icon="fas fa-folder-open" description="Nothing to see here..."/>
				</section>
			)
		}

		return (
				<section className="classroom">
					<h1 className="classroomTitle">Last post for {this.props.ids.c.toUpperCase()}</h1>
					{this.state.data.map(e => {
						return <Post key={e.id} id={e.id} text={e.text} date={e.date} author={e.author} ids={this.props.ids} onPostUpdate={this.onPostUpdate}/>
					})}
					<Write ids={this.props.ids} onPostUpdate={this.onPostUpdate}/>
				</section>
		)
	}
}

export default Classroom;