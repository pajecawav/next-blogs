import { Button } from "@/components/Button";
import { Textarea } from "@/components/Textarea";
import { UnauthenticatedError } from "@/components/UnauthenticatedError";
import { useUser } from "@/hooks/useUser";
import { EditUser, editUserSchema, UserResponse } from "@/lib/schemas/user";
import axios from "axios";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

const SettingsPage: NextPage = () => {
	const { user, isLoggedIn } = useUser();
	const router = useRouter();
	const queryClient = useQueryClient();

	const { mutate: editUser } = useMutation(
		(data: EditUser) => {
			return axios.patch<unknown, unknown, EditUser>(
				`/api/users/${user!.id}`,
				data
			);
		},
		{
			onSuccess: async (_, variables) => {
				await queryClient.invalidateQueries(["user", user!.id]);
				await queryClient.setQueryData<UserResponse>(["me"], data => ({
					...data!,
					...variables,
				}));

				// TODO: show success message (toast?) instead of redirecting
				router.push(`/users/${user!.username}`);
			},
		}
	);

	if (!isLoggedIn) {
		return <UnauthenticatedError />;
	}

	return (
		<div className="w-full max-w-2xl mx-auto bg-white pt-3 pb-5 px-2 md:px-5 rounded shadow-sm">
			<Formik
				initialValues={{ bio: user!.bio }}
				onSubmit={data => editUser(data)}
				validationSchema={editUserSchema}
			>
				{({ isSubmitting, isValid }) => (
					<Form className="flex flex-col gap-4">
						<div>
							<div className="flex flex-col gap-2">
								<label className="font-bold" htmlFor="bio">
									Bio
								</label>
								<Textarea
									name="bio"
									minRows={6}
									placeholder="Write something about yourself"
								/>
							</div>
						</div>

						<div>
							<Button
								type="submit"
								disabled={!isValid || isSubmitting}
								isProcessing={isSubmitting}
							>
								Save
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default SettingsPage;
