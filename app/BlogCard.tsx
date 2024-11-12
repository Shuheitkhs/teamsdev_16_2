import Image from "next/image";

type BlogCardProps = {
  src:string;
  alt: string;
  title: string;
  category: string;
  author:string;
  createdAt: string;
  content: string;
};

export default function BlogCard({
  src,
  alt,
  title,
  category,
  author,
  createdAt,
  content,
}: BlogCardProps) {

  return (
    <article>
      <div>
        <Image
          src={src}
          alt={alt}
          width={300} // 必要に応じて調整
          height={300}
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
