import { Dialog, Transition } from "@headlessui/react";
import React, { FC, Fragment, useState } from "react";

type Props = {
	src: string;
	alt: string;
};

export const ImageWithPreview: FC<Props> = ({ src, alt }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<img
				className="w-4/5 mx-auto my-4 cursor-pointer"
				onClick={() => setIsOpen(true)}
				src={src}
				alt={alt}
			/>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10"
					onClose={() => setIsOpen(false)}
				>
					<div className="h-screen w-screen p-4 flex items-center justify-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-200"
							enterFrom="opacity-0"
							leave="ease-in duration-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-gray-900/50" />
						</Transition.Child>

						<Transition.Child
							as={Fragment}
							enter="ease-out duration-200"
							enterFrom="opacity-0 scale-95"
							leave="ease-in duration-100"
							leaveTo="opacity-0 scale-95"
						>
							<img
								className="max-w-full max-h-full bg-white transform shadow-xl rounded-md"
								src={src}
								alt={alt}
								onClick={() => setIsOpen(false)}
							/>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
