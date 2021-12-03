import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import About from "./components/pages/About";
import Loader from "./Loader";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import User from "./components/layout/User";

const App = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alerts, setAlerts] = useState("");
	const [type, setType] = useState("");

	// useEffect(() => {
	// 	// console.log(process.env.C_ID);
	// 	const fetchUser = async () => {
	// 		try {
	// 			setLoading(true);
	// 			const res = await axios.get(
	// 				`https://api.github.com/users?client_id=70c1d41d7597c59cf1f3&client_secret=7124278d1c139922a16bcb630afbc69fef03163f`
	// 			);
	// 			setLoading(false);
	// 			// console.log(res.data);
	// 			setUsers(res.data);
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};
	// 	fetchUser();
	// }, []);
	const search = async (text) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=70c1d41d7597c59cf1f3&client_secret=7124278d1c139922a16bcb630afbc69fef03163f`
		);
		console.log(text);
		setLoading(false);
		console.log(res.data.items);
		setUsers(res.data.items);
	};

	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};
	const setAlert = (msg, type) => {
		console.log(msg, type);
		setAlerts(msg);
		setType(type);
		setTimeout(() => setAlerts(""), 3000);
	};
	return (
		<div className="App">
			<Router>
				<Navbar title="Github Finder" />
				<div className="container">
					{alerts && <Alert msg={alerts} type={type} />}
					<Routes>
						<Route
							exact
							path="/"
							element={
								<>
									<Search
										search={search}
										clearUsers={clearUsers}
										users={users}
										setAlert={setAlert}
									/>
									{loading ? (
										<Loader />
									) : (
										users.length > 0 && <Users users={users} />
									)}
								</>
							}
						/>

						<Route exact path="/about" element={<About />} />

						<Route exact path="/user/:name" element={<User />} />
					</Routes>
				</div>
			</Router>
		</div>
	);
};

export default App;
