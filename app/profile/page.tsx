import Image from "next/image";
import Pagination from "../components/Pagination";

export default function Profile() {
  return (
    <div>
      <header />
      <main>
        <div className="flex items-center justify-between">
          <div></div>
          <h1>Your Post</h1>
          <div>
            <p>User name</p>
            <button>Logout</button>
          </div>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <li className="border">
            <Image src="" alt="ブログ記事" width={500} height={300} />
            <div>
              <h2>Post Title</h2>
              <h3>Categroy</h3>
            </div>
            <div>
              <p>Author</p>
              <p>a min ago</p>
            </div>
            <p>ブログ内容</p>
          </li>
          <li className="border">
            <Image src="" alt="ブログ記事" width={500} height={300} />
            <div>
              <h2>Post Title</h2>
              <h3>Categroy</h3>
            </div>
            <div>
              <p>Author</p>
              <p>a min ago</p>
            </div>
            <p>ブログ内容</p>
          </li>
          <li className="border">
            <Image src="" alt="ブログ記事" width={500} height={300} />
            <div>
              <h2>Post Title</h2>
              <h3>Categroy</h3>
            </div>
            <div>
              <p>Author</p>
              <p>a min ago</p>
            </div>
            <p>ブログ内容</p>
          </li>
          <li className="border">
            <Image src="" alt="ブログ記事" width={500} height={300} />
            <div>
              <h2>Post Title</h2>
              <h3>Categroy</h3>
            </div>
            <div>
              <p>Author</p>
              <p>a min ago</p>
            </div>
            <p>ブログ内容</p>
          </li>
          <li className="border">
            <Image src="" alt="ブログ記事" width={500} height={300} />
            <div>
              <h2>Post Title</h2>
              <h3>Categroy</h3>
            </div>
            <div>
              <p>Author</p>
              <p>a min ago</p>
            </div>
            <p>ブログ内容</p>
          </li>
          <li className="border">
            <Image src="" alt="ブログ記事" width={500} height={300} />
            <div>
              <h2>Post Title</h2>
              <h3>Categroy</h3>
            </div>
            <div>
              <p>Author</p>
              <p>a min ago</p>
            </div>
            <p>ブログ内容</p>
          </li>
        </ul>
      </main>
      <footer className="text-center">
        <Pagination />
      </footer>
    </div>
  );
}
