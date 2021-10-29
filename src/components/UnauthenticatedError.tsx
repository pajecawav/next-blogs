import React from "react";

export const UnauthenticatedError: React.FC = () => {
	return (
		<div className="text-center text-3xl text-red-500">
			Must be logged in to view this page
		</div>
	);
};
