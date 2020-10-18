import React, {Component} from 'react';
import Alert from './Alert';

class Page404 extends Component {
	render() {
		return <Alert icon="fab fa-canadian-maple-leaf" description={["I came to myself within a dark wood,", <br key="br"/>, "where the straight way was lost..."]}/>
	}
}

export default Page404;