import React, { ComponentProps, ComponentType } from "react";

export const MenuItemIcon = ({
	icon: Icon,
}: {
	icon: ComponentType<ComponentProps<"svg">>;
}) => {
	return <Icon className="inline w-6 h-6 sm:w-5 sm:h-5" />;
};
