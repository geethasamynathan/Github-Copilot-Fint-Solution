/**
 * LoadingSpinner Component
 * Display loading state while data is being fetched
 */
const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
      </div>
      <p className="text-gray-600 font-medium">Loading appointments...</p>
      <p className="text-gray-400 text-sm mt-2">Please wait</p>
    </div>
  );
};

export default LoadingSpinner;
