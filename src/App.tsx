import { useState } from "react";
import { Toaster } from "sonner";
import "./App.css";
import CreateNewUser from "./components/CreateNewUser";
import { ListOfUsers } from "./components/ListOfUsers";
import type { UserWithId } from "./store/users/slice";

function App() {
	const [userBeingEdited, setUserBeingEdited] = useState<UserWithId | null>(
		null,
	);

	const setUserToModify = (user: UserWithId | null) => {
		setUserBeingEdited(user);
	};

	return (
		<>
			<ListOfUsers setUserToModify={setUserToModify} />
			<CreateNewUser
				userBeingEdited={userBeingEdited}
				setUserToModify={setUserToModify}
			/>
			<Toaster richColors />
		</>
	);
}

export default App;
