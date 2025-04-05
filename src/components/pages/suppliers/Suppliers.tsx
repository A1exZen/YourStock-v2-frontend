// src/pages/Suppliers.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	useSuppliers,
	useCreateSupplier,
	useUpdateSupplier,
	useDeleteSupplier,
} from "@/hooks/useSupplier";
import { ColumnDef, useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { Supplier } from "@/types/entitiesTypes.ts";

const supplierSchema = z.object({
	name: z.string().min(1, "Название обязательно"),
	contactPerson: z.string().optional(),
	email: z.string().email("Неверный формат email").optional().or(z.literal("")),
	phone: z
		.string()
		.regex(/\+?[0-9]{10,15}/, "Неверный формат номера телефона")
		.optional()
		.or(z.literal("")),
	address: z.string().optional(),
	status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

type SupplierFormValues = z.infer<typeof supplierSchema>;

export const Suppliers = () => {
	const { data: suppliers = [], isLoading, error } = useSuppliers();
	const { mutate: createSupplier, isPending: isCreating } = useCreateSupplier();
	const { mutate: updateSupplier, isPending: isUpdating } = useUpdateSupplier();
	const { mutate: deleteSupplier, isPending: isDeleting } = useDeleteSupplier();

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

	const form = useForm<SupplierFormValues>({
		resolver: zodResolver(supplierSchema),
		defaultValues: {
			name: "",
			contactPerson: "",
			email: "",
			phone: "",
			address: "",
			status: "ACTIVE",
		},
	});

	const onSubmit = (values: SupplierFormValues) => {
		if (editingSupplier) {
			updateSupplier({ id: editingSupplier.id, data: values });
		} else {
			createSupplier(values);
		}
		setIsDialogOpen(false);
		setEditingSupplier(null);
		form.reset();
	};

	const handleEdit = (supplier: Supplier) => {
		setEditingSupplier(supplier);
		form.reset(supplier);
		setIsDialogOpen(true);
	};

	const handleDelete = (id: number) => {
		if (window.confirm("Вы уверены, что хотите удалить этого поставщика?")) {
			deleteSupplier(id);
		}
	};

	const columns: ColumnDef<Supplier>[] = [
		{ accessorKey: "name", header: "Название" },
		{ accessorKey: "contactPerson", header: "Контактное лицо" },
		{ accessorKey: "email", header: "Email" },
		{ accessorKey: "phone", header: "Телефон" },
		{ accessorKey: "address", header: "Адрес" },
		{ accessorKey: "status", header: "Статус" },
		{
			id: "actions",
			header: "Действия",
			cell: ({ row }) => (
				<div className="flex gap-2">
					<Button variant="outline" onClick={() => handleEdit(row.original)} disabled={isDeleting}>
						Редактировать
					</Button>
					<Button
						variant="destructive"
						onClick={() => handleDelete(row.original.id)}
						disabled={isDeleting}
					>
						Удалить
					</Button>
				</div>
			),
		},
	];

	const table = useReactTable({
		data: suppliers,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	// @ts-ignore
	return (
		<div className="p-4 max-w-5xl mx-auto">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Поставщики</h1>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button onClick={() => setEditingSupplier(null)} disabled={isCreating || isUpdating}>
							Добавить поставщика
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{editingSupplier ? "Редактировать поставщика" : "Добавить поставщика"}
							</DialogTitle>
						</DialogHeader>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<div>
								<Label htmlFor="name" className='mb-2'>Название</Label>
								<Input id="name" {...form.register("name")} />
								{form.formState.errors.name && (
									<p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
								)}
							</div>
							<div>
								<Label htmlFor="contactPerson" className='mb-2'>Контактное лицо</Label>
								<Input id="contactPerson" {...form.register("contactPerson")} />
							</div>
							<div>
								<Label htmlFor="email" className='mb-2'>Email</Label>
								<Input id="email" type="email" {...form.register("email")} />
								{form.formState.errors.email && (
									<p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
								)}
							</div>
							<div>
								<Label htmlFor="phone" className='mb-2'>Телефон</Label>
								<Input id="phone" {...form.register("phone")} />
								{form.formState.errors.phone && (
									<p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>
								)}
							</div>
							<div>
								<Label htmlFor="address" className='mb-2'>Адрес</Label>
								<Input id="address" {...form.register("address")} />
							</div>
							<div>
								<Label htmlFor="status" className='mb-2'>Статус</Label>
								<select id="status" {...form.register("status")} className="w-full border rounded p-2 bg-background text-foreground">
									<option value="ACTIVE">Активный</option>
									<option value="INACTIVE">Неактивный</option>
								</select>
							</div>
							<Button type="submit" disabled={isCreating || isUpdating} >
								{editingSupplier ? (isUpdating ? "Сохранение..." : "Сохранить") : (isCreating ? "Создание..." : "Создать")}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</div>
			{isLoading ? (
				<p>Загрузка...</p>
			) : error ? (
				<p className="text-red-500">Ошибка: {(error as Error).message}</p>
			) : (
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>{header.column.columnDef.header}</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>{cell.getValue() ?? "—"}</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
};

export default Suppliers;