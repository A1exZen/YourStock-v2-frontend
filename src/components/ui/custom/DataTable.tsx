import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {AnimatePresence, AnimatePresencem, motion} from "framer-motion";
import {ArrowDown, ArrowUp, ArrowUpDown} from "lucide-react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	                                         columns,
	                                         data
                                         }: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState("");

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: (row, columnId, filterValue) => {
			const values = Object.values(row.original as object).join(" ").toLowerCase();
			return values.includes(filterValue.toLowerCase());
		},
		state: {
			sorting,
			columnFilters,
			globalFilter,
		},
	});

	return (
		<div className="px-4">
			{/* Глобальный поиск */}
			<div className="flex items-center py-4">
				<Input
					placeholder="Поиск по всем полям..."
					value={globalFilter ?? ""}
					onChange={(event) => setGlobalFilter(event.target.value)}
					className="max-w-sm border-border shadow-sm focus:ring-2 focus:ring-primary transition-all duration-200"
				/>
			</div>
			{/* Таблица */}
			<div className="rounded-md border border-border shadow-lg">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="bg-muted/50">
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id} className="text-center font-semibold text-foreground">
										{header.isPlaceholder ? null : (
											<div
												className={
													header.column.getCanSort()
														? "cursor-pointer select-none flex items-center justify-center gap-1"
														: ""
												}
												onClick={header.column.getToggleSortingHandler()}
											>
												{flexRender(header.column.columnDef.header, header.getContext())}
												{header.column.getCanSort() && (
													<span className="text-sm">
                            {header.column.getIsSorted() === "asc" ? (
	                            <ArrowUp className="w-4 h-4" />
                            ) : header.column.getIsSorted() === "desc" ? (
	                            <ArrowDown className="w-4 h-4" />
                            ) : (
	                            <ArrowUpDown className="w-4 h-4" />
                            )}
                          </span>
												)}
											</div>
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						<AnimatePresence>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row, index) => (
									<motion.tr
										key={row.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
										className={`border-b border-border ${
											index % 2 === 0 ? "bg-background" : "bg-muted/20"
										} hover:bg-muted/50 transition-colors duration-200`}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id} className="text-center py-4">
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</motion.tr>
								))
							) : (
								<TableRow>
									<TableCell colSpan={columns.length} className="h-24 text-center text-foreground">
										Нет данных.
									</TableCell>
								</TableRow>
							)}
						</AnimatePresence>
					</TableBody>
				</Table>
			</div>
			{/* Пагинация */}
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					className="shadow-sm hover:shadow-md transition-shadow duration-200"
				>
					Назад
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
					className="shadow-sm hover:shadow-md transition-shadow duration-200"
				>
					Далее
				</Button>
				<span className="flex items-center gap-1 text-sm text-foreground">
          <div>Страница</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}
          </strong>
        </span>
				<select
					value={table.getState().pagination.pageSize}
					onChange={(e) => {
						table.setPageSize(Number(e.target.value));
					}}
					className="mx-2 text-sm border border-border rounded-md p-1 bg-background text-foreground focus:ring-2 focus:ring-primary transition-all duration-200"
				>
					{[5, 10, 15, 20, 25].map((pageSize) => (
						<option key={pageSize} value={pageSize} className="text-foreground bg-background">
							Показать {pageSize}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}