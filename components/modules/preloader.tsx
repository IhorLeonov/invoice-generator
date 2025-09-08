import { Spinner } from "../ui/spinner";

type PreloaderProps = {};

export default function Preloader({}: PreloaderProps) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Spinner />
    </div>
  );
}
