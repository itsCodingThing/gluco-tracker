import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authProvider } from "@/lib/auth";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import useSWRMutation from "swr/mutation";
import { LoaderCircleIcon } from "@/components/icons";

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { trigger, error, isMutating } = useSWRMutation(
    "/api/user/login",
    (_, { arg }: { arg: z.output<typeof LoginFormSchema> }) =>
      authProvider.signin(arg),
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center font-bold mb-5">Login</h1>
      <form
        className="flex flex-col gap-5 px-5"
        onSubmit={async (e) => {
          e.preventDefault();

          const formdata = new FormData(e.currentTarget);
          const payload = Object.fromEntries(formdata.entries());
          const result = LoginFormSchema.safeParse(payload);

          if (result.success) {
            await trigger(result.data);
            navigate("/profile");
          }
        }}
      >
        <Label>
          Email
          <Input
            disabled={isMutating}
            className="mt-1"
            name="email"
            placeholder="Enter your email"
          />
        </Label>
        <Label>
          Password
          <Input
            disabled={isMutating}
            className="mt-1"
            name="password"
            placeholder="Enter your password"
          />
        </Label>
        <Button type="submit" disabled={isMutating}>
          {isMutating ? <LoaderCircleIcon className="animate-spin" /> : "Login"}
        </Button>
      </form>
      {error && (
        <p className="bg-red-500 mt-5 p-3 fixed bottom-0 w-full">
          Failed to login
        </p>
      )}
    </div>
  );
}
