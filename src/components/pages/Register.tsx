// src/pages/Register.tsx
import {Link} from "react-router";
import {Button} from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import stockImg from "@/assets/stock.jpg";
import {useRegister} from "@/hooks/useAuth";

const formSchema = z
	.object({
		username: z
			.string()
			.min(3, "Имя пользователя должно содержать минимум 3 символа")
			.max(20, "Имя пользователя не должно превышать 20 символов"),
		email: z.string().email("Неверный формат email"),
		password: z
			.string()
			.min(8, "Пароль должен содержать минимум 8 символов")
			.max(50, "Пароль не должен превышать 50 символов"),
		passwordConfirm: z.string(),
		phoneNumber: z
			.string()
			.regex(/\+?[0-9]{10,15}/, "Неверный формат номера телефона"),
		firstName: z.string().min(1, "Имя обязательно"),
		lastName: z.string().min(1, "Фамилия обязательна"),
		city: z.string().min(1, "Город обязателен"),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Пароли должны совпадать",
		path: ["passwordConfirm"],
	});

type RegisterFormValues = z.infer<typeof formSchema>;

export const Register = () => {
	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			passwordConfirm: "",
			phoneNumber: "",
			firstName: "",
			lastName: "",
			city: "",
		},
	});

	const {mutate: register, isPending, error} = useRegister();

	const onSubmit = (values: RegisterFormValues) => {
		register({
			username: values.username,
			email: values.email,
			password: values.password,
			phoneNumber: values.phoneNumber,
			firstName: values.firstName,
			lastName: values.lastName,
			city: values.city,
			position: "Employee",
			role: "EMPLOYEE",
		});
	};

	return (
		<div className="relative mt-5 sm:mt-10 overflow-hidden">
			<div className="relative flex items-center justify-center p-4">
				<div
					className="flex flex-col gap-10 md:flex-row max-w-6xl overflow-hidden">
					<div className="relative md:w-1/2 h-96 md:h-auto">
						<img
							src={stockImg}
							alt="Background"
							className="w-full h-full object-cover rounded-xl"
						/>
						<div className="absolute inset-0 bg-black/30 rounded-xl"></div>
					</div>
					<div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
						<div className="mb-2 flex items-center">
							<div className="text-3xl font-black" style={{fontWeight: 900}}>
								Добро пожаловать!
							</div>
						</div>
						<p className="text-sm sm:text-base mb-6 text-gray-600">
							Всё что нужно для Вашего производства!
						</p>
						{error && (
							<div className="text-red-500 text-sm mb-4">{error.message}</div>
						)}
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="flex flex-col gap-3"
							>
								<div className='flex justify-between gap-4'>
									<FormField
										control={form.control}
										name="username"
										render={({field, fieldState}) => (
											<FormItem className='flex-1'>
												<FormLabel
													className="text-sm sm:text-base text-gray-500">
													Имя пользователя
												</FormLabel>
												<FormControl>
													<Input
														placeholder="username"
														{...field}
														className={`w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 ${
															fieldState.error ? "border-red-500" : ""
														}`}
													/>
												</FormControl>
												<FormMessage
													className="text-xs sm:text-sm text-red-500 mt-1">
													{fieldState.error?.message}
												</FormMessage>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="email"
										render={({field, fieldState}) => (
											<FormItem className='flex-1'>
												<FormLabel
													className="text-sm sm:text-base text-gray-500">
													Email
												</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="example@email.com"
														{...field}
														className={`w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 ${
															fieldState.error ? "border-red-500" : ""
														}`}
													/>
												</FormControl>
												<FormMessage
													className="text-xs sm:text-sm text-red-500 mt-1">
													{fieldState.error?.message}
												</FormMessage>
											</FormItem>
										)}
									/>
								</div>
								<div className='flex justify-between gap-4'>
									<FormField
										control={form.control}
										name="password"
										render={({field, fieldState}) => (
											<FormItem className='flex-1'>
												<FormLabel
													className="text-sm sm:text-base text-gray-500">
													Пароль
												</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder="********"
														{...field}
														className={`w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 ${
															fieldState.error ? "border-red-500" : ""
														}`}
													/>
												</FormControl>
												<FormMessage
													className="text-xs sm:text-sm text-red-500 mt-1">
													{fieldState.error?.message}
												</FormMessage>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="passwordConfirm"
										render={({field, fieldState}) => (
											<FormItem className='flex-1'>
												<FormLabel
													className="text-sm sm:text-base text-gray-500">
													Подтверждение пароля
												</FormLabel>
												<FormControl>
													<Input
														type="password"
														placeholder="********"
														{...field}
														className={`w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 ${
															fieldState.error ? "border-red-500" : ""
														}`}
													/>
												</FormControl>
												<FormMessage
													className="text-xs sm:text-sm text-red-500 mt-1">
													{fieldState.error?.message}
												</FormMessage>
											</FormItem>
										)}
									/>
								</div>

								<div className='flex justify-between gap-4'>
									<FormField
										control={form.control}
										name="firstName"
										render={({field, fieldState}) => (
											<FormItem className='flex-1'>
												<FormLabel
													className="text-sm sm:text-base text-gray-500">
													Имя
												</FormLabel>
												<FormControl>
													<Input
														placeholder="Имя"
														{...field}
														className={`w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 ${
															fieldState.error ? "border-red-500" : ""
														}`}
													/>
												</FormControl>
												<FormMessage
													className="text-xs sm:text-sm text-red-500 mt-1">
													{fieldState.error?.message}
												</FormMessage>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="lastName"
										render={({field, fieldState}) => (
											<FormItem className='flex-1'>
												<FormLabel
													className="text-sm sm:text-base text-gray-500">
													Фамилия
												</FormLabel>
												<FormControl>
													<Input
														placeholder="Фамилия"
														{...field}
														className={`w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 ${
															fieldState.error ? "border-red-500" : ""
														}`}
													/>
												</FormControl>
												<FormMessage
													className="text-xs sm:text-sm text-red-500 mt-1">
													{fieldState.error?.message}
												</FormMessage>
											</FormItem>
										)}
									/>
								</div>
								<div className='flex justify-between gap-4'>
									<FormField
										control={form.control}
										name="city"
										render={({field, fieldState}) => (
											<FormItem className='flex-1'>
												<FormLabel
													className="text-sm sm:text-base text-gray-500">
													Город
												</FormLabel>
												<FormControl>
													<Input
														placeholder="Город"
														{...field}
														className={`w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 ${
															fieldState.error ? "border-red-500" : ""
														}`}
													/>
												</FormControl>
												<FormMessage
													className="text-xs sm:text-sm text-red-500 mt-1">
													{fieldState.error?.message}
												</FormMessage>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="phoneNumber"
										render={({field, fieldState}) => (
											<FormItem className='flex-1'>
												<FormLabel
													className="text-sm sm:text-base text-gray-500">
													Номер телефона
												</FormLabel>
												<FormControl>
													<Input
														placeholder="+1234567890"
														{...field}
														className={`w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 ${
															fieldState.error ? "border-red-500" : ""
														}`}
													/>
												</FormControl>
												<FormMessage
													className="text-xs sm:text-sm text-red-500 mt-1">
													{fieldState.error?.message}
												</FormMessage>
											</FormItem>
										)}
									/>
								</div>
								<Button
									type="submit"
									disabled={isPending}
									className="w-full mt-4 bg-teal-800 hover:bg-teal-900 text-white font-medium py-2 rounded-lg transition-colors duration-200"
								>
									{isPending ? "Регистрация..." : "Регистрация"}
								</Button>
								<div className="flex items-center my-2">
									<div className="flex-grow border-t border-gray-300"></div>
									<span className="px-3 text-gray-500 text-sm">Или</span>
									<div className="flex-grow border-t border-gray-300"></div>
								</div>
							</form>
						</Form>
						<div className="mt-4 text-center text-xs sm:text-sm text-gray-600">
							Уже есть аккаунт?{" "}
							<Link to="/login" className="text-teal-600 hover:underline">
								Авторизация
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;