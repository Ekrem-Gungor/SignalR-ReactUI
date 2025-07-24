import { useState } from "react";
import { MessageSquare } from "lucide-react";

export default function ChatRoomSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // Gelecekte API'den odalar alınabilir
  const rooms = [
    "Room 1",
    "Room 2",
    "Room 3",
    "Room 4",
    "Room 5",
    "Room 6",
    "Room 7",
    "Room 8",
    "Room 9",
    "Room 10",
  ];

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isOpen ? "w-72" : "w-12"
      } bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-700 shadow-md h-screen overflow-hidden relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`absolute ${
          isOpen ? "right-9" : "-left-4"
        } top-4 transform translate-x-full bg-blue-600 text-white dark:bg-zinc-300 dark:text-zinc-800 px-2 py-1 rounded-l-md shadow`}
      >
        {isOpen ? "<" : ">"}
      </button>

      {isOpen && (
        <div className="p-4 h-full flex flex-col overflow-y-auto space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Chat Rooms
          </h2>

          <ul className="space-y-2">
            <li className="p-2 rounded-lg mb-5 text-center bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition cursor-pointer text-sm font-medium text-gray-800 dark:text-gray-200">
              General Chat
            </li>
            <hr />
            {rooms.map((room, index) => (
              <li
                key={index}
                className="p-2 rounded-lg text-center bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition cursor-pointer text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                {room}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
