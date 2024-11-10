import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Response } from "@/lib/response";
import { Form, Link, useActionData } from "react-router-dom";

export default function LoginPage() {
  const response = useActionData() as Response<string> | null;

  return (
    <>
      <div className="container mx-auto py-1 px-2">
        <h1 className="text-3xl text-center font-bold mb-5">Login</h1>
        <Form method="post" className="grid gap-5">
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
        </Form>
        <div className="mt-5 text-center">
          <Link to="/signup">don't have account</Link>
        </div>
      </div>
      <>
        {response && (
          <div className="w-full text-center p-1 bg-red-500 absolute left-0 bottom-0">
            {response.msg}
          </div>
        )}
      </>
    </>
  );
}
