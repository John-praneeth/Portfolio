
import { useLoading } from "../context/loadingContext";
import Loading from "./Loading";

// Wrapper component to access useLoading and conditionally render it 
const LoadingOverlay = () => {
  const { isLoading, progress } = useLoading();
  return <>{isLoading && <Loading percent={progress} />}</>;
};

export default LoadingOverlay;
