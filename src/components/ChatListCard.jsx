const ChatListCard = ({
  username,
  lastMessage,
  timestamp,
  profileImg,
  onClick,
  unReadCount,
}) => {
  return (
    <button
      className="p-2 flex space-x-2 items-center"
      onClick={() => onClick()}
    >
      <div className="rounded-full object-fill border-2 border-purple-500 bg-white w-16 h-16 p-1" />
      <div>
        <p>{username}</p>
        <p className="text-sm text-stone-500">{lastMessage}</p>
        <p className="text-xs">{timestamp}</p>
        <p className="text-xs">You have {unReadCount} unread messages(s)</p>
      </div>
    </button>
  );
};

export default ChatListCard;
