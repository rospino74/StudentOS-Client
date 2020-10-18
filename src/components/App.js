import React, { Component } from 'react';
import Navbar from './navbar/Navbar';
import {
  //per electron: HashRouter as Router,
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";

//main pages import
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Classroom from "./pages/Classroom";
import Page404 from './errors/Page404';

class App extends Component {
	temp1({ match }) {
		return <Classroom ids={{c: match.params.class}}/>
	}
	temp2({ match }) {
		return <Profile id={match.params.id}/>
	}

	//cambio og:url al cambio di url
	updateOgUrl() {
		document
			.querySelector('meta[property=og:url]')
			.setAttribute("content", 
				process.env.PUBLIC_URL + useLocation().pathname);

		console.log(process.env.PUBLIC_URL + useLocation().pathname);
	}

	render() {
		return (
			<main className="App">
				<Router basename={process.env.PUBLIC_URL} getUserConfirmation={(message, callback) => {
					this.updateOgUrl();
					callback(true);
				}}>
					<Navbar />
					<Switch>
						<Route path="/classroom/:class" component={this.temp1.bind(this)}/>
						<Route path="/profile" exact>
							<Profile />
						</Route>
						<Route path="/profile/:id" component={this.temp2.bind(this)}/>
						<Route exact path={["/", "/home"]}>
							<Home />
						</Route>
						<Route path="/logout" component={() => {window.location.href = "http://192.168.1.80/StudentOS/Code/check.php?action=logout"}}/>
						<Route path="*">
							<Page404 />
						</Route>
					</Switch>
				</Router>
			</main>
		);
	}
}

export default App;
