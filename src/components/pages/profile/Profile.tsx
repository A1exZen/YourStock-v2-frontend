// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useUser, useUpdateUser } from "@/hooks/useUser";
// import { useAuthStore } from "@/store/useAuthStore.ts";
// import toast from "react-hot-toast";
//
// const profileSchema = z.object({
// 	username: z.string().min(1, "Имя пользователя обязательно"),
// 	password: z.string().optional(),
// });
//
// type ProfileFormValues = z.infer<typeof profileSchema>;
//
// export const Profile = () => {
// 	const { data: user, isLoading, error } = useUser();
// 	const {userId} = useAuthStore();
// 	const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
//
// 	const [isEditing, setIsEditing] = useState(false);
//
// 	const form = useForm<ProfileFormValues>({
// 		resolver: zodResolver(profileSchema),
// 		defaultValues: {
// 			username: "",
// 			password: "",
// 		},
// 	});
//
// 	if (user && !isEditing) {
// 		form.reset({
// 			username: user?.username,
// 			password: "",
// 		});
// 	}
//
// 	const onSubmit = (values: ProfileFormValues) => {
// 		updateUser(values, {
// 			onSuccess: () => {
// 				toast.success("Профиль успешно обновлён");
// 				setIsEditing(false);
// 			},
// 			onError: (error) => {
// 				toast.error(error.message || "Не удалось обновить профиль");
// 			},
// 		});
// 	};
//
// 	if (!userId) {
// 		return <p className="text-center text-foreground">Пожалуйста, войдите в аккаунт, чтобы просмотреть профиль.</p>;
// 	}
//
// 	if (isLoading) return <p className="text-center text-foreground">Загрузка...</p>;
// 	if (error) return <p className="text-red-500 text-center">Ошибка: {(error as Error).message}</p>;
//
// 	return (
// 		<div className="p-4 max-w-2xl mx-auto">
// 			<h1 className="text-3xl font-bold text-foreground mb-6">Мой профиль</h1>
// 			<div className="bg-background rounded-lg shadow-lg border border-border p-6">
// 				{!isEditing ? (
// 					<div className="space-y-4">
// 						<div>
// 							<Label className="text-sm font-medium">Имя пользователя</Label>
// 							<p className="text-foreground">{user?.username}</p>
// 						</div>
// 						<div>
// 							<Label className="text-sm font-medium">Роль</Label>
// 							<p className="text-foreground">{user?.role}</p>
// 						</div>
// 						<div>
// 							<Label className="text-sm font-medium">Сотрудник</Label>
// 							<p className="text-foreground">
// 								{user?.employee?.personalDetails?.firstName} {user?.employee?.personalDetails?.lastName}
// 							</p>
// 						</div>
// 						<div>
// 							<Label className="text-sm font-medium">Должность</Label>
// 							<p className="text-foreground">{user?.employee?.position}</p>
// 						</div>
// 						<div>
// 							<Label className="text-sm font-medium">Email</Label>
// 							<p className="text-foreground">{user?.employee?.personalDetails?.email || "—"}</p>
// 						</div>
// 						<div>
// 							<Label className="text-sm font-medium">Телефон</Label>
// 							<p className="text-foreground">{user?.employee?.personalDetails?.phoneNumber || "—"}</p>
// 						</div>
// 						<div>
// 							<Label className="text-sm font-medium">Город</Label>
// 							<p className="text-foreground">{user?.employee?.personalDetails?.city || "—"}</p>
// 						</div>
// 						<Button
// 							onClick={() => setIsEditing(true)}
// 							className="bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all duration-200"
// 						>
// 							Редактировать
// 						</Button>
// 					</div>
// 				) : (
// 					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
// 						<div>
// 							<Label htmlFor="username" className="mb-2 block text-sm font-medium">
// 								Имя пользователя
// 							</Label>
// 							<Input
// 								id="username"
// 								{...form.register("username")}
// 								className="border-border bg-background text-foreground focus:ring-2 focus:ring-primary transition-all duration-200"
// 							/>
// 							{form.formState.errors.username && (
// 								<p className="text-red-500 text-sm mt-1">{form.formState.errors.username.message}</p>
// 							)}
// 						</div>
// 						<div>
// 							<Label htmlFor="password" className="mb-2 block text-sm font-medium">
// 								Новый пароль (оставьте пустым, чтобы не менять)
// 							</Label>
// 							<Input
// 								id="password"
// 								type="password"
// 								{...form.register("password")}
// 								className="border-border bg-background text-foreground focus:ring-2 focus:ring-primary transition-all duration-200"
// 							/>
// 						</div>
// 						<div className="flex gap-3">
// 							<Button
// 								type="submit"
// 								disabled={isUpdating}
// 								className="bg-primary hover:bg-primary/90 text-white shadow-sm hover:shadow-md transition-all duration-200"
// 							>
// 								{isUpdating ? "Сохранение..." : "Сохранить"}
// 							</Button>
// 							<Button
// 								type="button"
// 								variant="outline"
// 								onClick={() => setIsEditing(false)}
// 								className="shadow-sm hover:shadow-md transition-all duration-200"
// 							>
// 								Отмена
// 							</Button>
// 						</div>
// 					</form>
// 				)}
// 			</div>
// 		</div>
// 	);
// };
//
// export default Profile;



export const Profile = () => {
	return (
		<div>Profile</div>
	)
}
