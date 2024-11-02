import { LoaderCircleIcon } from "@/components/icons";

export default function Loader() {
  return (
    <div className="w-full h-10 flex justify-center items-center">
      <LoaderCircleIcon className="animate-spin" />
    </div>
  );
}
