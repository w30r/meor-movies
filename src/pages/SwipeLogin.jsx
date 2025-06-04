import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SwipeLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  return (
    <div className="bg-pink-200 flex items-center justify-center p-6 rounded-lg shadow-lg flex-col ">
      <h1 className="text-xl italic font-bold">ShowSwipe</h1>
      <div className="flex mt-2">
        <input
          placeholder="Insert username"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={() => navigate(`/swipe-start/${username}`)}
          className="h-full py-2 px-4 m-2 border-[1px] border-white rounded-sm text-white"
        >
          Go
        </button>
      </div>
    </div>
  );
}

export default SwipeLogin;
