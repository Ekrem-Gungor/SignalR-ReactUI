import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { User2, Users } from "lucide-react";

export default function UserSidebar() {
  const [users, setUsers] = useState([]);
  const [isUserListOpen, setIsUserListOpen] = useState(true);

  const toggleUserList = () => setIsUserListOpen((prev) => !prev);

  const fetchUsers = async () => {
    const response = await api.get("/Chat/connected-users");
    setUsers(response.data);
  };

  useEffect(() => {
    // kullanıcı listesini açtığında kullanıcıları getir ve bir interval belirleyerek 30 saniyede bir güncelle
    const interval = setInterval(() => {
      if (isUserListOpen) {
        fetchUsers();
      }
    }, 60000); // 60 saniyede bir kullanıcıları güncelle
    fetchUsers(); // ilk yüklemede kullanıcıları getir

    return () => clearInterval(interval);
  }, [isUserListOpen]);

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isUserListOpen ? "w-72" : "w-12"
      } bg-white dark:bg-zinc-900 border-l border-gray-200 dark:border-zinc-700 shadow-md h-screen overflow-hidden relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleUserList}
        className={`absolute ${
          isUserListOpen ? "right-9" : "-left-4"
        } top-4 transform translate-x-full bg-blue-600 text-white dark:bg-zinc-300 dark:text-zinc-800 px-2 py-1 rounded-l-md shadow`}
      >
        {isUserListOpen ? ">" : "<"}
      </button>

      {isUserListOpen && (
        <div className="p-4 h-full flex flex-col overflow-y-auto space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Kullanıcılar
          </h2>

          {/* Aktif Kullanıcılar */}
          <section>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase mb-2">
              Aktif
            </h3>
            <ul className="space-y-2">
              {users
                .filter((u) => u.isOnline)
                .map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center gap-3 p-2 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {user.userName}
                    </span>
                  </li>
                ))}
            </ul>
          </section>

          {/* Diğer Kullanıcılar */}
          <section>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase mb-2">
              Diğer Kullanıcılar
            </h3>
            <ul className="space-y-2">
              {users
                .filter((u) => !u.isOnline)
                .map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
                  >
                    <User2 className="h-4 w-4 text-gray-400 dark:text-zinc-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {user.userName}
                    </span>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
