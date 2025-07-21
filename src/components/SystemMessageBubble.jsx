export default function SystemMessageBubble({ message }) {
  return (
    <div className={"flex justify-start"}>
      <div
        className={
          "px-4 py-2 rounded-xl max-w-[70%] text-sm shadow-sm bg-gray-200 text-gray-900"
        }
      >
        <div className="font-semibold mb-1">{message.senderName}</div>
        <div>
          {message.joinedUserName}
          {message.systemMessage}
        </div>
        <div className="text-[10px] text-right mt-1 opacity-60">
          {new Date(message.sendAt).toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
