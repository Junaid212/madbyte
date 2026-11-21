import { Loader } from "@/components/layout/Loader";

export default function Loading() {
  return (
    <div className="grid min-h-svh place-items-center bg-navy" role="status" aria-label="Loading">
      <Loader />
    </div>
  );
}
