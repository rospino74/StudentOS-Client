import React, { Component } from 'react';
import Menu from './Menu';
import APIWorker from '../../logic/APIWorker';

class Comment extends Component {
	constructor(props) {
		super(props)

		this.deleteComment = this.deleteComment.bind(this);
	}

	deleteComment() {
		const fd = new FormData();
		fd.append('class', this.props.ids.c);
		fd.append('id', this.props.id);
		fd.append('parent_id', this.props.ids.p);
			
		APIWorker.post(
			'deletePost',
			fd
		).then(() => {
			this.props.onCommentUpdate();
		});
	}

	render() {
		return (
			<article className="comment" id={"comment-" + this.props.id}>
				<h3 className="author">
					{this.props.author}&nbsp;
				</h3>
				<p className="date">
					{this.props.date}&nbsp;
				</p>
				<Menu type="comment" onDelete={this.deleteComment}/>
				<p className="content">
					{this.props.content}
				</p>
			</article>
		)
	}
}

export default Comment;