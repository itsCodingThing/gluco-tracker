import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signin } from "@/lib/auth";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-1 px-2">
      <h1 className="text-3xl text-center font-bold mb-5">Login</h1>
      <form
        className="grid gap-5"
        onSubmit={async (e) => {
          e.preventDefault();
          const formdata = new FormData(e.currentTarget);

          await signin({
            email: (formdata.get("email") as string) ?? "",
            password: (formdata.get("password") as string) ?? "",
          });
          navigate("/profile");
        }}
      >
        <div>
          <Label htmlFor="name">Email</Label>
          <Input
            id="name"
            className="mt-1"
            name="email"
            placeholder="Enter your email"
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
        <Button type="submit">Login</Button>
      </form>
      <Link className="mt-4" to="/signup">
        don't have account
      </Link>
    </div>
  );
}
