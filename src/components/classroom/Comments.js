import React, { Component } from 'react';
import Comment from "./Comment";
import WriteComment from "./WriteComment";
import APIWorker from '../../logic/APIWorker';

class Comments extends Component {
	
	constructor(props) {
		super(props);
		this.state = {isLoaded:false, data:[]};

		this.onCommentUpdate = this.onCommentUpdate.bind(this);
		this.getLoader = this.getLoader.bind(this);
	}

	getLoader() {
			const fd = new FormData();
			fd.append('class', this.props.ids.c);
			fd.append('parent_id', this.props.ids.p);
			
			return APIWorker.post(
				'getCommentByParentId',
				fd
			);
	}

	onCommentUpdate() {
		this.getLoader().then(rawResult => rawResult.json()).then(data => {
			this.setState({isLoaded:true, "data": data});
		});
	}
	
	componentDidMount() {
		this.onCommentUpdate()
	}
	
	render() {
		if(!this.state.isLoaded || this.state.data.length === 0) {
			return(
				<div className="comments">
					<WriteComment ids={this.props.ids} onCommentUpdate={this.onCommentUpdate}/>
				</div>
			)
		}

		return (
			<section className="comments">
				<WriteComment ids={this.props.ids} onCommentUpdate={this.onCommentUpdate}/>
				{this.state.data.map(e => {
					return <Comment key={e.id}
									id={e.id}
									date={e.date}
									author={e.author.name}
									content={e.text}
									onCommentUpdate={this.onCommentUpdate}
									ids={this.props.ids}/>
				})}
			</section>
		);
	}
}

export default Comments;