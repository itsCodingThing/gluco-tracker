import { Button } from "@/components/ui/button";
import { authProvider } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto min-h-svh">
      <h1 className="text-xl font-bold mb-4">profile page</h1>
      <div className="px-3 mt-[100px]">
        <Button
          className="w-full"
          onClick={() => {
            authProvider.signout().then(() => {
              navigate("/login");
            });
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
