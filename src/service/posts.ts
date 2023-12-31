import { readFile } from "fs/promises";
import path from "path";
import { cache } from "react";

export interface Post {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  featured: boolean;
}

export interface PostData extends Post {
  content: string;
  next: Post | null;
  prev: Post | null;
}

export async function getFeaturedPosts(): Promise<Post[]> {
  // featured가 true인 경우에만 데이터 가져오기
  return getAllPosts() //
    .then((posts) => posts.filter((post) => post.featured));
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
  // featured가 false인 경우에만 데이터 가져오기
  return getAllPosts() //
    .then((posts) => posts.filter((post) => !post.featured));
}

export async function getPostData(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), "data/posts", `${fileName}.md`);

  const posts = await getAllPosts(); //
  const post = posts.find((post) => post.path === fileName);

  if (!post)
    throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없습니다.`);

  const index = posts.indexOf(post);
  const next = index > 0 ? posts[index - 1] : null;
  const prev = index < posts.length ? posts[index + 1] : null;

  const content = await readFile(filePath, "utf-8");
  return { ...post, content, next, prev };
}

// 캐시처리
export const getAllPosts = cache(async () => {
  const filePath = path.join(process.cwd(), "data", "posts.json");

  return readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse)
    .then((posts) => posts.sort((a, b) => (a.date > b.date ? -1 : 1)));
});
