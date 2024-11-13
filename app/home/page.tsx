import styles from "./page.module.css";
import Header from "../components/header/Header";
import Pagination from "../components/Pagination";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <input type="text" />
        <button>Search button</button>
        <div>
          <div>Thumbnail</div>
          <div>Post Title</div>
          <div>Category</div>
          <div>Author Name</div>
          <div>Elapsed TIme</div>
          <div>Contents</div>
        </div>
        <Pagination />
      </main>
    </>
  );
}
