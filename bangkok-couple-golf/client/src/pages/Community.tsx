import { useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, MessageCircle, Eye, Plus } from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = [
  { value: "general", label: "일반 토론" },
  { value: "golf-tip", label: "골프 팁" },
  { value: "accommodation", label: "숙소 정보" },
  { value: "restaurant", label: "맛집 추천" },
  { value: "shopping", label: "쇼핑 정보" },
  { value: "transportation", label: "교통 정보" },
];

export default function Community() {
  const { user, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "", category: "general" });

  // Queries
  const { data: posts, isLoading, refetch } = trpc.community.posts.list.useQuery({
    limit: 50,
    offset: 0,
  });

  // Mutations
  const createPostMutation = trpc.community.posts.create.useMutation({
    onSuccess: () => {
      toast.success("게시물이 작성되었습니다!");
      setFormData({ title: "", content: "", category: "general" });
      setNewPostOpen(false);
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "게시물 작성에 실패했습니다.");
    },
  });

  const handleCreatePost = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("제목과 내용을 입력해주세요.");
      return;
    }

    await createPostMutation.mutateAsync({
      title: formData.title,
      content: formData.content,
      category: formData.category,
    });
  };

  const filteredPosts = posts?.filter(
    (post) => selectedCategory === "all" || post.category === selectedCategory
  ) || [];

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-forest-green py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-white text-4xl md:text-5xl mb-4">
              커뮤니티
            </h1>
            <p className="font-body text-white/80 text-lg">
              방콕 골프여행 경험을 나누고, 실시간 정보를 교환하는 공간입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar - Categories */}
            <div className="md:w-48 flex-shrink-0">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-4">
                <h3 className="font-display font-bold text-charcoal mb-4">카테고리</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === "all"
                        ? "bg-forest-green text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    전체 보기
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                        selectedCategory === cat.value
                          ? "bg-forest-green text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* New Post Button */}
              {isAuthenticated ? (
                <Dialog open={newPostOpen} onOpenChange={setNewPostOpen}>
                  <DialogTrigger asChild>
                    <Button className="mb-6 bg-forest-green hover:bg-forest-green-dark text-white">
                      <Plus size={18} className="mr-2" />
                      새 게시물 작성
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>새 게시물 작성</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          카테고리
                        </label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            setFormData({ ...formData, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          제목
                        </label>
                        <Input
                          placeholder="게시물 제목을 입력하세요"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          maxLength={255}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          내용
                        </label>
                        <Textarea
                          placeholder="게시물 내용을 입력하세요"
                          value={formData.content}
                          onChange={(e) =>
                            setFormData({ ...formData, content: e.target.value })
                          }
                          rows={6}
                        />
                      </div>

                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => setNewPostOpen(false)}
                        >
                          취소
                        </Button>
                        <Button
                          onClick={handleCreatePost}
                          disabled={createPostMutation.isPending}
                          className="bg-forest-green hover:bg-forest-green-dark text-white"
                        >
                          {createPostMutation.isPending ? "작성 중..." : "게시"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 text-sm">
                    게시물을 작성하려면{" "}
                    <a href="/api/oauth/callback" className="font-semibold underline">
                      로그인
                    </a>
                    이 필요합니다.
                  </p>
                </div>
              )}

              {/* Posts List */}
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg p-4 animate-pulse border border-gray-100"
                    >
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 font-body">
                    아직 게시물이 없습니다. 첫 번째 게시물을 작성해보세요!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <Link key={post.id} href={`/community/${post.id}`}>
                      <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <h3 className="font-display font-semibold text-charcoal text-lg mb-1">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                                {CATEGORIES.find((c) => c.value === post.category)?.label}
                              </span>
                              <span>
                                {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="font-body text-gray-600 text-sm line-clamp-2 mb-3">
                          {post.content}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye size={14} />
                            <span>{post.viewCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle size={14} />
                            <span>댓글</span>
                          </div>
                          <div className="ml-auto flex items-center text-forest-green font-medium">
                            자세히 보기 <ArrowRight size={12} className="ml-1" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
