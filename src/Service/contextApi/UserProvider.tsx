import React, { createContext, useState, useContext, ReactNode } from "react";

interface Props {
	children: ReactNode;
}
const UserContext = createContext(undefined);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }:Props) => {
	const [showDrawer, setShowDrawer] = useState(false);

	const showDrawerHandle = () => {
		setShowDrawer(!showDrawer);
	};

	return <UserContext.Provider value={{ showDrawer, showDrawerHandle }}>{children}</UserContext.Provider>;
};
