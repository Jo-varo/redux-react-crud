import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import useUsersAction from "../hooks/useUsersAction";

export default function CreateNewUser() {
	const { addUser } = useUsersAction();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setResult(null);
		const form = evt.currentTarget;
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			return setResult("ko");
		}

		addUser({ name, email, github });
		setResult("ok");
		form.reset();
	};

	return (
		<Card className="mt-4">
			<Title>Create new user</Title>
			<form onSubmit={handleSubmit}>
				<TextInput placeholder="Nombre" name="name" />
				<TextInput placeholder="Email" name="email" />
				<TextInput placeholder="Usuario de Github" name="github" />
				<div>
					<Button type="submit" className="mt-4">
						Crear usuario
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
