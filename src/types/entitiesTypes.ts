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

import { UserRole, ReportAction} from "./enums";

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
	description?: string;
	categoryId: number;
	supplierId: number;
	price: number;
	quantity: number;
	unit: string;
}
export interface MaterialOrder {
	id: number;
	material: Material;
	supplierId: number;
	quantity: number;
	status: string;
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
	quantity: number;
	categoryId: number;
	unit: string;
	productMaterials: ProductMaterial[];
}

export interface Order {
	id: number;
	createdAt: string;
	updatedAt: string;
	customerId: number;
	employeeId: number;
	status: string;
	comment?: string;
	orderProducts: OrderProduct[];
}

export interface OrderProduct {
	id: number;
	productId: number;
	orderId: number;
	quantity: number;
	priceAtOrder: number;
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

export interface Category {
	id: number;
	name: string;
	type: "PRODUCT" | "MATERIAL";
	createdAt?: string;
}
