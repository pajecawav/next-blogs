import { PostsList } from "@/components/PostsList";
import { SectionTitle } from "@/components/SectionTitle";
import { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
	return (
		<main className="mb-10">
			<div>
				<SectionTitle>Latest</SectionTitle>
				<PostsList query={{ createdAt: "desc" }} />
			</div>
		</main>
	);
};

export default Home;
