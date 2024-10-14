import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";

const BlogViewPage = () => {
  return (
    <div>
      {/* ヘッダー */}
      <div className="bg-gray-300 h-15">
        ヘッダーコンポーネント作成後、ここにヘッダーが入ります。
      </div>
      {/* メインコンテンツ部分 */}
      <div className="bg-white sm:bg-gray-300 m-10 sm:p-10">
        <div className="flex justify-center sm:justify-between items-center">
          <h1 className="text-4xl">Blog Title</h1>
          <AccountCircleIcon className="hidden sm:block" fontSize="large" />
        </div>
        <Image src="" alt="ここに画像が入ります。" />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid
          molestias, ut esse itaque distinctio harum, vitae quis minima
          recusandae nesciunt sint est quos inventore officiis, enim accusamus
          dolor. Laboriosam corporis optio vero, facilis unde non aspernatur?
          Hic, nisi ipsam illum corrupti laudantium temporibus laborum saepe
          eligendi ullam, dignissimos pariatur. Laborum tenetur iure commodi
          nesciunt voluptatem modi magnam nobis eveniet hic consequatur aliquam
          similique praesentium possimus delectus est, dicta molestiae rerum.
          Odit animi labore ea omnis incidunt recusandae odio perspiciatis
          repudiandae quaerat neque dolores in consequuntur quis provident
          laudantium qui distinctio aperiam eos laborum sapiente velit fugit,
          sed dicta nisi! Vitae.
        </p>
      </div>
      {/* More Posts部分 */}
      <div className="m-10">
        <div className="text-2xl">More Posts</div>
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <Image src="" alt="ここに画像が入ります。" />
            <div>Post Title</div>
          </div>
          <div>
            <Image src="" alt="ここに画像が入ります。" />
            <div>Post Title</div>
          </div>
          <div>
            <Image src="" alt="ここに画像が入ります。" />
            <div>Post Title</div>
          </div>
        </div>
      </div>
      {/* コメント部分 */}
      <div className="m-10">
        <div className="text-3xl">Comments</div>
        <div className="flex flex-col sm:flex-row justify-center">
          <input placeholder="Add Your Comment" className="border-2" />
          <div>
            <button className="bg-sky-500">仮のボタン</button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div>コメントコンポーネント作成後、ここにコメントが入ります。</div>
          <div>コメントコンポーネント作成後、ここにコメントが入ります。</div>
          <div>コメントコンポーネント作成後、ここにコメントが入ります。</div>
        </div>
      </div>
    </div>
  );
};

export default BlogViewPage;
