import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Comments from "./Comments";
import Menu from './Menu';
import { Link } from "react-router-dom";
import APIWorker from '../../logic/APIWorker';

class Post extends Component {
	constructor(props) {
		super(props)

		this.deletePost = this.deletePost.bind(this);
	}

	deletePost() {
		const fd = new FormData();
		fd.append('class', this.props.ids.c);
		fd.append('id', this.props.id);
			
		APIWorker.post(
			'deletePost',
			fd
		).then(() => {
			this.props.onPostUpdate();
		});
	}	

	render() {
		return (
			<article className="post" id={"post-" + this.props.id}>
				<Menu menu="post" onDelete={this.deletePost}/>
				<section className="content">
					<h3 className="title">
						{this.props.text.title}
					</h3>
					<ReactMarkdown className="text" source={this.props.text.content} />
					<div className="info">
						<Link to={"/profile/" + this.props.author.id}>{this.props.author.name}</Link> <i className="fas fa-user"></i>
						<br />
						{this.props.date} <i className="fas fa-clock"></i>
					</div>
				</section>
				<div className="separator"></div>
				<Comments ids={{p: this.props.id, ...this.props.ids}}/>
			</article>
		)
	}
}

export default Post;