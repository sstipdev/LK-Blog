// Next
import Image from "next/image";
import { Metadata } from "next";

// service
import { getFeaturedPosts, getPostData } from "@/service/posts";

// Components
import PostContent from "@/components/PostContent";
import AdjacentPostCard from "@/components/AdjacentPostCard";
import Utterances from "@/components/Utterance";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const { title, description } = await getPostData(slug);
  return {
    title,
    description,
  };
}

export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPostData(slug);
  const { title, path, next, prev } = post;

  return (
    <article>
      <div className="rounded-2xl overflow-hidden bg-gray-100 shadow-lg m-4">
        <Image
          className="w-full h-1/5 max-h-[500px]"
          src={`/images/posts/${path}.png`}
          alt={title}
          width={320}
          height={170}
        />
        <PostContent post={post} />
        <section className="flex shadow-md">
          {prev && <AdjacentPostCard post={prev} type="prev" />}
          {next && <AdjacentPostCard post={next} type="next" />}
        </section>
      </div>
      <div className="mt-4">
        <Utterances />
      </div>
    </article>
  );
}

// 페이지 미리 만들어두기
export async function generateStaticParams() {
  const posts = await getFeaturedPosts();
  return posts.map((post) => ({
    slug: post.path,
  }));
}
