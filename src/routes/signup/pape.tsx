import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "@/components/icons";
import { useState } from "react";
import { Form, Link } from "react-router-dom";

export default function SignupPage() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="container mx-auto py-1 px-2">
      <h1 className="text-3xl text-center font-bold mb-5">Signup</h1>
      <Form method="post" className="grid gap-5">
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
              {toggle ? <EyeIcon /> : <EyeOffIcon />}
            </div>
          </div>
        </div>
        <Button type="submit">Signup</Button>
      </Form>
      <div className="mt-4 text-center">
        <Link to="/login">already have a account</Link>
      </div>
    </div>
  );
}
