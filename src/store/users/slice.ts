import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: UserId;
}

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Juan Pérez",
		email: "juan@example.com",
		github: "juanperez",
	},
	{
		id: "2",
		name: "María Gómez",
		email: "maria@example.com",
		github: "mariagomez",
	},
	{
		id: "3",
		name: "Carlos Rodríguez",
		email: "carlos@example.com",
		github: "carlosrodriguez",
	},
];

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	if (persistedState) return JSON.parse(persistedState).users;
	return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			state.push({ id, ...action.payload });
		},
		modifyUser: (state, action: PayloadAction<UserWithId>) => {
			const modifiedUser = action.payload;
			return state.map((user) =>
				user.id === modifiedUser.id ? modifiedUser : user,
			);
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);
			if (!isUserAlreadyDefined) {
				state.push(action.payload);
			}
		},
	},
});

export default usersSlice.reducer;

export const { deleteUserById, addNewUser, rollbackUser, modifyUser } =
	usersSlice.actions;
