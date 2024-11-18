import { EyeIcon, EyeOffIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Response } from "@/lib/response";
import { useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";

export default function LoginPage() {
  const [toggle, setToggle] = useState(false);
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
            <div className="flex items-center">
            <Input
              id="password"
              className="mt-1"
              name="password"
              placeholder="Enter your password"
              type={toggle ? "password" : "text"}
              required
            />
              <div className="m-2 cursor-pointer" onClick={() => setToggle(!toggle)}>
              {toggle ? <EyeIcon/> : <EyeOffIcon/>}
              </div>
            </div>
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
