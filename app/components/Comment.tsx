import { Avatar } from "@mui/material";

type CommentProps = {
  created_at: string;
  children: string;
};

const Comment: React.FC<CommentProps> = ({ created_at, children }) => {
  // timestampを--年--月--日の形で表示
  const commentDate = new Date(created_at);
  const y = commentDate.getFullYear();
  const m = ("00" + (commentDate.getMonth() + 1)).slice(-2);
  const d = ("00" + commentDate.getDate()).slice(-2);
  const result = `${y}年${m}月${d}日`;
  return (
    <div className="bg-gray-200 shadow-lg w-full my-3 p-4 flex">
      <div className="flex-col justify-center content-between">
        <Avatar />
        <div className="font-bold text-lg">User</div>
      </div>
      <div className="flex-col justify-start ml-4 space-y-4 ">
        <div>
          <p>{children}</p>
        </div>
        <div>
          <p className="text-blue-300 text-sm">投稿日:{result}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
