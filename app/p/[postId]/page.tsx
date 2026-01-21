import { Metadata } from "next";
import PostClient from "./PostClient";

interface UserData {
  username: string;
  profileImage: string | null;
}

interface PostData {
  id: string;
  caption: string | null;
  mediaUrl: string | null;
  user: UserData;
  createdAt: string;
}

async function getPostData(postId: string): Promise<PostData | null> {
  try {
    const res = await fetch(
      `https://rydora.me/api/public/posts/${postId}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

type Props = {
  params: Promise<{ postId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId } = await params;
  const post = await getPostData(postId);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This post doesn't exist or has been removed.",
    };
  }

  const title = post.caption
    ? `${post.user.username}: "${post.caption.slice(0, 50)}${post.caption.length > 50 ? "..." : ""}" - Rydora`
    : `Post by ${post.user.username} - Rydora`;
  const description = post.caption || `Check out this post by @${post.user.username} on Rydora.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://rydora.me/p/${postId}`,
      siteName: "Rydora",
      images: post.mediaUrl ? [{ url: post.mediaUrl, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.mediaUrl ? [post.mediaUrl] : undefined,
    },
    alternates: {
      canonical: `https://rydora.me/p/${postId}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { postId } = await params;
  const post = await getPostData(postId);

  return <PostClient postId={postId} initialData={post} />;
}
