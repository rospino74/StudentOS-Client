import React, { Component } from 'react';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {menuOpen: false};
		this.timeOutId = null;

        //bind del metodo
        this.openMenu = this.openMenu.bind(this);
		this.onBlurHandler = this.onBlurHandler.bind(this);
		this.onFocusHandler = this.onFocusHandler.bind(this);
        this.bodyClick = this.bodyClick.bind(this);
    }

    openMenu() {
        this.setState({menuOpen: true});
    }

    bodyClick(e) {
        let menu = document.querySelectorAll(".menu .menu-content"); //all menu
        let inner = false;
        
        menu.forEach(( elem ) => {
            let tmp = elem.parentElement; //menu elem
            
            if(tmp === e.target || tmp.contains(e.target)) {
                inner = true;
            }
        });
        
        if(inner) {
            return;
        } else {
            this.setState({menuOpen: false})
        }
    }

	componentDidMount() {
        window.addEventListener("click", this.bodyClick);
    }

    componentWillUnmount() {
       window.removeEventListener("click", this.bodyClick);
    }
	
	onBlurHandler() {
		this.timeOutId = setTimeout(() => {
			this.setState({isOpen: false});
		});
	}
	onFocusHandler() {
		clearTimeout(this.timeOutId);
	}

	render() {
		return (
			<nav className="menu" onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
                <button className={"fas fa-ellipsis-" + (this.props.menu === "post" ? "v" : "h")  + " menu-btn " + (this.props.menu === "post" ? "post-menu" : "comment-menu")} onClick={this.openMenu} aria-haspopup="true" aria-expanded={this.state.menuOpen}></button>
                {this.state.menuOpen ? (
                        <div className="menu-content">
                            <button onClick={this.props.onDelete}>Delete</button>
                        </div>
                ) : undefined}
            </nav>
		)
	}
}

export default Menu;