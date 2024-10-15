import { Avatar } from "@mui/material";

export default function Comment() {
  return (
    <li className="flex items-center border">
      <div>
        <Avatar />
        <h4>user</h4>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet,consectetur adipiscing elit.Donec ligula
          nibh,interdum non enim sit amet,iaculis aliquet nunc.
        </p>
        <span>a min ago</span>
      </div>
    </li>
  );
}
