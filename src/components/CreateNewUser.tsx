import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import useUsersAction from "../hooks/useUsersAction";
import type { UserWithId } from "../store/users/slice";

interface Props {
	userBeingEdited: UserWithId | null;
	setUserToModify: (user: UserWithId | null) => void;
}

export default function CreateNewUser({
	userBeingEdited,
	setUserToModify,
}: Props) {
	const { addUser, editUser } = useUsersAction();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setResult(null);
		const form = evt.currentTarget;
		const formData = new FormData(form);

		const name = (formData.get("name") as string) || userBeingEdited?.name;
		const email = (formData.get("email") as string) || userBeingEdited?.email;
		const github =
			(formData.get("github") as string) || userBeingEdited?.github;

		if (!name || !email || !github) {
			return setResult("ko");
		}

		if (userBeingEdited) {
			editUser({ ...userBeingEdited, email, github, name });
			setUserToModify(null);
		} else {
			addUser({ name, email, github });
		}

		setResult("ok");
		form.reset();
	};

	return (
		<Card className="mt-4">
			<Title>{userBeingEdited ? "Edit" : "Create new"} user</Title>
			<form onSubmit={handleSubmit}>
				<TextInput
					placeholder={userBeingEdited ? userBeingEdited.name : "Nombre"}
					name="name"
				/>
				<TextInput
					placeholder={userBeingEdited ? userBeingEdited.email : "Email"}
					name="email"
				/>
				<TextInput
					placeholder={
						userBeingEdited ? userBeingEdited.github : "Usuario de Github"
					}
					name="github"
				/>
				<div>
					<Button type="submit" className="mt-4">
						{userBeingEdited ? "Editar" : "Crear"} usuario
					</Button>
					<span className="inline-block ml-2">
						{result === "ok" && <Badge color="green">Guardado</Badge>}
						{result === "ko" && <Badge color="red">Campos invalidos</Badge>}
					</span>
				</div>
			</form>
		</Card>
	);
}
