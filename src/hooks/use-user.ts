import { useLocalStorage } from "react-use";

interface UserData {
  name: string;
  img: string;
  id: string;
  email: string;
}

export default function useUser(): { user?: UserData } {
  const [data] = useLocalStorage<UserData>("user", {
    name: "",
    img: "",
    id: "",
    email: "",
  });

  return { user: data };
}
