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
				className="w-4/5 mx-auto cursor-pointer"
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
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-200"
							enterFrom="opacity-0"
							leave="ease-in duration-100"
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
							<div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
								<button
									className="outline-none"
									onClick={() => setIsOpen(false)}
								>
									<img src={src} alt={alt} />
								</button>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
