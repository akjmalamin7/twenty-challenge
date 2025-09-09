import { redirect } from "next/navigation";

export default function LoginForm() {
  const login = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await fetch("https://api.dwxapp.store/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Invalid email or password");
    }

    const data = await res.json();
    console.log("✅ Login Success:", data);
    redirect("/dashboard");
  };

  return (
    <div className="max-w-[400px] mx-auto">
      <form action={login} className="flex flex-col gap-4">
        <input
          className="px-4 py-2 rounded border"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="px-4 py-2 rounded border"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button className="px-4 py-2 bg-black text-white rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
