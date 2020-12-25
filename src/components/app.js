import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header/header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home/home';
import Chart from './charts/charts';

const App = () => (
	<div id="app">
		<Header />
		<Router>
			<Home path="/" />
			{/* <Profile path="/profile/" user="me" />
			<Profile path="/profile/:user" /> */}
		</Router>
		<Chart />
	</div>
)

export default App;
