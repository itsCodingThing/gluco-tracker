import { useFirstMountState, useNetworkState } from "react-use";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const timeout = 3;
export default function NetworkStatus() {
  const isFirstMounted = useFirstMountState();
  const network = useNetworkState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isFirstMounted) setShow(true);

    if (network.online) {
      const t = setTimeout(() => {
        setShow(false);
      }, timeout * 1000);

      return () => {
        clearTimeout(t);
      };
    }
  }, [network.online, isFirstMounted]);

  return (
    <div
      className={cn(
        "py-1 text-center font-bold flex justify-center items-center",
        {
          "bg-green-500": network.online,
          "bg-red-500": !network.online,
          hidden: !show,
        },
      )}
    >
      App is {network.online ? "online" : "offline"}
    </div>
  );
}
