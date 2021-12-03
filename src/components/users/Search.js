import React, { Component } from "react";

export class Search extends Component {
	state = {
		text: "",
	};
	onChange = (e) => this.setState({ [e.target.name]: e.target.value });
	// if you use arrow fn dont need bind(this)
	// onSubmit = (e) => {
	// 	e.preventDefault();
	// 	console.log(this.state.text);
	// };
	// onSubmit={this.onSubmit}
	onSubmit(e) {
		e.preventDefault();
		if (this.state.text === "") {
			this.props.setAlert("Please enter something", "light");
		} else {
			this.props.search(this.state.text);
			this.setState({ text: "" });
		}
	}
	render() {
		return (
			<div>
				<form action="" className="form" onSubmit={this.onSubmit.bind(this)}>
					<input
						type="text"
						name="text"
						placeholder="Search Users..."
						value={this.state.text}
						onChange={this.onChange}
					/>
					<input
						type="submit"
						value="Search"
						className="btn btn-dark btn-block"
					/>
				</form>
				{this.props.users.length > 1 && (
					<button
						className="btn btn-light btn-block"
						onClick={this.props.clearUsers}
					>
						Clear
					</button>
				)}
			</div>
		);
	}
}

export default Search;
