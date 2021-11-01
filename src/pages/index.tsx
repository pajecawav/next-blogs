import { PostsList } from "@/components/PostsList";
import { SectionTitle } from "@/components/SectionTitle";
import { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
	return (
		<main className="w-full max-w-3xl mx-auto">
			<SectionTitle>Latest</SectionTitle>
			<PostsList query={{ createdAt: "desc" }} />
		</main>
	);
};

export default Home;
