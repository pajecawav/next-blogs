import { Dialog, Transition } from "@headlessui/react";
import axios, { AxiosError } from "axios";
import React, { FC, Fragment } from "react";
import { useMutation } from "react-query";
import { Button } from "./Button";

type Props = {
	postId: number;
	isOpen: boolean;
	onClose: () => void;
	onDelete: () => void;
};

export const DeletePostConfirmation: FC<Props> = ({
	postId,
	isOpen,
	onClose,
	onDelete,
}) => {
	const { mutate: deletePost, isLoading } = useMutation(
		() =>
			axios.delete(`/api/posts/${postId}`).catch(e => {
				throw new Error((e as AxiosError).response?.data.error);
			}),
		{
			onSuccess: () => {
				onDelete();
			},
		}
	);

	return (
		<Transition show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-10 overflow-y-auto"
				open={isOpen}
				onClose={onClose}
			>
				<div className="min-h-screen px-4 text-center">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-900/50" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-200"
						enterFrom="opacity-0 scale-95"
						leave="ease-in duration-100"
						leaveTo="opacity-0 scale-95"
					>
						<div className="inline-block w-full max-w-md px-6 py-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
							<Dialog.Title
								as="h3"
								className="text-lg font-medium leading-6 text-gray-900"
							>
								Confirm deletion
							</Dialog.Title>
							<div className="mt-2">
								<p className="text-sm text-gray-500">
									Are you sure you want to delete this post?
								</p>
							</div>

							<div className="mt-4 flex gap-2 justify-end">
								<Button
									type="button"
									secondary={true}
									onClick={onClose}
								>
									Cancel
								</Button>
								<Button
									type="button"
									onClick={() => deletePost()}
									isProcessing={isLoading}
								>
									Delete
								</Button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};
