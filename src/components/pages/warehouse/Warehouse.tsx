// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import {
// 	Table,
// 	TableBody,
// 	TableCell,
// 	TableHead,
// 	TableHeader,
// 	TableRow,
// } from "@/components/ui/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
// import {
// 	useMaterials,
// 	useAddMaterialStock,
// 	useRemoveMaterialStock
// } from "@/hooks/useMaterials";
// import {
// 	useProducts,
// 	useProduceProduct,
// 	useRemoveProductStock,
// } from "@/hooks/useProducts";
// import { useCategories } from "@/hooks/useCategories";
// import { useWarehouseTransactions } from "@/hooks/useWarehouseTransactions";
// import { format } from "date-fns";
//
// export const Warehouse = () => {
// 	const [selectedTab, setSelectedTab] = useState("materials");
// 	const [materialCategory, setMaterialCategory] = useState("");
// 	const [productCategory, setProductCategory] = useState("");
// 	const [materialSearch, setMaterialSearch] = useState("");
// 	const [productSearch, setProductSearch] = useState("");
// 	const [transactionFilters, setTransactionFilters] = useState({
// 		type: "",
// 		materialId: undefined as number | undefined,
// 		productId: undefined as number | undefined,
// 		employeeId: undefined as number | undefined,
// 		startDate: "",
// 		endDate: "",
// 	});
//
// 	const { data: materials, isLoading: materialsLoading } = useMaterials();
//
// 	const { data: products, isLoading: productsLoading } =  useProducts();
//
// 	const { data: categories, isLoading: categoriesLoading } = useCategories();
//
// 	const { data: transactions, isLoading: transactionsLoading } = useWarehouseTransactions(transactionFilters);
//
// 	const addMaterialStock = useAddMaterialStock();
// 	const removeMaterialStock = useRemoveMaterialStock();
// 	const produceProduct = useProduceProduct();
// 	const removeProductStock = useRemoveProductStock();
//
// 	const [materialDialog, setMaterialDialog] = useState({ open: false, id: 0, quantity: 0, unit: "", action: "" });
// 	const [productDialog, setProductDialog] = useState({ open: false, id: 0, quantity: 0, action: "" });
//
// 	if (materialsLoading || productsLoading || categoriesLoading || transactionsLoading) {
// 		return <p className="text-center text-foreground">Загрузка...</p>;
// 	}
//
// 	return (
// 		<div className="p-4 max-w-7xl mx-auto">
// 			<h1 className="text-3xl font-bold text-foreground mb-6">Склад</h1>
// 			<Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
// 				<TabsList>
// 					<TabsTrigger value="materials">Материалы</TabsTrigger>
// 					<TabsTrigger value="products">Продукты</TabsTrigger>
// 					<TabsTrigger value="transactions">Транзакции</TabsTrigger>
// 				</TabsList>
//
// 				{/* Вкладка "Материалы" */}
// 				<TabsContent value="materials">
// 					<div className="flex gap-4 mb-4">
// 						<div className="flex-1">
// 							<Label>Поиск по имени</Label>
// 							<Input
// 								placeholder="Введите название материала"
// 								value={materialSearch}
// 								onChange={(e) => setMaterialSearch(e.target.value)}
// 							/>
// 						</div>
// 						<div className="flex-1">
// 							<Label>Фильтр по категории</Label>
// 							<Select value={materialCategory} onValueChange={setMaterialCategory}>
// 								<SelectTrigger>
// 									<SelectValue placeholder="Выберите категорию" />
// 								</SelectTrigger>
// 								<SelectContent>
// 									<SelectItem value="">Все категории</SelectItem>
// 									{categories?.map((category) => (
// 										<SelectItem key={category.id} value={category.id.toString()}>
// 											{category.name}
// 										</SelectItem>
// 									))}
// 								</SelectContent>
// 							</Select>
// 						</div>
// 					</div>
// 					<Table>
// 						<TableHeader>
// 							<TableRow>
// 								<TableHead>Название</TableHead>
// 								<TableHead>Категория</TableHead>
// 								<TableHead>Поставщик</TableHead>
// 								<TableHead>Цена</TableHead>
// 								<TableHead>Количество</TableHead>
// 								<TableHead>Мин. количество</TableHead>
// 								<TableHead>Ед. измерения</TableHead>
// 								<TableHead>Действия</TableHead>
// 							</TableRow>
// 						</TableHeader>
// 						<TableBody>
// 							{materials?.map((material) => (
// 								<TableRow key={material.id}>
// 									<TableCell>{material.name}</TableCell>
// 									<TableCell>{material.category.name}</TableCell>
// 									<TableCell>{material.supplier.name}</TableCell>
// 									<TableCell>{material.price}</TableCell>
// 									<TableCell
// 										className={
// 											material.quantity < material.minimumQuantity ? "text-red-500" : "text-foreground"
// 										}
// 									>
// 										{material.quantity}
// 									</TableCell>
// 									<TableCell>{material.minimumQuantity}</TableCell>
// 									<TableCell>{material.unit}</TableCell>
// 									<TableCell>
// 										<Dialog
// 											open={materialDialog.open && materialDialog.id === material.id}
// 											onOpenChange={(open) =>
// 												setMaterialDialog({ ...materialDialog, open, id: material.id })
// 											}
// 										>
// 											<DialogTrigger asChild>
// 												<Button
// 													variant="outline"
// 													onClick={() =>
// 														setMaterialDialog({
// 															open: true,
// 															id: material.id,
// 															quantity: 0,
// 															unit: material.unit,
// 															action: "add",
// 														})
// 													}
// 												>
// 													Добавить
// 												</Button>
// 											</DialogTrigger>
// 											<DialogContent>
// 												<DialogHeader>
// 													<DialogTitle>Добавить материал: {material.name}</DialogTitle>
// 												</DialogHeader>
// 												<div className="space-y-4">
// 													<div>
// 														<Label>Количество</Label>
// 														<Input
// 															type="number"
// 															value={materialDialog.quantity}
// 															onChange={(e) =>
// 																setMaterialDialog({
// 																	...materialDialog,
// 																	quantity: Number(e.target.value),
// 																})
// 															}
// 														/>
// 													</div>
// 													<Button
// 														onClick={() => {
// 															addMaterialStock.mutate({
// 																id: material.id,
// 																quantity: materialDialog.quantity,
// 																unit: materialDialog.unit,
// 															});
// 															setMaterialDialog({ ...materialDialog, open: false });
// 														}}
// 													>
// 														Добавить
// 													</Button>
// 												</div>
// 											</DialogContent>
// 										</Dialog>
// 										<Dialog
// 											open={materialDialog.open && materialDialog.id === material.id && materialDialog.action === "remove"}
// 											onOpenChange={(open) =>
// 												setMaterialDialog({ ...materialDialog, open, id: material.id })
// 											}
// 										>
// 											<DialogTrigger asChild>
// 												<Button
// 													variant="outline"
// 													onClick={() =>
// 														setMaterialDialog({
// 															open: true,
// 															id: material.id,
// 															quantity: 0,
// 															unit: material.unit,
// 															action: "remove",
// 														})
// 													}
// 												>
// 													Списать
// 												</Button>
// 											</DialogTrigger>
// 											<DialogContent>
// 												<DialogHeader>
// 													<DialogTitle>Списать материал: {material.name}</DialogTitle>
// 												</DialogHeader>
// 												<div className="space-y-4">
// 													<div>
// 														<Label>Количество</Label>
// 														<Input
// 															type="number"
// 															value={materialDialog.quantity}
// 															onChange={(e) =>
// 																setMaterialDialog({
// 																	...materialDialog,
// 																	quantity: Number(e.target.value),
// 																})
// 															}
// 														/>
// 													</div>
// 													<Button
// 														onClick={() => {
// 															removeMaterialStock.mutate({
// 																id: material.id,
// 																quantity: materialDialog.quantity,
// 																unit: materialDialog.unit,
// 															});
// 															setMaterialDialog({ ...materialDialog, open: false });
// 														}}
// 													>
// 														Списать
// 													</Button>
// 												</div>
// 											</DialogContent>
// 										</Dialog>
// 									</TableCell>
// 								</TableRow>
// 							))}
// 						</TableBody>
// 					</Table>
// 				</TabsContent>
//
// 				{/* Вкладка "Продукты" */}
// 				<TabsContent value="products">
// 					<div className="flex gap-4 mb-4">
// 						<div className="flex-1">
// 							<Label>Поиск по имени</Label>
// 							<Input
// 								placeholder="Введите название продукта"
// 								value={productSearch}
// 								onChange={(e) => setProductSearch(e.target.value)}
// 							/>
// 						</div>
// 						<div className="flex-1">
// 							<Label>Фильтр по категории</Label>
// 							<Select value={productCategory} onValueChange={setProductCategory}>
// 								<SelectTrigger>
// 									<SelectValue placeholder="Выберите категорию" />
// 								</SelectTrigger>
// 								<SelectContent>
// 									<SelectItem value="">Все категории</SelectItem>
// 									{categories?.map((category) => (
// 										<SelectItem key={category.id} value={category.id.toString()}>
// 											{category.name}
// 										</SelectItem>
// 									))}
// 								</SelectContent>
// 							</Select>
// 						</div>
// 					</div>
// 					<Table>
// 						<TableHeader>
// 							<TableRow>
// 								<TableHead>Название</TableHead>
// 								<TableHead>Описание</TableHead>
// 								<TableHead>Категория</TableHead>
// 								<TableHead>Цена</TableHead>
// 								<TableHead>Количество</TableHead>
// 								<TableHead>Ед. измерения</TableHead>
// 								<TableHead>Действия</TableHead>
// 							</TableRow>
// 						</TableHeader>
// 						<TableBody>
// 							{products?.map((product) => (
// 								<TableRow key={product.id}>
// 									<TableCell>{product.name}</TableCell>
// 									<TableCell>{product.description}</TableCell>
// 									<TableCell>{product.category.name}</TableCell>
// 									<TableCell>{product.price}</TableCell>
// 									<TableCell>{product.quantity}</TableCell>
// 									<TableCell>{product.unit}</TableCell>
// 									<TableCell>
// 										<Dialog
// 											open={productDialog.open && productDialog.id === product.id}
// 											onOpenChange={(open) =>
// 												setProductDialog({ ...productDialog, open, id: product.id })
// 											}
// 										>
// 											<DialogTrigger asChild>
// 												<Button
// 													variant="outline"
// 													onClick={() =>
// 														setProductDialog({
// 															open: true,
// 															id: product.id,
// 															quantity: 0,
// 															action: "produce",
// 														})
// 													}
// 												>
// 													Произвести
// 												</Button>
// 											</DialogTrigger>
// 											<DialogContent>
// 												<DialogHeader>
// 													<DialogTitle>Произвести продукт: {product.name}</DialogTitle>
// 												</DialogHeader>
// 												<div className="space-y-4">
// 													<div>
// 														<Label>Количество</Label>
// 														<Input
// 															type="number"
// 															value={productDialog.quantity}
// 															onChange={(e) =>
// 																setProductDialog({
// 																	...productDialog,
// 																	quantity: Number(e.target.value),
// 																})
// 															}
// 														/>
// 													</div>
// 													<Button
// 														onClick={() => {
// 															produceProduct.mutate({
// 																id: product.id,
// 																quantity: productDialog.quantity,
// 															});
// 															setProductDialog({ ...productDialog, open: false });
// 														}}
// 													>
// 														Произвести
// 													</Button>
// 												</div>
// 											</DialogContent>
// 										</Dialog>
// 										<Dialog
// 											open={productDialog.open && productDialog.id === product.id && productDialog.action === "remove"}
// 											onOpenChange={(open) =>
// 												setProductDialog({ ...productDialog, open, id: product.id })
// 											}
// 										>
// 											<DialogTrigger asChild>
// 												<Button
// 													variant="outline"
// 													onClick={() =>
// 														setProductDialog({
// 															open: true,
// 															id: product.id,
// 															quantity: 0,
// 															action: "remove",
// 														})
// 													}
// 												>
// 													Списать
// 												</Button>
// 											</DialogTrigger>
// 											<DialogContent>
// 												<DialogHeader>
// 													<DialogTitle>Списать продукт: {product.name}</DialogTitle>
// 												</DialogHeader>
// 												<div className="space-y-4">
// 													<div>
// 														<Label>Количество</Label>
// 														<Input
// 															type="number"
// 															value={productDialog.quantity}
// 															onChange={(e) =>
// 																setProductDialog({
// 																	...productDialog,
// 																	quantity: Number(e.target.value),
// 																})
// 															}
// 														/>
// 													</div>
// 													<Button
// 														onClick={() => {
// 															removeProductStock.mutate({
// 																id: product.id,
// 																quantity: productDialog.quantity,
// 															});
// 															setProductDialog({ ...productDialog, open: false });
// 														}}
// 													>
// 														Списать
// 													</Button>
// 												</div>
// 											</DialogContent>
// 										</Dialog>
// 									</TableCell>
// 								</TableRow>
// 							))}
// 						</TableBody>
// 					</Table>
// 				</TabsContent>
//
// 				{/* Вкладка "Транзакции" */}
// 				<TabsContent value="transactions">
// 					<div className="flex gap-4 mb-4">
// 						<div className="flex-1">
// 							<Label>Тип транзакции</Label>
// 							<Select
// 								value={transactionFilters.type}
// 								onValueChange={(value) =>
// 									setTransactionFilters({ ...transactionFilters, type: value })
// 								}
// 							>
// 								<SelectTrigger>
// 									<SelectValue placeholder="Выберите тип" />
// 								</SelectTrigger>
// 								<SelectContent>
// 									<SelectItem value="">Все типы</SelectItem>
// 									<SelectItem value="INCOMING">Приход</SelectItem>
// 									<SelectItem value="OUTGOING">Расход</SelectItem>
// 									<SelectItem value="PRODUCED">Производство</SelectItem>
// 								</SelectContent>
// 							</Select>
// 						</div>
// 						<div className="flex-1">
// 							<Label>Материал</Label>
// 							<Select
// 								value={transactionFilters.materialId?.toString()}
// 								onValueChange={(value) =>
// 									setTransactionFilters({
// 										...transactionFilters,
// 										materialId: value ? Number(value) : undefined,
// 									})
// 								}
// 							>
// 								<SelectTrigger>
// 									<SelectValue placeholder="Выберите материал" />
// 								</SelectTrigger>
// 								<SelectContent>
// 									<SelectItem value="">Все материалы</SelectItem>
// 									{materials?.map((material) => (
// 										<SelectItem key={material.id} value={material.id.toString()}>
// 											{material.name}
// 										</SelectItem>
// 									))}
// 								</SelectContent>
// 							</Select>
// 						</div>
// 						<div className="flex-1">
// 							<Label>Продукт</Label>
// 							<Select
// 								value={transactionFilters.productId?.toString()}
// 								onValueChange={(value) =>
// 									setTransactionFilters({
// 										...transactionFilters,
// 										productId: value ? Number(value) : undefined,
// 									})
// 								}
// 							>
// 								<SelectTrigger>
// 									<SelectValue placeholder="Выберите продукт" />
// 								</SelectTrigger>
// 								<SelectContent>
// 									<SelectItem value="">Все продукты</SelectItem>
// 									{products?.map((product) => (
// 										<SelectItem key={product.id} value={product.id.toString()}>
// 											{product.name}
// 										</SelectItem>
// 									))}
// 								</SelectContent>
// 							</Select>
// 						</div>
// 						<div className="flex-1">
// 							<Label>Дата начала</Label>
// 							<Input
// 								type="datetime-local"
// 								value={transactionFilters.startDate}
// 								onChange={(e) =>
// 									setTransactionFilters({ ...transactionFilters, startDate: e.target.value })
// 								}
// 							/>
// 						</div>
// 						<div className="flex-1">
// 							<Label>Дата окончания</Label>
// 							<Input
// 								type="datetime-local"
// 								value={transactionFilters.endDate}
// 								onChange={(e) =>
// 									setTransactionFilters({ ...transactionFilters, endDate: e.target.value })
// 								}
// 							/>
// 						</div>
// 					</div>
// 					<Table>
// 						<TableHeader>
// 							<TableRow>
// 								<TableHead>Тип</TableHead>
// 								<TableHead>Материал</TableHead>
// 								<TableHead>Продукт</TableHead>
// 								<TableHead>Количество</TableHead>
// 								<TableHead>Ед. измерения</TableHead>
// 								<TableHead>Сотрудник</TableHead>
// 								<TableHead>Дата</TableHead>
// 							</TableRow>
// 						</TableHeader>
// 						<TableBody>
// 							{transactions?.map((transaction) => (
// 								<TableRow key={transaction.id}>
// 									<TableCell>{transaction.type}</TableCell>
// 									<TableCell>{transaction.material?.name || "—"}</TableCell>
// 									<TableCell>{transaction.product?.name || "—"}</TableCell>
// 									<TableCell>{transaction.quantity}</TableCell>
// 									<TableCell>{transaction.unit}</TableCell>
// 									<TableCell>
// 										{transaction.employee.personalDetails.firstName} {transaction.employee.personalDetails.lastName}
// 									</TableCell>
// 									<TableCell>{format(new Date(transaction.createdAt), "dd.MM.yyyy HH:mm")}</TableCell>
// 								</TableRow>
// 							))}
// 						</TableBody>
// 					</Table>
// 				</TabsContent>
// 			</Tabs>
// 		</div>
// 	);
// };


import React from 'react'

export const Warehouse = () => {
	return (
		<div>Warehouse</div>
	)
}
