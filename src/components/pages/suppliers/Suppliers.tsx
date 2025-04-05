import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
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
import { Supplier } from "@/types/entitiesTypes.ts";
import { Edit, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import {DataTable} from "@/components/ui/custom/DataTable.tsx";
import {ConfirmDialog} from "@/components/ui/custom/ConfirmDialog.tsx";


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
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
	const [supplierToDelete, setSupplierToDelete] = useState<number | null>(null);

	console.log("Suppliers data:", suppliers, "isLoading:", isLoading, "error:", error);

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
			updateSupplier(
				{ id: editingSupplier.id, data: values },
				{
					onSuccess: () => {
						toast.success("Поставщик успешно обновлён");
						setIsDialogOpen(false);
						setEditingSupplier(null);
						form.reset();
					},
					onError: (error) => {
						toast.error(error.message || "Не удалось обновить поставщика");
					},
				}
			);
		} else {
			createSupplier(values, {
				onSuccess: () => {
					toast.success("Поставщик успешно создан");
					setIsDialogOpen(false);
					form.reset();
				},
				onError: (error) => {
					toast.error(error.message || "Не удалось создать поставщика");
				},
			});
		}
	};

	const handleEdit = (supplier: Supplier) => {
		setEditingSupplier(supplier);
		form.reset(supplier);
		setIsDialogOpen(true);
	};

	const handleDelete = (id: number) => {
		setSupplierToDelete(id);
		setIsConfirmDialogOpen(true);
	};

	const confirmDelete = () => {
		if (supplierToDelete !== null) {
			deleteSupplier(supplierToDelete, {
				onSuccess: () => {
					toast.success("Поставщик успешно удалён");
				},
				onError: (error) => {
					toast.error("Не удалось удалить поставщика");
				},
			});
			setSupplierToDelete(null);
		}
	};

	const columns: ColumnDef<Supplier>[] = [
		{
			accessorKey: "name",
			header: "Название",
			cell: ({ row }) => <div className="text-center">{row.getValue("name") || "—"}</div>,
			enableSorting: true,
			enableColumnFilter: true,
		},
		{
			accessorKey: "contactPerson",
			header: "Контактное лицо",
			cell: ({ row }) => <div className="text-center">{row.getValue("contactPerson") || "—"}</div>,
			enableSorting: true,
			enableColumnFilter: true,
		},
		{
			accessorKey: "email",
			header: "Email",
			cell: ({ row }) => <div className="text-center">{row.getValue("email") || "—"}</div>,
			enableSorting: true,
			enableColumnFilter: true,
		},
		{
			accessorKey: "phone",
			header: "Телефон",
			cell: ({ row }) => <div className="text-center">{row.getValue("phone") || "—"}</div>,
			enableSorting: true,
			enableColumnFilter: true,
		},
		{
			accessorKey: "address",
			header: "Адрес",
			cell: ({ row }) => <div className="text-center">{row.getValue("address") || "—"}</div>,
			enableSorting: true,
			enableColumnFilter: true,
		},
		{
			accessorKey: "status",
			header: "Статус",
			cell: ({ row }) => (
				<div className="text-center">
          <span
	          className={`px-2 py-1 rounded-full text-xs font-medium ${
		          row.getValue("status") === "ACTIVE"
			          ? "bg-green-100 text-green-800"
			          : "bg-red-100 text-red-800"
	          }`}
          >
            {row.getValue("status") === "ACTIVE" ? "Активный" : "Неактивный"}
          </span>
				</div>
			),
			enableSorting: true,
			enableColumnFilter: true,
			filterFn: (row, columnId, filterValue) => {
				const value = row.getValue(columnId) as string;
				return value.toLowerCase().includes(filterValue.toLowerCase());
			},
		},
		{
			id: "actions",
			header: () => <div className="text-center">Действия</div>,
			cell: ({ row }) => (
				<div className="flex justify-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted/50 transition-colors duration-200">
								<span className="sr-only">Открыть меню</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="bg-background border border-border p-2 rounded-md flex flex-col gap-1 shadow-lg"
						>
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.2 }}
							>
								<DropdownMenuItem
									onClick={() => handleEdit(row.original)}
									className="cursor-pointer px-3 py-1.5 rounded-md hover:bg-muted/50 transition-colors duration-200"
								>
									Редактировать
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => handleDelete(row.original.id)}
									className="cursor-pointer px-3 py-1.5 rounded-md text-red-600 hover:bg-red-100/50 transition-colors duration-200"
								>
									Удалить
								</DropdownMenuItem>
							</motion.div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			),
			enableSorting: false,
			enableColumnFilter: false,
		},
	];

	return (
		<div className="p-4 max-w-5xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-foreground">Поставщики</h1>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button
							onClick={() => {
								console.log("Add supplier button clicked");
								setEditingSupplier(null);
								setIsDialogOpen(true);
							}}
							disabled={isCreating || isUpdating}
							className="bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all duration-200"
						>
							Добавить поставщика
						</Button>
					</DialogTrigger>
					<AnimatePresence>
						{isDialogOpen && (
							<DialogContent
								className="bg-background text-foreground rounded-lg shadow-xl max-w-md"
							>
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ duration: 0.3 }}
								>
									<DialogHeader>
										<DialogTitle className="text-xl font-semibold">
											{editingSupplier ? "Редактировать поставщика" : "Добавить поставщика"}
										</DialogTitle>
										<DialogDescription>
											{editingSupplier
												? "Измените данные поставщика и сохраните изменения."
												: "Заполните форму, чтобы добавить нового поставщика."}
										</DialogDescription>
									</DialogHeader>
									<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
										<div>
											<Label htmlFor="name" className="mb-2 block text-sm font-medium">
												Название
											</Label>
											<Input
												id="name"
												{...form.register("name")}
												className="border-border bg-background text-foreground focus:ring-2 focus:ring-primary transition-all duration-200"
											/>
											{form.formState.errors.name && (
												<p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
											)}
										</div>
										<div>
											<Label htmlFor="contactPerson" className="mb-2 block text-sm font-medium">
												Контактное лицо
											</Label>
											<Input
												id="contactPerson"
												{...form.register("contactPerson")}
												className="border-border bg-background text-foreground focus:ring-2 focus:ring-primary transition-all duration-200"
											/>
										</div>
										<div>
											<Label htmlFor="email" className="mb-2 block text-sm font-medium">
												Email
											</Label>
											<Input
												id="email"
												type="email"
												{...form.register("email")}
												className="border-border bg-background text-foreground focus:ring-2 focus:ring-primary transition-all duration-200"
											/>
											{form.formState.errors.email && (
												<p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
											)}
										</div>
										<div>
											<Label htmlFor="phone" className="mb-2 block text-sm font-medium">
												Телефон
											</Label>
											<Input
												id="phone"
												{...form.register("phone")}
												className="border-border bg-background text-foreground focus:ring-2 focus:ring-primary transition-all duration-200"
											/>
											{form.formState.errors.phone && (
												<p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
											)}
										</div>
										<div>
											<Label htmlFor="address" className="mb-2 block text-sm font-medium">
												Адрес
											</Label>
											<Input
												id="address"
												{...form.register("address")}
												className="border-border bg-background text-foreground focus:ring-2 focus:ring-primary transition-all duration-200"
											/>
										</div>
										<div>
											<Label htmlFor="status" className="mb-2 block text-sm font-medium">
												Статус
											</Label>
											<select
												id="status"
												{...form.register("status")}
												className="w-full border rounded p-2 bg-background text-foreground focus:ring-2 focus:ring-primary transition-all duration-200"
											>
												<option value="ACTIVE">Активный</option>
												<option value="INACTIVE">Неактивный</option>
											</select>
										</div>
										<Button
											type="submit"
											disabled={isCreating || isUpdating}
											className="w-full bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all duration-200"
										>
											{editingSupplier
												? isUpdating
													? "Сохранение..."
													: "Сохранить"
												: isCreating
													? "Создание..."
													: "Создать"}
										</Button>
									</form>
								</motion.div>
							</DialogContent>
						)}
					</AnimatePresence>
				</Dialog>
			</div>
			{isLoading ? (
				<p className="text-center text-foreground">Загрузка...</p>
			) : error ? (
				<p className="text-red-500 text-center">Ошибка: {(error as Error).message}</p>
			) : suppliers.length === 0 ? (
				<p className="text-center text-foreground">Нет поставщиков для отображения.</p>
			) : (
				<div className="rounded-lg shadow-lg border border-border overflow-hidden">
					<DataTable columns={columns} data={suppliers} />
				</div>
			)}
			<ConfirmDialog
				open={isConfirmDialogOpen}
				onOpenChange={setIsConfirmDialogOpen}
				title="Подтверждение удаления"
				description="Вы уверены, что хотите удалить этого поставщика? Это действие нельзя отменить."
				onConfirm={confirmDelete}
				confirmText="Удалить"
				cancelText="Отмена"
			/>
		</div>
	);
};

export default Suppliers;