import { useState } from "react";
import { useRoute } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageCircle, Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function PostDetail() {
  const [, params] = useRoute("/community/:postId");
  const postId = params?.postId ? parseInt(params.postId) : null;
  const { user, isAuthenticated } = useAuth();
  const [commentContent, setCommentContent] = useState("");

  if (!postId) {
    return <div>Invalid post ID</div>;
  }

  // Queries
  const { data: post, isLoading: postLoading } = trpc.community.posts.getById.useQuery({
    postId,
  });

  const { data: comments, refetch: refetchComments } = trpc.community.comments.getByPostId.useQuery({
    postId,
  });

  // Mutations
  const createCommentMutation = trpc.community.comments.create.useMutation({
    onSuccess: () => {
      toast.success("댓글이 작성되었습니다!");
      setCommentContent("");
      refetchComments();
    },
    onError: (error) => {
      toast.error(error.message || "댓글 작성에 실패했습니다.");
    },
  });

  const deleteCommentMutation = trpc.community.comments.delete.useMutation({
    onSuccess: () => {
      toast.success("댓글이 삭제되었습니다!");
      refetchComments();
    },
    onError: (error) => {
      toast.error(error.message || "댓글 삭제에 실패했습니다.");
    },
  });

  const handleAddComment = async () => {
    if (!commentContent.trim()) {
      toast.error("댓글 내용을 입력해주세요.");
      return;
    }

    await createCommentMutation.mutateAsync({
      postId,
      content: commentContent,
    });
  };

  if (postLoading) {
    return (
      <div className="min-h-screen bg-cream">
        <Navigation />
        <div className="container py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2 mb-8"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded"></div>
              <div className="h-4 bg-gray-100 rounded"></div>
              <div className="h-4 bg-gray-100 rounded w-3/4"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-cream">
        <Navigation />
        <div className="container py-12 text-center">
          <p className="text-gray-500">게시물을 찾을 수 없습니다.</p>
          <Link href="/community">
            <Button className="mt-4">커뮤니티로 돌아가기</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-forest-green py-8 md:py-12">
        <div className="container">
          <Link href="/community">
            <div className="flex items-center gap-2 text-white/80 hover:text-white mb-4 cursor-pointer">
              <ArrowLeft size={18} />
              <span className="text-sm">커뮤니티로 돌아가기</span>
            </div>
          </Link>
          <h1 className="font-display font-bold text-white text-3xl md:text-4xl">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container max-w-3xl">
          {/* Post Meta */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-forest-green/10 flex items-center justify-center">
                  <span className="text-forest-green font-semibold text-sm">
                    {post.userId}
                  </span>
                </div>
                <div>
                  <p className="font-body font-medium text-gray-700">사용자 #{post.userId}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleString("ko-KR")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>{post.viewCount}</span>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="prose prose-sm max-w-none">
              <div className="font-body text-gray-700 whitespace-pre-wrap leading-relaxed">
                {post.content}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h2 className="font-display font-bold text-charcoal text-xl mb-6 flex items-center gap-2">
              <MessageCircle size={20} />
              댓글 {comments?.length || 0}개
            </h2>

            {/* Add Comment */}
            {isAuthenticated ? (
              <div className="mb-8 pb-8 border-b border-gray-100">
                <div className="space-y-3">
                  <Textarea
                    placeholder="댓글을 입력하세요..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleAddComment}
                      disabled={createCommentMutation.isPending}
                      className="bg-forest-green hover:bg-forest-green-dark text-white"
                    >
                      {createCommentMutation.isPending ? "작성 중..." : "댓글 작성"}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-8 pb-8 border-b border-gray-100 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-sm">
                  댓글을 작성하려면{" "}
                  <a href="/api/oauth/callback" className="font-semibold underline">
                    로그인
                  </a>
                  이 필요합니다.
                </p>
              </div>
            )}

            {/* Comments List */}
            {comments && comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="py-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-forest-green/10 flex items-center justify-center">
                          <span className="text-forest-green font-semibold text-xs">
                            {comment.userId}
                          </span>
                        </div>
                        <div>
                          <p className="font-body font-medium text-gray-700 text-sm">
                            사용자 #{comment.userId}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleString("ko-KR")}
                          </p>
                        </div>
                      </div>
                      {user?.id === comment.userId && (
                        <button
                          onClick={() =>
                            deleteCommentMutation.mutate({ commentId: comment.id })
                          }
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <p className="font-body text-gray-700 text-sm whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
