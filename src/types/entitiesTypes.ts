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