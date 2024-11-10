import { Button } from "@/components/ui/button";
import { LogOutIcon } from "@/components/icons";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "@/components/loader";
import { signout } from "@/backend/auth";
import PageTransition from "@/components/page-transition.tsx";
import ProfileTab from "./profile-tab";

const ProfileCard = lazy(() => import("./profile-card.tsx"));

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="container mx-auto p-4 space-y-6">
        <Suspense fallback={<Loader />}>
          <ProfileCard />
        </Suspense>

        <ProfileTab />

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
        {/*   <Card> */}
        {/*     <CardHeader> */}
        {/*       <CardTitle>Emergency Contact</CardTitle> */}
        {/*     </CardHeader> */}
        {/*     <CardContent> */}
        {/*       <p> */}
        {/*         <strong>Name:</strong> Jane Doe */}
        {/*       </p> */}
        {/*       <p> */}
        {/*         <strong>Relationship:</strong> Spouse */}
        {/*       </p> */}
        {/*       <p> */}
        {/*         <strong>Phone:</strong> +1 (555) 987-6543 */}
        {/*       </p> */}
        {/*     </CardContent> */}
        {/*   </Card> */}
        {/* </div> */}

        <div className="flex justify-end space-x-4">
          <Button
            onClick={async () => {
              await signout();
              navigate("/login");
            }}
          >
            <LogOutIcon className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
