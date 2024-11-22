import Image from "next/image";

type BlogCardProps = {
  src: string;
  title: string;
  category: string;
  author: string;
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
  //冒頭100文字のみをcard内に表示
  const slicedContent = content.slice(0, 100);

  return (
    <article className="max-w-sm w-full min-h-[450px] border rounded-lg shadow-md p-5 bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out mx-auto">
      <div className="flex justify-center mb-4 h-[250px] overflow-hidden">
        <Image
          src={src}
          alt={`画像:${title}`}
          width={400}
          height={250}
          objectFit="cover"
          className="rounded-md"
          priority
        />
      </div>
      <div className="space-y-2 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <div className="text-sm text-blue-500">{category}</div>
      </div>
      <div className="text-sm text-blue-500">{author}</div>
      <div>{createdAt}</div>
      <div>{slicedContent}</div>
    </article>
  );
};

export default BlogCard;
