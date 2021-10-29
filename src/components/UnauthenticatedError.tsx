import React from "react";
import { PageError } from "./PageError";

export const UnauthenticatedError: React.FC = () => {
	return <PageError>Must be logged in to view this page</PageError>;
};
