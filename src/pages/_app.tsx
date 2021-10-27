import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		},
	},
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Head>
					<title>Blogs</title>
				</Head>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AuthProvider>
		</QueryClientProvider>
	);
};
export default MyApp;