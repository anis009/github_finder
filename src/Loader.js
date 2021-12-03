import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
	let [loading, setLoading] = useState(true);
	// console.log(loading);
	return (
		<div
			className="loader"
			style={{ marginTop: "100px", padding: "100px", textAlign: "center" }}
		>
			<HashLoader color="#000" loading={loading} css="" size={80} />
		</div>
	);
};

export default Loader;
