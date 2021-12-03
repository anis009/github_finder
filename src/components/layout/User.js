import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Alert";
import Repo from "../repos/Repo";
const User = () => {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [repos, setRepos] = useState([]);
	const { name } = useParams();

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);
			const data = await axios.get(`
			https://api.github.com/users/${name}?client_id=70c1d41d7597c59cf1f3&client_secret=7124278d1c139922a16bcb630afbc69fef03163f`);
			setUser(data.data);
			setLoading(false);
			// console.log(data.data);
		};
		fetchUser();

		const fetchRepo = async () => {
			const data = await axios.get(
				`https://api.github.com/users/${name}/repos?per_page=5&sort=created:asc&client_id=70c1d41d7597c59cf1f3&client_secret=7124278d1c139922a16bcb630afbc69fef03163f`
			);
			console.log("data", data.data);
			setRepos(data.data);
		};
		fetchRepo();
	}, []);
	// console.log(name);
	return (
		<>
			<Link to="/" className="btn btn-primary">
				Back to Search
			</Link>
			{loading && <Loader />}
			Hierable:
			{user.hireable ? (
				<i className="fas fa-check text-success"></i>
			) : (
				<i className="fas fa-times-circle text-danger"></i>
			)}
			<div className="card grid-2">
				<div className="all-center">
					<img
						src={user.avatar_url}
						alt=""
						className="round-img"
						style={{ width: "150px" }}
					/>
					<h1>{user.name}</h1>
					<p>Location:{user.location}</p>
				</div>
				<div>
					{user.bio && (
						<>
							<h3>Bio</h3>
							<p>{user.bio}</p>
						</>
					)}
					<a href={user.html_url} className="btn btn-dark my-1">
						Visit Github Profile
					</a>
					<ul>
						<li>
							{user.login && (
								<>
									<strong>Username:</strong>
									{user.login}
								</>
							)}
						</li>
						<li>
							{user.company && (
								<>
									<strong>Company: </strong>
									{user.company}
								</>
							)}
						</li>
						<li>
							{user.blog && (
								<>
									<strong>Blog:</strong>
									{user.blog}
								</>
							)}
						</li>
					</ul>
				</div>
			</div>
			<div className="card text-center">
				<div className="badge badge-primary">Followers:{user.followers}</div>
				<div className="badge badge-success">Following:{user.following}</div>
				<div className="badge badge-light">
					Public Repos:{user.public_repos}
				</div>
				<div className="badge badge-primary">
					Public Gists:{user.public_gists}
				</div>
			</div>
			<div>
				<Repo repos={repos} />
			</div>
		</>
	);
};

export default User;
