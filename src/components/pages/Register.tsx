import {Link} from "react-router";
import {Button} from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

import stockImg from '@/assets/stock.jpg'


const formSchema = z.object({
	email: z.string().email("Неверный формат email"),
	password: z.string().min(8, "Пароль должен содержать минимум 8 символов").max(50, "Пароль не должен превышать 50 символов"),
	passwordConfirm: z.string()
});

export const Register = () => {

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {email: "", password: "", passwordConfirm: ""},
	});



	return (
		<div className="relative mt-5 sm:mt-10 overflow-hidden">
			<div className="relative flex items-center justify-center p-4">
				<div
					className="flex flex-col gap-10 md:flex-row max-w-5xl overflow-hidden">
					<div className="relative md:w-1/2 h-96 md:h-auto">

						<img src={stockImg} alt="Background"
						     className="w-full h-full object-cover rounded-xl"/>


						<div className="absolute inset-0 bg-black/30 rounded-xl"></div>
					</div>
					<div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
						<div className="mb-4 flex items-center">
							<div className="text-3xl font-black" style={{fontWeight: 900}}>Добро пожаловать!</div>
						</div>
						<p className="text-sm sm:text-base mb-6 text-gray-600">Всё что
							нужно для Вашего производства!</p>
						<Form {...form}>
							<form
							      className="flex flex-col gap-4">
								<FormField
									control={form.control}
									name="email"
									render={({field, fieldState}) => (
										<FormItem>
											<FormLabel
												className="text-sm sm:text-base text-gray-500">Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													placeholder="example@email.com"
													{...field}
													className={`w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 ${fieldState.error ? "border-red-500" : ""}`}
												/>
											</FormControl>
											<FormMessage
												className="text-xs sm:text-sm text-red-500 mt-1">{fieldState.error?.message}</FormMessage>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({field, fieldState}) => (
										<FormItem>
											<FormLabel
												className="text-sm sm:text-base text-gray-500">Пароль</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder="********"
													{...field}
													className={`w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 ${fieldState.error ? "border-red-500" : ""}`}
												/>
											</FormControl>
											<FormMessage
												className="text-xs sm:text-sm text-red-500 mt-1">{fieldState.error?.message}</FormMessage>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="passwordConfirm"
									render={({field, fieldState}) => (
										<FormItem>
											<FormLabel
												className="text-sm sm:text-base text-gray-500">Подтверждение пароля</FormLabel>
											<FormControl>
												<Input
													type="password"
													placeholder="********"
													{...field}
													className={`w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 ${fieldState.error ? "border-red-500" : ""}`}
												/>
											</FormControl>
											<FormMessage
												className="text-xs sm:text-sm text-red-500 mt-1">{fieldState.error?.message}</FormMessage>
										</FormItem>
									)}
								/>
								<Button
									type="submit"
									className="w-full mt-4 bg-teal-800 hover:bg-teal-900 text-white font-medium py-2 rounded-lg transition-colors duration-200"
								>
									Регистрация
								</Button>
								<div className="flex items-center my-2">
									<div className="flex-grow border-t border-gray-300"></div>
									<span className="px-3 text-gray-500 text-sm">Или</span>
									<div className="flex-grow border-t border-gray-300"></div>
								</div>
							</form>
						</Form>
						<div className="mt-4 text-center text-xs sm:text-sm text-gray-600">
							Уже есть аккаунт? <Link to="/login"
							                        className="text-teal-600 hover:underline">Авторизация</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;