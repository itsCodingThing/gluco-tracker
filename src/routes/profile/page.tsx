import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authProvider } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold mb-4">Profile</h1>
      <div className="p-4">
        <Card>
          <CardContent className="p-0 grid grid-cols-3 gap-1">
            <div className="col-spans-1">
              <img src="https://picsum.photos/200" className="rounded-lg" />
            </div>
            <div className="col-spans-2">
              <p>Name: Bhanu</p>
              <p>Age: 25</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="px-3 mt-[100px]">
        <Button
          className="w-full h-8"
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
