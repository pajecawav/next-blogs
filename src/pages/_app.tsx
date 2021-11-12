import { Layout } from "@/components/Layout";
import { NavigationProgressBar } from "@/components/NavigationProgressBar";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import "nprogress/nprogress.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
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
					<NavigationProgressBar />
					<Component {...pageProps} />
				</Layout>
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default MyApp;
