import {
	RouterProvider,
} from "react-router";
import {router} from "./routes.tsx";
import {ThemeProvider} from "./ThemeProvider";


function App() {
	return <>
		<ThemeProvider>
			<RouterProvider router={router}/>
		</ThemeProvider>
	</>
}

export default App
