export interface Supplier {
	id: number;
	name: string;
	contactPerson: string | null;
	email: string | null;
	phone: string | null;
	address: string | null;
	status: "ACTIVE" | "INACTIVE";
}

export type Customer = {
	id: number;
	name: string;
	contactPerson: string | null;
	email: string | null;
	phone: string | null;
	address: string | null;
	status: "ACTIVE" | "INACTIVE";
};

import { UserRole, ReportAction, OrderStatus } from "./enums";

export interface PersonalDetail {
	id: number;
	phoneNumber: string;
	firstName: string;
	lastName: string;
	email: string;
	city: string;
	createdAt?: string;
}

export interface Employee {
	id: number;
	position: string;
	personalDetails: PersonalDetail;
	createdAt?: string;
}

export interface User {
	id: number;
	username: string;
	employee: Employee;
	role: UserRole;
	createdAt?: string;
}

export interface Category {
	id: number;
	name: string;
	createdAt?: string;
}

export interface Material {
	id: number;
	name: string;
	description: string;
	price: number;
	stock: number;
	createdAt?: string;
}

export interface ProductMaterial {
	id: number;
	productId: number;
	material: Material;
	quantity: number;
}

export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	stock: number;
	category: Category;
	productMaterials: ProductMaterial[];
	createdAt?: string;
}

export interface OrderProduct {
	id: number;
	orderId: number;
	product: Product;
	quantity: number;
}

export interface Order {
	id: number;
	orderDate: string;
	status: OrderStatus;
	employee: Employee;
	orderProducts: OrderProduct[];
	totalCost?: number;
	createdAt?: string;
}

export interface Report {
	id: number;
	action: ReportAction;
	details: string;
	employee: Employee;
	createdAt?: string;
}

export interface MaterialRequirement {
	requiredQuantity: number;
	availableQuantity: number;
	isSufficient: boolean;
}
