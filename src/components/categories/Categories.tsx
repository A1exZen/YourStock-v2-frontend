// src/components/pages/categories/Categories.tsx

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
	useCategories,
	useCreateCategory,
	useUpdateCategory,
	useDeleteCategory,
} from "@/hooks/useCategory";
import { Category } from "@/types/entitiesTypes";
import { Edit, Trash, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ConfirmDialog } from "@/components/ui/custom/ConfirmDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categorySchema = z.object({
	name: z.string().min(1, "Название обязательно"),
	type: z.enum(["PRODUCT", "MATERIAL"]),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export const Categories = () => {
	const { data: categories = [], isLoading, error } = useCategories();
	const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
	const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
	const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingCategory, setEditingCategory] = useState<Category | null>(null);
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
	const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
	const [filterType, setFilterType] = useState<"ALL" | "PRODUCT" | "MATERIAL">("ALL");

	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: "",
			type: "MATERIAL",
		},
	});

	const onSubmit = (values: CategoryFormValues) => {
		if (editingCategory) {
			updateCategory(
				{ id: editingCategory.id, data: values },
				{
					onSuccess: () => {
						toast.success("Категория успешно обновлена");
						setIsDialogOpen(false);
						setEditingCategory(null);
						form.reset();
					},
					onError: (error) => {
						toast.error(error.message || "Не удалось обновить категорию");
					},
				}
			);
		} else {
			createCategory(values, {
				onSuccess: () => {
					toast.success("Категория успешно создана");
					setIsDialogOpen(false);
					form.reset();
				},
				onError: (error) => {
					toast.error(error.message || "Не удалось создать категорию");
				},
			});
		}
	};

	const handleEdit = (category: Category) => {
		setEditingCategory(category);
		form.reset(category);
		setIsDialogOpen(true);
	};

	const handleDelete = (id: number) => {
		setCategoryToDelete(id);
		setIsConfirmDialogOpen(true);
	};

	const confirmDelete = () => {
		if (categoryToDelete !== null) {
			deleteCategory(categoryToDelete, {
				onSuccess: () => {
					toast.success("Категория успешно удалена");
				},
				onError: (error) => {
					toast.error(error.message || "Не удалось удалить категорию");
				},
			});
			setCategoryToDelete(null);
		}
	};

	const filteredCategories = categories.filter((category) =>
		filterType === "ALL" ? true : category.type === filterType
	);

	return (
		<div className="p-6 max-w-7xl mx-auto">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold text-foreground">Категории</h1>
					<div className="flex items-center space-x-4">
						<Select
							onValueChange={(value) =>
								setFilterType(value as "ALL" | "PRODUCT" | "MATERIAL")
							}
							defaultValue="ALL"
						>
							<SelectTrigger className="w-[180px] bg-background border-border text-foreground focus:ring-primary focus:border-primary transition-all duration-200">
								<SelectValue placeholder="Фильтр по типу" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="ALL">Все</SelectItem>
								<SelectItem value="MATERIAL">Материалы</SelectItem>
								<SelectItem value="PRODUCT">Продукты</SelectItem>
							</SelectContent>
						</Select>
						<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
							<DialogTrigger asChild>
								<Button
									onClick={() => {
										setEditingCategory(null);
										setIsDialogOpen(true);
									}}
									disabled={isCreating || isUpdating}
									className="bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-2"
								>
									<Plus className="h-4 w-4" />
									<span>Добавить категорию</span>
								</Button>
							</DialogTrigger>
							<AnimatePresence>
								{isDialogOpen && (
									<DialogContent className="bg-background text-foreground rounded-lg shadow-xl max-w-md">
										<motion.div
											initial={{ opacity: 0, scale: 0.95 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.95 }}
											transition={{ duration: 0.3 }}
										>
											<DialogHeader>
												<DialogTitle className="text-xl font-semibold">
													{editingCategory ? "Редактировать категорию" : "Добавить категорию"}
												</DialogTitle>
												<DialogDescription>
													{editingCategory
														? "Измените данные категории и сохраните изменения."
														: "Заполните форму, чтобы добавить новую категорию."}
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
														<p className="text-red-500 text-sm mt-1">
															{form.formState.errors.name.message}
														</p>
													)}
												</div>
												<div>
													<Label htmlFor="type" className="mb-2 block text-sm font-medium">
														Тип
													</Label>
													<Select
														onValueChange={(value) =>
															form.setValue("type", value as "PRODUCT" | "MATERIAL")
														}
														defaultValue={editingCategory?.type || "MATERIAL"}
													>
														<SelectTrigger className="w-full bg-background border-border text-foreground focus:ring-primary focus:border-primary transition-all duration-200">
															<SelectValue placeholder="Выберите тип" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="MATERIAL">Материалы</SelectItem>
															<SelectItem value="PRODUCT">Продукты</SelectItem>
														</SelectContent>
													</Select>
												</div>
												<Button
													type="submit"
													disabled={isCreating || isUpdating}
													className="w-full bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all duration-200"
												>
													{editingCategory
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
				</div>

				{isLoading ? (
					<p className="text-center text-foreground">Загрузка...</p>
				) : error ? (
					<p className="text-red-500 text-center">Ошибка: {(error as Error).message}</p>
				) : filteredCategories.length === 0 ? (
					<p className="text-center text-muted-foreground">
						Нет категорий для отображения.
					</p>
				) : (
					<motion.div
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ staggerChildren: 0.1 }}
					>
						<AnimatePresence>
							{filteredCategories.map((category) => (
								<motion.div
									key={category.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3 }}
									className={`relative p-6 rounded-lg shadow-lg border border-border transition-all duration-300 hover:shadow-xl ${
										category.type === "MATERIAL"
											? "bg-gradient-to-br from-blue-50 to-blue-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800"
											: "bg-gradient-to-br from-green-50 to-green-100 dark:bg-gradient-to-br dark:from-teal-950 dark:to-gray-950"
									}`}
								>
									<div className="absolute top-4 right-4 flex space-x-2">
										<Button
											variant="ghost"
											size="icon"
											onClick={() => handleEdit(category)}
											className="h-8 w-8 rounded-full hover:bg-muted/50"
										>
											<Edit className="h-4 w-4 text-foreground" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => handleDelete(category.id)}
											className="h-8 w-8 rounded-full hover:bg-red-100/50"
										>
											<Trash className="h-4 w-4 text-red-600" />
										</Button>
									</div>
									<h3 className="text-lg font-semibold text-foreground mb-2">
										{category.name}
									</h3>
									<p className="text-sm text-muted-foreground">
										Создано: {new Date(category.createdAt).toLocaleDateString()}
									</p>
									<div className="mt-4">
                    <span
	                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
		                    category.type === "MATERIAL"
			                    ? "bg-blue-200 text-blue-800"
			                    : "bg-green-200 text-green-800"
	                    }`}
                    >
                      {category.type === "MATERIAL" ? "Материалы" : "Продукты"}
                    </span>
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>
				)}
				<ConfirmDialog
					open={isConfirmDialogOpen}
					onOpenChange={setIsConfirmDialogOpen}
					title="Подтверждение удаления"
					description="Вы уверены, что хотите удалить эту категорию? Это действие нельзя отменить."
					onConfirm={confirmDelete}
					confirmText="Удалить"
					cancelText="Отмена"
				/>
			</motion.div>
		</div>
	);
};

export default Categories;