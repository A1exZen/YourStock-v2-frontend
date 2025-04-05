import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
	onConfirm: () => void;
	onCancel?: () => void;
	confirmText?: string;
	cancelText?: string;
}

export function ConfirmDialog({
	                              open,
	                              onOpenChange,
	                              title,
	                              description,
	                              onConfirm,
	                              onCancel,
	                              confirmText = "Подтвердить",
	                              cancelText = "Отмена",
                              }: ConfirmDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<AnimatePresence>
				{open && (
					<DialogContent className="bg-background text-foreground rounded-lg shadow-xl max-w-sm">
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.3 }}
						>
							<DialogHeader>
								<DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
								<DialogDescription className="text-foreground/70">
									{description}
								</DialogDescription>
							</DialogHeader>
							<div className="flex justify-end gap-3 mt-6">
								<Button
									variant="outline"
									onClick={() => {
										onCancel?.();
										onOpenChange(false);
									}}
									className="shadow-sm hover:shadow-md transition-all duration-200"
								>
									{cancelText}
								</Button>
								<Button
									variant="destructive"
									onClick={() => {
										onConfirm();
										onOpenChange(false);
									}}
									className="shadow-sm hover:shadow-md transition-all duration-200"
								>
									{confirmText}
								</Button>
							</div>
						</motion.div>
					</DialogContent>
				)}
			</AnimatePresence>
		</Dialog>
	);
}