import Image from "next/image";

type BlogCardProps = {
  src:string;
  title: string;
  category: string;
  author:string;
  createdAt: string;
  content: string;
};

const BlogCard: React.FC<BlogCardProps> = ({
  src,
  title,
  category,
  author,
  createdAt,
  content,
}) => {
  return (
    <article>
      <div>
        <Image
          src={src}
          alt={`画像:${title}`}
          width={300}
          height={300}
          priority
        />
      </div>
      <div>
        <h3>{title}</h3>
      </div>
      <div>{category}</div>
      <div>{author}</div>
      <div>{createdAt}</div>
      <div>{content}</div>
    </article>
  );
}

export default BlogCard;