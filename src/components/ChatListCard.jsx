import unitedImg from "../assets/images/united.png";

const ChatListCard = ({
  username,
  lastMessage,
  timestamp,
  profileImg,
  onClick,
  unReadCount,
  isSelected,
}) => {
  return (
    <button
      className={`p-2 flex space-x-2 items-center ${
        isSelected ? "bg-blue-200" : "bg-white"
      }`}
      onClick={() => onClick()}
    >
      <img
        src={profileImg || unitedImg}
        alt=""
        className="rounded-full object-fill border-2 border-purple-500 bg-white w-16 h-16"
      />
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
