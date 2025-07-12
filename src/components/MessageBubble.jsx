export default function MessageBubble({ message, currentUser }) {
  const isOwnMessage = message.user === currentUser;
  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-[70%] text-sm shadow-sm ${
          isOwnMessage ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {!isOwnMessage && (
          <div className="font-semibold mb-1">{message.user}</div>
        )}
        <div>{message.message}</div>
        <div className="text-[10px] text-right mt-1 opacity-60">
          {new Date(message.sentAt).toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
