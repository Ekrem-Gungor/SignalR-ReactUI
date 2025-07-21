export default function MessageBubble({ message }) {
  return (
    <div className={"flex justify-end"}>
      <div
        className={
          "px-4 py-2 rounded-xl max-w-[70%] text-sm shadow-sm bg-blue-600 text-white"
        }
      >
        <div className="font-semibold mb-1">{message.senderUserName}</div>
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
