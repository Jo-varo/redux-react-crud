import {
	addNewUser,
	deleteUserById,
	modifyUser,
	type UserId,
	type UserWithId,
} from "../store/users/slice";
import { useAppDispatch } from "./store";

export default function useUsersAction() {
	const dispatch = useAppDispatch();

	const addUser = ({
		name,
		email,
		github,
	}: { name: string; email: string; github: string }) => {
		dispatch(addNewUser({ name, email, github }));
	};

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	const editUser = (user: UserWithId) => {
		dispatch(modifyUser(user));
	};

	return { removeUser, addUser, editUser };
}
