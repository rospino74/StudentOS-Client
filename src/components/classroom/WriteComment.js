import React, { Component } from 'react';
import '../../style/classroom/writeComment.css';
import APIWorker from '../../logic/APIWorker';

class WriteComment extends Component {
	constructor(props) {
		super(props);

		this.state = {isPosted: false, isInvalid: false, text: ""};
		this.onDataSubmitted = this.onDataSubmitted.bind(this);
		this.onTextChange = this.onTextChange.bind(this);
	}

    onDataSubmitted(e) {
		if(e)
        	e.preventDefault();
		
		if(this.state.text === "") {
			this.setState({isInvalid: true});
			return;
		} else {
			this.setState({isInvalid: false});
		}
		const fd = new FormData();
		fd.append('text', this.state.text);
		fd.append('class', this.props.ids.c);
		fd.append('parent_id', this.props.ids.p);
			
		APIWorker.post(
			'addComment',
			fd
		).then(() => {			
			//svuoto testo
			this.setState({text: ""});
			
			//aggiorno
			this.props.onCommentUpdate();
		});
    }
	
	onTextChange(event) {
		//this.setState({isInvalid: this.state.text === "", text: event.target.value});

		if(this.state.text !== "") 
			this.setState({isInvalid: false});

		this.setState({text: event.target.value});
	}

	render() {
		return (
			<form className={"commentWriter " + (this.state.isInvalid ? "invalid" : "")} onSubmit={this.onDataSubmitted}>
				<button type="submit" className="writeBtn fas fa-plus"></button>
				<input type="text" className="inputComment" onChange={this.onTextChange} value={this.state.text} placeholder="Your comment here..." aria-invalid={this.state.isInvalid}/>
			</form>
		)
	}
}

export default WriteComment;