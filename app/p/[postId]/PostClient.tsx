"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DownloadModal from "../../components/DownloadModal";

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

// Detect device and redirect to app store
const detectDeviceAndRedirect = () => {
  if (typeof window === "undefined") return;

  const userAgent = navigator.userAgent || navigator.vendor;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /android/i.test(userAgent);

  if (isIOS) {
    window.location.href = "https://apps.apple.com/us/app/rydora/id6748365405";
  } else if (isAndroid) {
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.rydora.app";
  }
};

interface PostClientProps {
  postId: string;
  initialData: PostData | null;
}

export default function PostClient({ postId, initialData }: PostClientProps) {
  const [post, setPost] = useState<PostData | null>(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (initialData || !postId) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://rydora.me/api/public/posts/${postId}`);
        if (!res.ok) {
          throw new Error("Post not found");
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, initialData]);

  if (loading) {
    return (
      <div style={styles.pageContainer}>
        <Header
          isScrolled={isScrolled}
          onDownloadClick={() => setIsDownloadModalOpen(true)}
        />
        <div style={styles.contentWrapper}>
          <div style={styles.loadingWrapper}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingMessage}>Loading post...</p>
          </div>
        </div>
        <Footer />
        <DownloadModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
        />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={styles.pageContainer}>
        <Header
          isScrolled={isScrolled}
          onDownloadClick={() => setIsDownloadModalOpen(true)}
        />
        <div style={styles.contentWrapper}>
          <div style={styles.errorWrapper}>
            <div style={styles.errorEmoji}>😕</div>
            <h1 style={styles.errorHeading}>Post Not Found</h1>
            <p style={styles.errorMessage}>
              {error ||
                "The post you're looking for doesn't exist or has been removed."}
            </p>
          </div>
        </div>
        <Footer />
        <DownloadModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
        />
      </div>
    );
  }

  const postDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div style={styles.pageContainer}>
      <Header
        isScrolled={isScrolled}
        onDownloadClick={() => setIsDownloadModalOpen(true)}
      />

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      <div style={styles.contentWrapper}>
        <div style={styles.postContainer}>
          {/* Post Header */}
          <div style={styles.postHeader}>
            <div style={styles.userInfo}>
              {post.user.profileImage ? (
                <div style={styles.avatarWrapper}>
                  <Image
                    src={post.user.profileImage}
                    alt={post.user.username}
                    fill
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                </div>
              ) : (
                <div style={styles.avatarPlaceholder}>
                  {post.user.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div style={styles.userDetails}>
                <h2 style={styles.username}>@{post.user.username}</h2>
                <p style={styles.postDate}>{postDate}</p>
              </div>
            </div>
          </div>

          {/* Post Media (Image or Video) */}
          {post.mediaUrl && (
            <div style={styles.imageContainer}>
              {post.mediaUrl.match(
                /\.(mp4|webm|mov|m4v|avi|mkv|3gp|flv|wmv|mpeg|mpg)$/i
              ) ? (
                <video
                  src={post.mediaUrl}
                  controls
                  style={styles.postVideo}
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={post.mediaUrl}
                  alt={post.caption || "Post image"}
                  width={1200}
                  height={800}
                  style={styles.postImage}
                  priority
                />
              )}
            </div>
          )}

          {/* Post Caption */}
          {post.caption && (
            <div style={styles.captionContainer}>
              <p style={styles.caption}>{post.caption}</p>
            </div>
          )}

          {/* Call to Action */}
          <div style={styles.ctaContainer}>
            <button
              onClick={detectDeviceAndRedirect}
              style={styles.ctaButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(16, 185, 129, 1) 0%, rgba(5, 150, 105, 1) 100%)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 32px rgba(16, 185, 129, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(16, 185, 129, 0.3)";
              }}
            >
              Open in Rydora App
            </button>
            <p style={styles.ctaSubtext}>
              View this post and connect with car enthusiasts on Rydora
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #070b12 0%, #0a1020 60%, #070b12 100%)",
    color: "#e6ecf7",
  },
  contentWrapper: {
    paddingTop: "120px",
    paddingBottom: "80px",
    paddingLeft: "clamp(16px, 4vw, 100px)",
    paddingRight: "clamp(16px, 4vw, 100px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "calc(100vh - 200px)",
  },
  postContainer: {
    maxWidth: "800px",
    width: "100%",
    backgroundColor: "rgba(17, 24, 38, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  postHeader: {
    marginBottom: "24px",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  avatarWrapper: {
    position: "relative",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid rgba(16, 185, 129, 0.3)",
  },
  avatarPlaceholder: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    border: "2px solid rgba(16, 185, 129, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "700",
    color: "#10b981",
  },
  userDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  username: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "700",
    color: "#fff",
  },
  postDate: {
    margin: 0,
    fontSize: "14px",
    color: "rgba(203, 213, 225, 0.6)",
  },
  imageContainer: {
    width: "100%",
    marginBottom: "24px",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  postImage: {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "contain",
    maxHeight: "600px",
  },
  postVideo: {
    width: "100%",
    height: "auto",
    display: "block",
    maxHeight: "600px",
    backgroundColor: "#000",
  },
  captionContainer: {
    marginBottom: "32px",
  },
  caption: {
    margin: 0,
    fontSize: "16px",
    lineHeight: "1.6",
    color: "rgba(226, 232, 240, 0.9)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  ctaContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    paddingTop: "24px",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
  },
  ctaButton: {
    width: "100%",
    padding: "16px 32px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    background:
      "linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)",
    border: "1px solid rgba(16, 185, 129, 0.3)",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 24px rgba(16, 185, 129, 0.3)",
  },
  ctaSubtext: {
    margin: 0,
    fontSize: "14px",
    color: "rgba(203, 213, 225, 0.6)",
    textAlign: "center",
  },
  loadingWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "24px",
    padding: "80px 20px",
  },
  loadingSpinner: {
    width: "48px",
    height: "48px",
    border: "4px solid rgba(16, 185, 129, 0.2)",
    borderTop: "4px solid #10b981",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingMessage: {
    margin: 0,
    fontSize: "16px",
    color: "rgba(203, 213, 225, 0.7)",
  },
  errorWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    padding: "80px 20px",
    textAlign: "center",
  },
  errorEmoji: {
    fontSize: "64px",
  },
  errorHeading: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "700",
    color: "#fff",
  },
  errorMessage: {
    margin: 0,
    fontSize: "16px",
    color: "rgba(203, 213, 225, 0.7)",
    maxWidth: "500px",
  },
};
