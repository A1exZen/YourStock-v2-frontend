import {useAuthStore} from "@/store/useAuthStore.ts";
import {motion, AnimatePresence} from 'framer-motion'

import {Link, useLocation} from "react-router";
import {Button} from "../ui/button.tsx";
import {useState} from "react";
import * as React from "react";
import {ChevronLeft, ChevronRight, LogOut, Menu} from "lucide-react";
import { sidebarRoutes } from "./sidebarRoutes.ts";


interface SidebarContentProps {
	isMobile?: boolean;
	isCollapsed?: boolean;
	setIsCollapsed?: (value: boolean) => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
	                                                       isMobile = false,
	                                                       isCollapsed = false,
	                                                       setIsCollapsed,
                                                       }) => {
	const {username, role, logout} = useAuthStore();
	const location = useLocation();
	const isAuthenticated = !!username;
	const isAdmin = role === "ADMIN";

	const can = (permissions: string[]) => {
		return permissions.includes(role as string);
	};

	const handleLogout = () => {
		logout();
	};

	return (
		<div
			className={`flex flex-col h-full ${isCollapsed ? "items-center" : ""}`}>
			<div
				className={`flex justify-end  ${
					isMobile ? "mt-3" : ""
				} items-center mb-10 py-3 px-4`}
			>

				{isMobile ? null : (
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsCollapsed && setIsCollapsed(!isCollapsed)}
						className="text-sidebar-foreground hover:text-white border border-border"
					>
						{isCollapsed ? <ChevronRight className="w-5 h-5"/> :
							<ChevronLeft className="w-5 h-5"/>}
					</Button>
				)}
			</div>

			<nav
				className={`flex flex-col justify-between h-full mb-4 ${
					isCollapsed && !isMobile ? "px-2" : "px-4"
				}`}
			>
				<div className="flex flex-col gap-2">
					{isAuthenticated &&
						sidebarRoutes.map(
							({path, label, icon: Icon, permission}) =>
								can(permission) && (
									<Link key={path} to={path}>
										<Button
											variant={location.pathname === path ? "default" : "ghost"}
											className="w-full justify-start gap-2"
										>
											<Icon
												className={`w-5 h-5 ${isCollapsed && !isMobile ? "mx-auto" : ""}`}/>
											{(!isCollapsed || isMobile) && label}
											{path === "/profile" && (!isCollapsed || isMobile) && (
												<span
													className="ml-auto text-xs px-2 py-1 bg-gray-800 rounded">
                          {isAdmin ? "Admin" : role}
                        </span>
											)}
										</Button>
									</Link>
								)
						)}
				</div>
				{isAuthenticated && (
					<div>
						<Button
							variant='ghost'
							className="dark:hover:bg-red-900 hover:bg-red-900 w-full justify-start gap-2 bg-transparent "
							onClick={handleLogout}
						>
							<LogOut
								className={`w-5 h-5 ${isCollapsed && !isMobile ? "mx-auto" : ""}`}/>
							{(!isCollapsed || isMobile) && (
								<div className="flex justify-between items-center w-full">
									<span>Выход</span>
									<ChevronRight className="w-5 h-5"/>
								</div>
							)}
						</Button>
					</div>
				)}
			</nav>
		</div>
	);
};

export const Sidebar: React.FC = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<>
			<div
				className={`hidden lg:flex flex-col m-2 mr-0 rounded-lg z-40 left-0 top-0 max-h-screen bg-sidebar text-sidebar-foreground transition-all duration-350 ease-in-out ${
					isCollapsed ? "w-16" : "w-64"
				}`}
			>
				<SidebarContent isCollapsed={isCollapsed}
				                setIsCollapsed={setIsCollapsed}/>
			</div>

			<AnimatePresence>
				{sidebarOpen && (
					<>
						<motion.div
							initial={{opacity: 0}}
							animate={{opacity: 0.5}}
							exit={{opacity: 0}}
							transition={{duration: 0.35, ease: "easeInOut"}}
							className="fixed inset-0 bg-black z-40"
							onClick={() => setSidebarOpen(false)}
						/>
						<motion.div
							initial={{x: "-100%", opacity: 0}}
							animate={{x: 0, opacity: 1}}
							exit={{x: "-100%", opacity: 0}}
							transition={{duration: 0.35, ease: "easeInOut"}}
							className="fixed inset-y-0 left-0 w-64 bg-sidebar text-sidebar-foreground z-50"
						>
							<SidebarContent isMobile/>
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setSidebarOpen(false)}
								className="absolute top-4 right-4 text-sidebar-foreground hover:text-white"
							>
								<ChevronLeft className="w-6 h-6"/>
							</Button>
						</motion.div>
					</>
				)}
			</AnimatePresence>
			{!sidebarOpen && (
				<Button
					size="icon"
					className="fixed top-4 left-4 z-50 lg:hidden"
					onClick={() => setSidebarOpen(!sidebarOpen)}
				>
					<Menu className="w-6 h-6"/>
				</Button>
			)}
		</>
	);
};