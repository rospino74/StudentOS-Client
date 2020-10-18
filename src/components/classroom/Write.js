import React, { Component } from 'react';
import '../../style/classroom/writePost.css';
import APIWorker from '../../logic/APIWorker';

class Write extends Component {
	constructor(props) {
		super(props);

		this.state = {isOpen: false, isPosted: false, text: "", title: ""};
		this.openWritePage = this.openWritePage.bind(this);
		this.onDataSubmitted = this.onDataSubmitted.bind(this);
		this.onTextChange = this.onTextChange.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
		this.bodyClick = this.bodyClick.bind(this);
	}
	
	bodyClick(e) {
        let writer = document.querySelector(".writer");
        if(writer.contains(e.target) || writer === e.target) {
            return;
        } else {
            this.setState({isOpen: false})
        }
    }
	
	componentDidMount() {
        document.body.addEventListener("click", this.bodyClick);
    }

    componentWillUnmount() {
        document.body.removeEventListener("click", this.bodyClick);
    }
	
	openWritePage() {
        this.setState({isOpen: true});
    }

    onDataSubmitted(e) {
        e.preventDefault();
		
		if(this.state.text === "" || this.state.title === "")
			return;
		
		const fd = new FormData();
		fd.append('title', this.state.title);
		fd.append('text', this.state.text);
		fd.append('class', this.props.ids.c);
			
		APIWorker.post(
			'addPost',
			fd
		).then(() => {
			this.setState({isOpen: false, text: "", title: ""});
			
			//refreshing the post
			this.props.onPostUpdate();
		});
    }
	
	onTextChange(event) {
		this.setState({text: event.target.value});
	}
	
	onTitleChange(event) {
		this.setState({title: event.target.value});
	}

	render() {
		return (
            <div className="writer">
                {this.state.isOpen ? (
                    <form className="container" onSubmit={this.onDataSubmitted}>
						<div className="group">
							<label htmlFor="title">Title</label>
							<input type="text" name="title" className="title" onChange={this.onTitleChange} value={this.state.title}/>
						</div>
						<div className="group">
							<label htmlFor="text">Text</label>
							<textarea name="text" className="text" onChange={this.onTextChange} value={this.state.text}/>
						</div>
						<button type="submit" className="writeBtn fas fa-plus"></button>
					</form>
                ) : (
					<button className="writeBtn fas fa-pen" onClick={this.openWritePage}></button>
				)}
            </div>
		)
	}
}

export default Write;