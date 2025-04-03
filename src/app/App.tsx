import {
	RouterProvider,
} from "react-router";
import {router} from "./routes.tsx";
import {ThemeProvider} from "./ThemeProvider";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/queryClient.ts";
import {Toaster} from "react-hot-toast";


function App() {
	return <>
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<Toaster position="bottom-right"
				/>
				<RouterProvider router={router}/>
			</QueryClientProvider>
		</ThemeProvider>
	</>
}

export default App
