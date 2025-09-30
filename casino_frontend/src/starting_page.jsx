import { Link } from "react-router-dom";

export default function StartingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-500">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Casino App</h1>
      <p className="mb-6">Please sign up or log in to continue.</p>

      <div className="space-x-4">
        <button>
        <Link
          to="/signup"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          Sign Up
        </Link>
        </button>


        <button className="bg-blue-500 text-white">
        <Link
          to="/login"
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          Login
        </Link>
        </button>
      </div>
      <div className="h-screen bg-red-500 flex items-center justify-center">
        <h1 className="text-white text-4xl">If this is red, colors work ✅</h1>
       </div>
    </div>
  );
}
