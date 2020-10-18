import React, { Component } from 'react';

const bannerState = {
    HIDDEN: "hidden",
    ERROR: "error",
    SUCCESS: "success",
    WARN: "warn",
    INFO: "info"
}

class Login extends Component {
    constructor(props) {
		super(props);
		this.state = {loginBanner: {
            state: bannerState.HIDDEN,
            icon: "",
            message: ""
        }, username: ""};

		this.performLogin = this.performLogin.bind(this);
		this.printBanner = this.printBanner.bind(this);
		this.updateField = this.updateField.bind(this);
    }
    
    performLogin(event) {
        let p = new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

            const fd = new FormData();
            fd.append('password', this.state.password);
            fd.append('username', this.state.username);
			
            xhr.open("POST", window.apiUrl + "performLogin");
            
            xhr.send(fd);

			xhr.onload = () => {
				if(xhr.status === 200){
					resolve(xhr.responseText);
				} else {
					reject(xhr.responseText);
				}
			};
			xhr.onerror = () => reject(xhr.statusText);
        });
        
        p.then();
        p.catch();

        event.preventDefault();
    }

    printBanner() {
        if(this.state.loginBanner.state === bannerState.HIDDEN)
            return;

        return(
            <div className={"loginStatusBanner " + this.state.loginBanner.state}><i className={"loginStatusIcon fas " + this.state.loginBanner.icon}></i><p className="loginStatusMessage">{this.state.loginBanner.message}</p></div>
        )
    }

    updateField(event) {
        let state = [];
        state[event.target.id] = event.target.value;

        this.setState(state);
    }

    render() {
        return (
            <form onSubmit={this.performLogin} method="POST">
                {this.printBanner()}
			    <input id="username" type="text"  onInput={this.updateField} required/>
    		    <input id="password" type="password" onInput={this.updateField} required/>
	        </form>
        )
    }
}

export default Login;