export default function LoadingState() {
  return (
    <div className="flex min-h-[300px] items-center justify-center px-6">
      <div className="text-center">

        {/* Spinner */}
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dfe5ff] border-t-[#03045e]" />

        <h2 className="mt-5 text-lg font-semibold text-[#03045e]">
          Finding your stay
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Please wait while we load the results.
        </p>

      </div>
    </div>
  );
}