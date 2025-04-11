import {useState} from "react";
import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {User} from "@/types/entitiesTypes.ts";
import {MoreHorizontal} from "lucide-react";
import {ColumnDef} from "@tanstack/react-table";
import toast from "react-hot-toast";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {motion, AnimatePresence} from "framer-motion";
import {useDeleteUser, useUpdateUser, useUsers} from "@/hooks/useUser";
import {DataTable} from "@/components/ui/custom/DataTable.tsx";
import {ConfirmDialog} from "@/components/ui/custom/ConfirmDialog.tsx";

const userSchema = z.object({
	username: z.string().min(1, "Имя пользователя обязательно"),
	role: z.enum(["ADMIN", "MANAGER", "USER"]),
});

type UserFormValues = z.infer<typeof userSchema>;

export const Users = () => {
	const {data: users = [], isLoading, error} = useUsers();
	const {mutate: updateUser, isPending: isUpdating} = useUpdateUser();
	const {mutate: deleteUser, isPending} = useDeleteUser();

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
	const [userToDelete, setUserToDelete] = useState<number | null>(null);
	const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);

	const form = useForm<UserFormValues>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			username: "",
			role: "USER",
		},
	});

	const onSubmit = (values: UserFormValues) => {
		if (editingUser) {
			updateUser(
				{id: editingUser.id, data: values},
				{
					onSuccess: () => {
						toast.success("Пользователь успешно обновлён");
						setIsDialogOpen(false);
						setEditingUser(null);
						form.reset();
					},
					onError: (error) => {
						toast.error(error.message || "Не удалось обновить пользователя");
					},
				}
			);
		}
	};

	const handleEdit = (user: User) => {
		setEditingUser(user);
		form.reset(user);
		setIsDialogOpen(true);
	};

	const handleShowMore = (user: User) => {
		setSelectedUser(user);
		setIsProfileModalOpen(true);
	};

	const handleDelete = (id: number) => {
		setUserToDelete(id);
		setIsConfirmDialogOpen(true);
	};

	const confirmDelete = () => {
		if (userToDelete !== null) {
			deleteUser(userToDelete, {
				onSuccess: () => {
					toast.success("Пользователь успешно удалён");
				},
				onError: (error) => {
					toast.error("Не удалось удалить пользователя");
				},
			});
			setUserToDelete(null);
		}
	};

	const columns: ColumnDef<User>[] = [
		{
			accessorKey: "username",
			header: "Имя пользователя",
			cell: ({row}) => <div
				className="text-center">{row.getValue("username") || "—"}</div>,
			enableSorting: true,
			enableColumnFilter: true,
		},
		{
			accessorKey: "employee.personalDetails.email",
			header: "Email",
			cell: ({row}) => <div
				className="text-center">{row.original.employee?.personalDetails?.email || "—"}</div>,
			enableSorting: true,
			enableColumnFilter: true,
		},

		{
			accessorKey: "employee.personalDetails.firstName",
			header: "Имя",
			cell: ({row}) => (
				<div
					className="text-center">{row.original.employee?.personalDetails?.firstName || "—"}</div>
			),
			enableSorting: true,
			enableColumnFilter: true,
		},
		{
			accessorKey: "employee.personalDetails.lastName",
			header: "Фамилия",
			cell: ({row}) => (
				<div
					className="text-center">{row.original.employee?.personalDetails?.lastName || "—"}</div>
			),
			enableSorting: true,
			enableColumnFilter: true,
		},
		{
			accessorKey: "role",
			header: "Роль",
			cell: ({row}) => <div
				className="text-center">{row.getValue("role")}</div>,
			enableSorting: true,
			enableColumnFilter: true,
		},
		{
			id: "actions",
			header: () => <div className="text-center">Действия</div>,
			cell: ({row}) => (
				<div className="flex justify-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost"
							        className="h-8 w-8 p-0 hover:bg-muted/50 transition-colors duration-200">
								<span className="sr-only">Открыть меню</span>
								<MoreHorizontal className="h-4 w-4"/>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="bg-background border border-border p-2 rounded-md flex flex-col gap-1 shadow-lg"
						>
							<motion.div
								initial={{opacity: 0, y: -10}}
								animate={{opacity: 1, y: 0}}
								transition={{duration: 0.2}}
							>
								<DropdownMenuItem
									onClick={() => handleShowMore(row.original)}
									className="cursor-pointer px-3 py-1.5 rounded-md hover:bg-muted/50 transition-colors duration-200"
								>
									Показать больше
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
				<h1 className="text-3xl font-bold text-foreground">Пользователи</h1>
			</div>
			{isLoading ? (
				<p className="text-center text-foreground">Загрузка...</p>
			) : error ? (
				<p
					className="text-red-500 text-center">Ошибка: {(error as Error).message}</p>
			) : users.length === 0 ? (
				<p className="text-center text-foreground">Нет пользователей для
					отображения.</p>
			) : (
				<div
					className="rounded-lg shadow-lg border border-border overflow-hidden">
					<DataTable columns={columns} data={users}/>
				</div>
			)}

			<AnimatePresence>
				{isProfileModalOpen && selectedUser && (
					<motion.div
						initial={{x: "100%", opacity: 0}}
						animate={{x: 0, opacity: 1}}
						exit={{x: "100%", opacity: 0}}
						transition={{type: "spring", stiffness: 300, damping: 30}}
						className="fixed inset-y-0 right-0 sm:w-96 w-full bg-gradient-to-b from-background to-background/95 border-l border-border shadow-2xl z-50 overflow-y-auto"
					>
						<div className="p-6">
							{/* Header */}
							<div className="flex justify-between items-center mb-6">
								<h2
									className="text-xl font-bold text-foreground bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
									Профиль пользователя
								</h2>
								<Button
									variant="ghost"
									onClick={() => setIsProfileModalOpen(false)}
									className="text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-full p-1"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</Button>
							</div>

							<div className="flex flex-col items-center mb-6">
								<div
									className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2 shadow-md">
            <span className="text-4xl font-semibold text-primary">
              {selectedUser.username.charAt(0).toUpperCase()}
            </span>
								</div>
								<h3
									className="text-xl font-semibold text-foreground">{selectedUser.username}</h3>
								<span
									className="text-sm text-muted-foreground mt-1 px-3 py-1 rounded-full bg-primary/10 text-primary">
            {selectedUser.role}
          </span>
							</div>

							<div className="space-y-6">
								<div className="border-t border-border pt-4">
									<h3
										className="text-lg font-semibold text-foreground mb-4 flex items-center">
										<span className="w-1 h-5 bg-primary mr-2 rounded"></span>
										Общие данные
									</h3>
									<div className="space-y-2">
										<div
											className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
											<span
												className="font-medium text-foreground w-24">Имя:</span>
											<span className="text-foreground">
                  {selectedUser.employee?.personalDetails?.firstName || "—"}
                </span>
										</div>
										<div
											className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
											<span
												className="font-medium text-foreground w-24">Фамилия:</span>
											<span className="text-foreground">
                  {selectedUser.employee?.personalDetails?.lastName || "—"}
                </span>
										</div>
										<div
											className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
											<span
												className="font-medium text-foreground w-24">Email:</span>
											<span className="text-foreground">
                  {selectedUser.employee?.personalDetails?.email || "—"}
                </span>
										</div>
										<div
											className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
											<span
												className="font-medium text-foreground w-24">Телефон:</span>
											<span className="text-foreground">
                  {selectedUser.employee?.personalDetails?.phoneNumber || "—"}
                </span>
										</div>
										<div
											className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
											<span
												className="font-medium text-foreground w-24">Город:</span>
											<span className="text-foreground">
                  {selectedUser.employee?.personalDetails?.city || "—"}
                </span>
										</div>
										<div
											className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
											<span
												className="font-medium text-foreground w-24">Должность:</span>
											<span
												className="text-foreground">{selectedUser.employee?.position || "—"}</span>
										</div>
									</div>
								</div>

								<div className="border-t border-border pt-4">
									<h3
										className="text-lg font-semibold text-foreground mb-3 flex items-center">
										<span className="w-1 h-5 bg-primary mr-2 rounded"></span>
										Дополнительно
									</h3>
									<div
										className="flex items-center space-x-3 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
										<span className="font-medium text-foreground w-32">Дата создания:</span>
										<span className="text-foreground">
                {selectedUser.createdAt
	                ? new Date(selectedUser.createdAt).toLocaleDateString()
	                : "—"}
              </span>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{isProfileModalOpen && (
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 0.5}}
						exit={{opacity: 0}}
						transition={{duration: 0.3}}
						className="fixed inset-0 bg-black z-40"
						onClick={() => setIsProfileModalOpen(false)}
					/>
				)}
			</AnimatePresence>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<AnimatePresence>
					{isDialogOpen && (
						<DialogContent
							className="bg-background text-foreground rounded-lg shadow-xl max-w-md">
							<motion.div
								initial={{opacity: 0, scale: 0.95}}
								animate={{opacity: 1, scale: 1}}
								exit={{opacity: 0, scale: 0.95}}
								transition={{duration: 0.3}}
							>
								<DialogHeader>
									<DialogTitle className="text-xl font-semibold">
										Редактировать пользователя
									</DialogTitle>
									<DialogDescription>
										Измените данные пользователя и сохраните изменения.
									</DialogDescription>
								</DialogHeader>
								<form onSubmit={form.handleSubmit(onSubmit)}
								      className="space-y-4">
									<div>
										<Label htmlFor="username"
										       className="mb-2 block text-sm font-medium">
											Имя пользователя
										</Label>
										<Input
											id="username"
											{...form.register("username")}
											className="border-border bg-background text-foreground focus:ring-2 focus:ring-primary transition-all duration-200"
										/>
										{form.formState.errors.username && (
											<p
												className="text-red-500 text-sm mt-1">{form.formState.errors.username.message}</p>
										)}
									</div>
									<div>
										<Label htmlFor="role"
										       className="mb-2 block text-sm font-medium">
											Роль
										</Label>
										<select
											id="role"
											{...form.register("role")}
											className="w-full border rounded p-2 bg-background text-foreground focus:ring-2 focus:ring-primary transition-all duration-200"
										>
											<option value="ADMIN">Администратор</option>
											<option value="MANAGER">Менеджер</option>
											<option value="USER">Пользователь</option>
										</select>
									</div>
									<Button
										type="submit"
										disabled={isUpdating}
										className="w-full bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all duration-200"
									>
										{isUpdating ? "Сохранение..." : "Сохранить"}
									</Button>
								</form>
							</motion.div>
						</DialogContent>
					)}
				</AnimatePresence>
			</Dialog>
			<ConfirmDialog
				open={isConfirmDialogOpen}
				onOpenChange={setIsConfirmDialogOpen}
				title="Подтверждение удаления"
				description="Вы уверены, что хотите удалить этого пользователя? Это действие нельзя отменить."
				onConfirm={confirmDelete}
				confirmText="Удалить"
				cancelText="Отмена"
			/>
		</div>
	);
};

export default Users;