import {
	Tuple,
	configureStore,
	type Middleware,
	type PayloadAction,
} from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersReducer, {
	rollbackUser,
	type UserId,
	type UserWithId,
} from "./users/slice";

const persistanceLocalStorageMiddleWare: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload: userIdToRemove } = action as PayloadAction<UserId>;
		const previousState = store.getState() as { users: UserWithId[] };

		next(action);
		if (type === "users/deleteUserById") {
			const userToRemove = previousState.users.find(
				(user) => user.id === userIdToRemove,
			);
			fetch(
				`https://jsonplaceholder.typicode.comssds/users/${userIdToRemove}`,
				{
					method: "DELETE",
				},
			)
				.then((res) => {
					if (res.ok) toast.success("Eliminado correctamente");
				})
				.catch((error) => {
					toast.error(`Error al eliminar usuario ${userIdToRemove}`);
					if (userToRemove) store.dispatch(rollbackUser(userToRemove));
					console.log(error);
				});
		}
	};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: () =>
		new Tuple(persistanceLocalStorageMiddleWare, syncWithDatabaseMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
