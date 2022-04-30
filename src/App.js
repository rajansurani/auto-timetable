import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
//scss
import "./assets/scss/hope-ui.scss";

import Dashboard from "./components/Dashboard";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/home"  component={Dashboard} />
					<Route path="/faculty"  component={Dashboard} />
					<Route path="/courses"  component={Dashboard} />
					<Route path="/classrooms"  component={Dashboard} />
					<Route path="/timetable"  component={Dashboard} />
					<Route path="/batch"  component={Dashboard} />
					<Route path="/courseAllocation/:version"  component={Dashboard} />
					<Route path="/slotAllocation/:version"  component={Dashboard} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
