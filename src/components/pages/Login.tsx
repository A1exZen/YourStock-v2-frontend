import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {Input} from "@/components/ui/input.tsx";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import stockImg from '@/assets/stock.jpg'
import {useLogin} from "@/hooks/useAuth.ts";



const formSchema = z.object({
	username: z
		.string()
		.min(3, "Имя пользователя должно содержать минимум 3 символа")
		.max(20, "Имя пользователя не должно превышать 20 символов"),
	password: z
		.string()
		.min(6, "Пароль должен содержать минимум 6 символов")
		.max(50, "Пароль не должен превышать 50 символов"),
});
type LoginFormValues = z.infer<typeof formSchema>;

export const Login = () => {
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: { username: "", password: "" },
	});

	const { mutate: login, isPending } = useLogin();

	const onSubmit = (values: LoginFormValues) => {
		login(values);
	};


	return (
		<div className="relative mt-5 sm:mt-10 overflow-hidden">
			<div className="flex items-center justify-center p-4">
				<div className="flex flex-col gap-10 md:flex-row max-w-5xl overflow-hidden">
					<div className="relative md:w-1/2 h-96 md:h-auto">
						<img src={stockImg} alt="Background"
						     className="w-full h-full object-cover rounded-xl"/>
						<div className="absolute inset-0 bg-black/30 rounded-xl"></div>
					</div>
					<div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
						<div className="mb-4 flex items-center">
							<div className="text-3xl font-black" style={{fontWeight: 900}}>С возвращением!</div>
						</div>
						<p className="text-sm sm:text-base mb-10 text-gray-600">Войдите в свой аккаунт c помощью логина и пароля</p>
						<Form {...form} >
							<form onSubmit={form.handleSubmit(onSubmit)}  className="flex flex-col gap-4">
								<FormField
									control={form.control}
									name="username"
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel className="text-sm sm:text-base text-gray-500">Имя пользователя</FormLabel>
											<FormControl>
												<Input
													type="text"
													placeholder="username"
													{...field}
													className={`w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 ${fieldState.error ? "border-red-500" : ""}`}
												/>
											</FormControl>
											<FormMessage className="text-xs sm:text-sm text-red-500 mt-1">{fieldState.error?.message}</FormMessage>
										</FormItem>
									)}
								/>
								<FormField
									name="password"
									render={({field, fieldState}) => (
										<FormItem>
											<FormLabel className="text-sm sm:text-base text-gray-500">Пароль</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder="********"
													{...field}
													className={`w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 ${fieldState.error ? "border-red-500" : ""}`}
												/>
											</FormControl>
											<FormMessage className="text-xs sm:text-sm text-red-500 mt-1">{fieldState.error?.message}</FormMessage>
										</FormItem>
									)}
								/>
								<Button
									type="submit"
									disabled={isPending}
									className="w-full mt-4 bg-teal-800 hover:bg-teal-900 text-white font-medium py-2 rounded-lg transition-colors duration-200"
								>
									Авторизация
								</Button>
								<div className="flex items-center my-4">
									<div className="flex-grow border-t border-gray-300"></div>
									<span className="px-3 text-gray-500 text-sm">Или</span>
									<div className="flex-grow border-t border-gray-300"></div>
								</div>
							</form>
						</Form>
						<div className="mt-6 text-center text-xs sm:text-sm text-gray-600">
							Нет аккаунта? <Link to="/register" className="text-teal-600 hover:underline">Регистрация</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;