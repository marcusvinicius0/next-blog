import { ImSpinner } from "react-icons/im";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl h-full">Loading...</p>
      <ImSpinner size={20} className="animate-spin" />
    </div>
  );
}
