import * as React from "react";
import {
	BarChart,
	Briefcase,
	ContactRound,
	Home,
	List,
	Package, User,
	Users
} from "lucide-react";

interface SidebarRoute {
	path: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	permission: string[];
}

export const sidebarRoutes: SidebarRoute[] = [
	{
		path: "/dashboard",
		label: "Панель",
		icon: Home,
		permission: ["ADMIN", "MANAGER", "EMPLOYEE"],
	},
	{
		path: "/users",
		label: "Пользователи",
		icon: Users,
		permission: ["ADMIN"],
	},
	{
		path: "/categories",
		label: "Категории",
		icon: List,
		permission: ["ADMIN"],
	},
	{
		path: "/warehouse",
		label: "Склад",
		icon: Package,
		permission: ["MANAGER", "ADMIN", "EMPLOYEE"],
	},
	{
		path: "/orders",
		label: "Заказы",
		icon: List,
		permission: ["MANAGER", "ADMIN"],
	},
	{
		path: "/analytics",
		label: "Аналитика",
		icon: BarChart,
		permission: ["MANAGER", "ADMIN"],
	},
	{
		path: "/tasks",
		label: "Задачи",
		icon: Briefcase,
		permission: ["EMPLOYEE"],
	},
	{
		path: "/suppliers",
		label: "Поставщики",
		icon: Users,
		permission: ["MANAGER", "ADMIN"],
	},
	{
		path: "/customers",
		label: "Покупатели",
		icon: ContactRound,
		permission: ["MANAGER", "ADMIN"],
	},
	{
		path: "/profile",
		label: "Профиль",
		icon: User,
		permission: ["ADMIN", "MANAGER", "EMPLOYEE"],
	},
];