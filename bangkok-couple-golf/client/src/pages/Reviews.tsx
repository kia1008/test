/**
 * Reviews Page — Tropical Editorial Design
 * 부부·연인 후기 게시판
 */
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Star, Users, Calendar, MapPin, ThumbsUp } from "lucide-react";

const categories = ["전체", "부부 후기", "연인 후기", "신혼여행 겸 골프", "비골퍼 배우자 후기", "골프 초보 동반"];

const reviews = [
  {
    id: 1,
    title: "50대 부부 방콕 골프 4박 6일 후기",
    author: "골프부부K",
    date: "2025년 3월",
    type: "부부 후기",
    visitDate: "2025년 2월",
    people: "부부 2인",
    rounds: 3,
    hotel: "수쿰빗 지역",
    rating: 5,
    spouseRating: 5,
    content: `남편은 라운딩 3회, 저는 마사지와 쇼핑으로 각자의 시간을 즐기다가 저녁엔 루프탑바에서 함께 만났어요. 이게 진짜 커플 골프여행이더라고요.

알파인 골프장에서 두 번, 타나 시티에서 한 번 라운딩했는데 두 곳 모두 캐디 서비스가 정말 좋았어요. 캐디 언니들이 영어도 잘 하고 친절해서 남편이 너무 좋아했어요.

저는 골프를 안 치는데, 남편 라운딩 중에 숙소 근처 마사지샵에서 2시간 타이 마사지 받고, 터미널21에서 쇼핑하고, 야시장도 혼자 다녀왔어요. 오히려 저 혼자만의 시간이 너무 좋았답니다.

저녁에는 매일 같이 루프탑바나 좋은 레스토랑에서 만나서 그날 있었던 이야기 나누는 게 너무 행복했어요. 방콕 골프여행은 골프 치는 사람도, 안 치는 사람도 모두 만족할 수 있는 최고의 여행이에요.`,
    pros: "캐디 서비스 최고, 비골퍼도 즐길 거리 많음, 저녁 식사 분위기 최고",
    cons: "이동 시간이 생각보다 길었음, 우기 시즌이라 오전에 비가 조금 왔음",
    changeNext: "다음엔 골프장 근처 리조트에 숙박해서 이동 시간 줄이기",
    tags: ["부부", "4박6일", "알파인", "타나시티"],
    helpful: 47,
  },
  {
    id: 2,
    title: "여자친구와 첫 해외 골프 다녀온 후기",
    author: "골린이커플",
    date: "2025년 1월",
    type: "연인 후기",
    visitDate: "2024년 12월",
    people: "연인 2인",
    rounds: 2,
    hotel: "아속 지역",
    rating: 4,
    spouseRating: 4,
    content: `여자친구가 골프를 전혀 모르는데도 캐디 언니들이 너무 친절하게 도와줘서 같이 즐겁게 라운딩 했어요. 방콕 골프장은 초보자도 환영해줘서 좋아요.

니칸티 골프장을 선택했는데, 클럽하우스가 정말 예뻐서 여자친구가 사진 찍는 재미에 빠졌어요. 골프보다 사진 찍는 게 더 즐거웠다고 할 정도로요 ㅎㅎ

그린피가 생각보다 비싸지 않았고, 캐디피 포함해서 2인 기준 약 20만원 정도 나왔어요. 서울에서 골프 치는 것보다 훨씬 저렴하고 분위기는 훨씬 좋았어요.

방콕 골프여행 처음이라 걱정 많이 했는데, 생각보다 훨씬 쉽고 즐거웠어요. 다음에 또 오고 싶어요.`,
    pros: "초보자 친화적, 사진 찍기 좋은 코스, 합리적인 비용",
    cons: "시내에서 이동 시간이 있음, 영어 소통이 필요함",
    changeNext: "다음엔 골프장 근처 숙소 잡고 2박 3일로 여유롭게",
    tags: ["연인", "초보자", "니칸티", "3박5일"],
    helpful: 38,
  },
  {
    id: 3,
    title: "남편 라운딩 중 아내 혼자 마사지·쇼핑 후기",
    author: "비골퍼아내",
    date: "2024년 11월",
    type: "비골퍼 배우자 후기",
    visitDate: "2024년 10월",
    people: "부부 2인",
    rounds: 2,
    hotel: "수쿰빗 지역",
    rating: 5,
    spouseRating: 5,
    content: `처음엔 골프장에서 뭘 하나 걱정했는데, 숙소 근처 마사지샵에서 2시간, 터미널21에서 쇼핑하고 나니 남편 라운딩이 끝나있더라고요. 완벽한 하루였어요.

저는 골프를 전혀 안 치는데, 이번 여행에서 제가 더 즐거웠을 것 같아요. 방콕 마사지는 정말 최고예요. 타이 마사지 2시간에 500바트 정도면 너무 저렴하고 효과도 좋아요.

오전에 남편이 라운딩 나가면, 저는 느긋하게 일어나서 호텔 조식 먹고, 마사지 예약하고, 쇼핑몰 구경하다가 저녁에 남편이랑 만났어요. 오히려 각자 시간이 있어서 더 여유롭고 좋았어요.

저녁엔 매일 새로운 레스토랑을 가봤는데, 방콕 음식이 너무 맛있어서 매일 배가 불렀어요. 다음에 또 오고 싶어요!`,
    pros: "비골퍼도 즐길 거리 무궁무진, 마사지 가성비 최고, 쇼핑 천국",
    cons: "남편 라운딩 시간이 생각보다 길었음 (6시간 이상)",
    changeNext: "다음엔 마사지샵 미리 예약하고 가기",
    tags: ["부부", "비골퍼", "마사지", "쇼핑"],
    helpful: 52,
  },
  {
    id: 4,
    title: "신혼여행으로 방콕 골프 다녀왔어요",
    author: "신혼골프커플",
    date: "2024년 9월",
    type: "신혼여행 겸 골프",
    visitDate: "2024년 8월",
    people: "부부 2인 (신혼)",
    rounds: 2,
    hotel: "실롬 지역",
    rating: 5,
    spouseRating: 5,
    content: `신혼여행으로 방콕을 선택한 이유가 바로 골프 때문이에요. 남편이 골프를 좋아하는데, 신혼여행도 즐기고 골프도 즐길 수 있는 곳이 방콕이더라고요.

알파인 골프장에서 라운딩했는데, 신혼여행이라고 하니까 캐디 언니들이 더 잘 챙겨줬어요. 코스 중간에 사진도 많이 찍어줬고요.

저는 골프를 배운 지 1년 됐는데, 방콕 코스가 한국보다 훨씬 여유롭고 즐거웠어요. 캐디가 항상 옆에 있어서 도움도 많이 받았고요.

신혼여행으로 방콕 골프를 선택하길 정말 잘했어요. 골프도 즐기고, 맛있는 음식도 먹고, 마사지도 받고, 야시장도 가고... 5박 7일이 너무 짧게 느껴졌어요.`,
    pros: "신혼여행 분위기와 골프의 완벽한 조화, 캐디 서비스 최고",
    cons: "우기 시즌이라 날씨가 불안정했음",
    changeNext: "건기 시즌(11월~2월)에 다시 오고 싶음",
    tags: ["신혼", "부부", "알파인", "5박7일"],
    helpful: 61,
  },
  {
    id: 5,
    title: "40대 부부 3박 5일 방콕 골프 후기",
    author: "방콕골프매니아",
    date: "2024년 8월",
    type: "부부 후기",
    visitDate: "2024년 7월",
    people: "부부 2인",
    rounds: 3,
    hotel: "아속 지역",
    rating: 4,
    spouseRating: 4,
    content: `3박 5일로 방콕 골프여행 다녀왔어요. 라운딩 3회 했는데, 각각 다른 골프장에서 해봤어요.

타나 시티, 니칸티, 알파인 세 곳 다 다른 매력이 있었어요. 타나 시티는 공항 근처라 첫날 바로 라운딩 가기 좋았고, 니칸티는 코스가 예뻐서 좋았고, 알파인은 수준이 가장 높았어요.

아내가 골프를 안 치는데, 숙소 근처에 마사지샵이 많아서 라운딩 중에 마사지 받고 있었어요. 저녁에 만나서 같이 야시장 가고, 루프탑바에서 맥주 한잔 하는 게 너무 좋았어요.

방콕 골프여행은 한 번 가면 계속 가게 되는 것 같아요. 이미 다음 여행 계획 중이에요.`,
    pros: "다양한 골프장 선택지, 저렴한 그린피, 비골퍼도 즐길 거리 많음",
    cons: "여름 시즌이라 더위가 심했음, 오전 일찍 라운딩 추천",
    changeNext: "건기 시즌에 4박 6일로 더 여유롭게",
    tags: ["부부", "3박5일", "타나시티", "니칸티", "알파인"],
    helpful: 43,
  },
  {
    id: 6,
    title: "골프 초보 남편과 함께 간 방콕 후기",
    author: "초보남편아내",
    date: "2024년 6월",
    type: "골프 초보 동반",
    visitDate: "2024년 5월",
    people: "부부 2인",
    rounds: 2,
    hotel: "수쿰빗 지역",
    rating: 4,
    spouseRating: 5,
    content: `남편이 골프를 배운 지 6개월 됐는데, 처음 해외 라운딩으로 방콕을 선택했어요.

가성비 좋은 로터스 밸리 골프장을 선택했는데, 초보자에게 딱 맞는 코스였어요. 캐디 언니가 남편 스윙 교정도 해주고, 정말 친절하게 도와줬어요.

남편은 처음 해외 라운딩이라 긴장했는데, 방콕 골프장 분위기가 너무 편안해서 금방 적응했어요. 한국 골프장보다 훨씬 여유롭고 부담 없는 분위기예요.

저는 골프를 안 치는데, 골프장 내 카페에서 책 읽으면서 기다렸어요. 생각보다 편안하게 기다릴 수 있었어요. 다음엔 저도 배워서 같이 치고 싶어요!`,
    pros: "초보자 친화적 분위기, 친절한 캐디, 합리적인 비용",
    cons: "초보자라 라운딩 시간이 길었음",
    changeNext: "다음엔 둘 다 골프 치면서 같이 라운딩하고 싶음",
    tags: ["부부", "초보자", "로터스밸리"],
    helpful: 29,
  },
];

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  const [expanded, setExpanded] = useState(false);

  const typeColor = {
    "부부 후기": "bg-green-100 text-green-700",
    "연인 후기": "bg-pink-100 text-pink-700",
    "신혼여행 겸 골프": "bg-purple-100 text-purple-700",
    "비골퍼 배우자 후기": "bg-amber-100 text-amber-700",
    "골프 초보 동반": "bg-blue-100 text-blue-700",
  }[review.type] || "bg-gray-100 text-gray-700";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-2">
          <span className={`tag-badge ${typeColor}`}>{review.type}</span>
          {review.tags.map((tag, i) => (
            <span key={i} className="tag-badge bg-gray-100 text-gray-600">#{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < review.rating ? "text-golden fill-golden" : "text-gray-200 fill-gray-200"} />
          ))}
        </div>
      </div>

      <h3 className="font-display font-bold text-charcoal text-lg mb-3 leading-snug">
        {review.title}
      </h3>

      {/* Meta info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {[
          { icon: <Calendar size={12} />, label: "방문 시기", value: review.visitDate },
          { icon: <Users size={12} />, label: "여행 인원", value: review.people },
          { icon: <span className="text-xs">⛳</span>, label: "라운딩 횟수", value: `${review.rounds}회` },
          { icon: <MapPin size={12} />, label: "숙소 위치", value: review.hotel },
        ].map((item, i) => (
          <div key={i} className="bg-cream rounded-lg p-2.5">
            <div className="flex items-center gap-1 text-gray-400 text-xs mb-0.5">
              {item.icon} {item.label}
            </div>
            <div className="font-body font-medium text-charcoal text-xs">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Review content */}
      <div className="font-body text-gray-600 text-sm leading-relaxed mb-4">
        {expanded
          ? review.content.split('\n').map((line, i) => (
              <p key={i} className="mb-2">{line}</p>
            ))
          : <p>{review.content.slice(0, 150)}...</p>
        }
      </div>

      {expanded && (
        <div className="space-y-3 mb-4">
          <div className="bg-green-50 rounded-lg p-3">
            <p className="font-body text-xs font-semibold text-green-700 mb-1">👍 좋았던 점</p>
            <p className="font-body text-xs text-green-600">{review.pros}</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-3">
            <p className="font-body text-xs font-semibold text-amber-700 mb-1">⚠️ 아쉬웠던 점</p>
            <p className="font-body text-xs text-amber-600">{review.cons}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="font-body text-xs font-semibold text-blue-700 mb-1">🔄 다시 간다면 바꿀 점</p>
            <p className="font-body text-xs text-blue-600">{review.changeNext}</p>
          </div>
          <div className="bg-pink-50 rounded-lg p-3">
            <p className="font-body text-xs font-semibold text-pink-700 mb-1">💑 배우자 만족도</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={i < review.spouseRating ? "text-pink-400 fill-pink-400" : "text-gray-200 fill-gray-200"} />
              ))}
              <span className="font-body text-xs text-pink-600 ml-1">{review.spouseRating}/5</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-full bg-forest-green/10 flex items-center justify-center">
              <Users size={13} className="text-forest-green" />
            </div>
            <span className="font-body text-xs text-gray-500">{review.author}</span>
          </div>
          <span className="font-body text-xs text-gray-400">{review.date}</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-gray-400 hover:text-forest-green text-xs font-body transition-colors">
            <ThumbsUp size={12} /> 도움됨 {review.helpful}
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-forest-green text-xs font-body font-medium hover:underline"
          >
            {expanded ? "접기" : "전체 보기"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filtered = activeCategory === "전체"
    ? reviews
    : reviews.filter(r => r.type === activeCategory);

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      {/* Page Header */}
      <div className="bg-forest-green pt-24 pb-12">
        <div className="container">
          <p className="font-accent italic text-golden text-lg mb-2">Real Reviews</p>
          <h1 className="font-display font-bold text-white text-3xl md:text-4xl mb-3">
            부부·연인 후기
          </h1>
          <p className="font-body text-white/75 text-base max-w-2xl">
            직접 다녀온 분들의 솔직한 후기입니다. 좋았던 점, 아쉬웠던 점, 배우자 만족도까지 확인해보세요.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-100 sticky top-16 md:top-20 z-30">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-forest-green text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="container py-10">
        {/* Review Form Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex gap-3">
          <span className="text-2xl">📝</span>
          <div>
            <p className="font-body font-semibold text-amber-800 text-sm mb-1">후기 작성 안내</p>
            <p className="font-body text-amber-700 text-xs leading-relaxed">
              방콕 골프여행을 다녀오셨나요? 여러분의 솔직한 후기가 다른 커플들에게 큰 도움이 됩니다.
              후기 작성 기능은 준비 중입니다.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {filtered.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Review Guide */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-100">
          <h2 className="font-display font-bold text-charcoal text-xl mb-2">
            후기 작성 가이드
          </h2>
          <div className="gold-divider mb-6" />
          <p className="font-body text-gray-600 text-sm mb-4">
            다른 커플들에게 도움이 되는 후기를 작성해주세요. 아래 항목을 참고해서 작성하면 더 유용한 후기가 됩니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "방문 시기 (계절, 날씨 상태)",
              "여행 인원 (부부/연인/가족)",
              "라운딩 횟수와 골프장 이름",
              "숙소 위치와 이동 방법",
              "좋았던 점과 아쉬웠던 점",
              "배우자 만족도 (비골퍼 포함)",
              "예상 비용 (참고용)",
              "다시 간다면 바꿀 점",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 font-body text-sm text-gray-600">
                <span className="text-golden">✓</span> {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
