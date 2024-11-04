import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/auth";
import { Link, useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-1 px-2">
      <h1 className="text-3xl text-center font-bold mb-5">Signup</h1>
      <form
        className="grid gap-5"
        onSubmit={async (e) => {
          e.preventDefault();
          const formdata = new FormData(e.currentTarget);

          await signup({
            name: (formdata.get("name") as string) ?? "",
            email: (formdata.get("email") as string) ?? "",
            password: (formdata.get("password") as string) ?? "",
          });
          navigate("/profile");
        }}
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            className="mt-1"
            name="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            className="mt-1"
            name="email"
            placeholder="Enter your email"
            type="email"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            className="mt-1"
            name="password"
            placeholder="Enter your password"
            type="password"
            required
          />
        </div>
        <Button type="submit">Signup</Button>
      </form>
      <Link className="mt-4" to="/login">
        already have a account
      </Link>
    </div>
  );
}
