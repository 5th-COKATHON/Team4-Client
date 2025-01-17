import LoadingAnimation from "@/components/LoadingAnimation";

const GlobalFallback = () => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <LoadingAnimation />
    </div>
  );
};

export default GlobalFallback;
