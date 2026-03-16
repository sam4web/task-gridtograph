import { createFileRoute } from "@tanstack/react-router";
import { type SubmitEvent, useId, useState } from "react";
import { env } from "~/config/env";

export const Route = createFileRoute("/auth")({
  component: AuthComponent,
});

// TODO:
// * Setup Tanstack form
// * Email + Password validation using Zod
// * Different routes for login and register
// * Create _auth pathless layout route

function AuthComponent() {
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    const res = await fetch(`${env.VITE_API_BASE_URL}/api/auth/logindf`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "Application/json; charset=UTF-8",
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
    }
  };

  return (
    <div>
      <h1>Login + Register Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={emailFieldId}>Email</label>
          <input
            id={emailFieldId}
            name="email"
            type="email"
            className="border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={passwordFieldId}>Password</label>
          <input
            id={passwordFieldId}
            name="password"
            type="password"
            className="border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
