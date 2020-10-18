import React, { Component } from 'react';
import "../../style/profile/profile.css";
import { ReactComponent as Logo } from '../../resources/user-default-icon.svg';
import APIWorker from '../../logic/APIWorker';

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {isLoaded: false, data: {}};
		
		this.getProfileDetails = this.getProfileDetails.bind(this);
		this.uploadNewIcon = this.uploadNewIcon.bind(this);
		this.uploadOnClick = () => document.querySelector('#newIcon').click();
		this.handleFileChange = this.handleFileChange.bind(this);
	}

	getProfileDetails(id) {
		const fd = new FormData();
		fd.append('what', 'icon,name,email,role,description');
		fd.append('id', id);

		return APIWorker.post(
			'getUserInfo',
			fd
		);
	}
	
	uploadNewIcon(file) {
		const fd = new FormData();
		fd.append('newIcon', file);
			
		return APIWorker.post(
			'uploadNewIcon',
			fd
		);
	}

	handleFileChange(e) {
		this.uploadNewIcon(e.target.files[0]).then(() => window.location.reload());
			/*.then(result => JSON.parse(result))
			.then(data => window.profile.icon = data["newIcon"])
			.then(this.setState({data: window.profile}));*/
	}

	componentDidMount() {
		if(this.props.id) {
			this.getProfileDetails(this.props.id).then(rawResult => rawResult.json())
				.then(data => this.setState({isLoaded: true, data: data}));
		} else {
			this.setState({isLoaded: true, data: window.profile});
		}
	}

	render() {
		if(!this.state.isLoaded) {
			return (
				<section className="profile">
					<div className="icon placeholder"></div>
					<h1 className="name placeholder">&nbsp;</h1>
					<div className="details placeholder">
						<p className="email"></p>
						<p className="role"></p>
					</div>
				</section>
			)
		}
		
		let role;
		switch(parseInt(this.state.data.role)) {
			case 0:
				role = 'Administrator';
			break;
			case 1:
				role = 'Teacher';
			break;
			case 2:
				role = 'Student';
			break;
			default:
				role = this.state.data.role;
			break;
		}

		return (
				<section className="profile">
					{this.state.data.icon ? 
						<img className="icon" src={this.state.data.icon} alt={this.state.data.name + "'s profile photo"} role="figure" aria-label={this.state.data.name + "'s profile photo"}/> : 
						<Logo className="icon" alt={this.state.data.name + "'s profile photo"} role="figure" aria-label={this.state.data.name + "'s profile photo"}/>
					}
					{!this.props.id ? 
					<div className="upload" onClick={this.uploadOnClick} role="button">
						<i className="fas fa-file-image"></i>
						<p>Update profile photo</p>
						<input type="file" id="newIcon" name="newIcon" accept="image/png, image/jpeg, image/gif, image/webp, image/svg+xml" style={{display: 'none'}} onChange={this.handleFileChange}/>
					</div> : undefined }
					<h1 className="name">{this.state.data.name}</h1>
					<h2 className="description">{this.state.data.description}</h2>
					<div className="details">
						<p className="email"><i className="fas fa-at" title="Email Address"></i> {this.state.data.email}</p>
						<p className="role"><i className="fas fa-user-tag" title="User role"></i> {role}</p>
					</div>
				</section>
		)
	}
}

export default Profile;