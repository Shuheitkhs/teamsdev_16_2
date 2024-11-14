import { Avatar } from "@mui/material";

export default function Comments() {
  return (
    <div>
      <form>
        <h3>Comments</h3>
        <div>
          <input type="text" placeholder="Your Comment..." />
          <button className="border">Comment</button>
        </div>
      </form>
      <div>
        <ul>
          <li className="flex items-center border">
            <div>
              <Avatar />
              <h4>user</h4>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet,consectetur adipiscing elit.Donec
                ligula nibh,interdum non enim sit amet,iaculis aliquet nunc.
              </p>
              <span>a min ago</span>
            </div>
          </li>
          <li className="flex items-center border">
            <div>
              <Avatar />
              <h4>user</h4>
            </div>
            <div>
              <p>
                Lorem ipsum dolor sit amet,consectetur adipiscing elit.Donec
                ligula nibh,interdum non enim sit amet,iaculis aliquet nunc.
              </p>
              <span>a min ago</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
