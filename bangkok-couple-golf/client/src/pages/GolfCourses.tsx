/**
 * Golf Courses Page — Tropical Editorial Design
 * 방콕 근교 골프장 정보 게시판
 */
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Star, MapPin, Clock, Car, Users, ChevronDown, ChevronUp } from "lucide-react";

const categories = ["전체", "시내 접근성", "고급 코스", "가성비", "커플 추천", "초보자 환영", "사진 명소"];

const courses = [
  {
    name: "알파인 골프 & 스포츠 클럽",
    nameEn: "Alpine Golf & Sports Club",
    location: "방콕 북부 (돈므앙)",
    distance: "시내에서 약 40분",
    rating: 4.8,
    reviews: 312,
    greenFee: "3,500~5,000 THB",
    caddyFee: "400 THB",
    cartFee: "700 THB",
    categories: ["고급 코스", "커플 추천"],
    img: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",
    desc: "아시아 최고 수준의 코스 중 하나로, 잘 관리된 페어웨이와 아름다운 조경이 특징입니다. 국제 대회가 열릴 만큼 수준 높은 코스이지만 커플·부부 방문객도 많습니다. 클럽하우스 시설이 훌륭하고 레스토랑도 좋아서 라운딩 후 식사까지 즐기기 좋습니다.",
    pros: ["세계 수준의 코스 관리", "훌륭한 클럽하우스", "친절한 캐디"],
    cons: ["그린피가 다소 높은 편", "예약이 빨리 마감됨"],
    coupleNote: "라운딩 후 클럽하우스 레스토랑에서 저녁 식사하기 좋음",
  },
  {
    name: "니칸티 골프 클럽",
    nameEn: "Nikanti Golf Club",
    location: "나콘파톰",
    distance: "시내에서 약 50분",
    rating: 4.7,
    reviews: 245,
    greenFee: "3,000~4,500 THB",
    caddyFee: "400 THB",
    cartFee: "600 THB",
    categories: ["사진 명소", "초보자 환영", "커플 추천"],
    img: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80",
    desc: "독특한 원형 클럽하우스와 아름다운 코스 디자인으로 커플 사진 명소로도 유명합니다. 18홀 전체가 사진 찍기 좋은 포인트로 가득하며, 초보자도 즐길 수 있는 난이도입니다. 캐디들이 친절하고 설명을 잘 해줘서 골프 입문자 커플에게 특히 추천합니다.",
    pros: ["인스타그램 사진 명소", "초보자 친화적", "아름다운 클럽하우스"],
    cons: ["시내에서 거리가 있음", "주말 예약 경쟁 치열"],
    coupleNote: "원형 클럽하우스 앞에서 커플 사진 필수",
  },
  {
    name: "타나 시티 골프 & 스포츠 클럽",
    nameEn: "Thana City Golf & Sports Club",
    location: "방콕 동부",
    distance: "수완나품 공항에서 약 15분",
    rating: 4.5,
    reviews: 189,
    greenFee: "2,000~3,500 THB",
    caddyFee: "350 THB",
    cartFee: "500 THB",
    categories: ["시내 접근성", "가성비", "커플 추천"],
    img: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=800&q=80",
    desc: "수완나품 공항에서 가까워 도착 당일 또는 출발 전 라운딩에 최적입니다. 가성비가 좋고 코스 관리 상태도 훌륭합니다. 리조트 내 수영장과 레스토랑이 있어 비골퍼 배우자도 즐길 수 있습니다.",
    pros: ["공항 접근성 최고", "합리적인 그린피", "리조트 시설 완비"],
    cons: ["코스 난이도가 다소 쉬운 편", "주변 관광지 접근성 낮음"],
    coupleNote: "비골퍼 배우자는 리조트 수영장에서 여유롭게 대기 가능",
  },
  {
    name: "로터스 밸리 골프 리조트",
    nameEn: "Lotus Valley Golf Resort",
    location: "방콕 동부 (촌부리 방향)",
    distance: "시내에서 약 60분",
    rating: 4.4,
    reviews: 156,
    greenFee: "1,800~2,800 THB",
    caddyFee: "350 THB",
    cartFee: "500 THB",
    categories: ["가성비", "초보자 환영"],
    img: "https://images.unsplash.com/photo-1592919505780-303950717480?w=800&q=80",
    desc: "가성비가 뛰어난 골프 리조트로, 숙박과 골프를 함께 즐길 수 있습니다. 한국인 방문객이 많아 한국어 소통이 가능한 경우도 있습니다. 2인 골프 예약이 비교적 쉬운 편입니다.",
    pros: ["가성비 최고", "2인 예약 용이", "한국인 친화적"],
    cons: ["시내에서 거리가 있음", "코스 수준은 평범한 편"],
    coupleNote: "숙박 패키지 이용 시 더욱 경제적",
  },
  {
    name: "나바타니 골프 코스",
    nameEn: "Navatanee Golf Course",
    location: "방콕 동부",
    distance: "시내에서 약 30분",
    rating: 4.3,
    reviews: 134,
    greenFee: "2,500~4,000 THB",
    caddyFee: "400 THB",
    cartFee: "600 THB",
    categories: ["시내 접근성", "고급 코스"],
    img: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&q=80",
    desc: "방콕 시내에서 가까운 고급 코스로, 1970년대부터 운영된 역사 있는 골프장입니다. 태국 오픈이 열렸던 코스로 수준 높은 플레이를 원하는 분들에게 적합합니다.",
    pros: ["시내 접근성 우수", "역사 있는 명문 코스", "좋은 코스 컨디션"],
    cons: ["그린피가 높은 편", "초보자에게는 어려울 수 있음"],
    coupleNote: "라운딩 후 방콕 시내 저녁 식사 연계하기 좋음",
  },
  {
    name: "로얄 방콕 스포츠 클럽",
    nameEn: "The Royal Bangkok Sports Club",
    location: "방콕 시내 (파툼완)",
    distance: "BTS 역에서 도보 가능",
    rating: 4.6,
    reviews: 98,
    greenFee: "회원제 (비회원 제한적)",
    caddyFee: "400 THB",
    cartFee: "포함",
    categories: ["시내 접근성", "고급 코스"],
    img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80",
    desc: "방콕 시내 한복판에 위치한 역사적인 골프장으로, 경마장과 함께 운영됩니다. 비회원 입장이 제한적이지만 방콕에서 가장 독특한 골프 경험을 제공합니다.",
    pros: ["방콕 시내 위치", "독특한 경험", "역사적 가치"],
    cons: ["비회원 입장 어려움", "예약 복잡"],
    coupleNote: "특별한 경험을 원하는 커플에게 추천",
  },
];

function CourseCard({ course }: { course: typeof courses[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-72 h-52 md:h-auto flex-shrink-0 overflow-hidden">
          <img src={course.img} alt={course.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-6 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-display font-bold text-charcoal text-xl">{course.name}</h3>
              <p className="font-accent italic text-gray-400 text-sm">{course.nameEn}</p>
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full">
              <Star size={14} className="text-golden fill-golden" />
              <span className="font-body font-bold text-sm text-amber-700">{course.rating}</span>
              <span className="text-amber-500 text-xs">({course.reviews})</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-3 text-sm font-body text-gray-500">
            <span className="flex items-center gap-1"><MapPin size={13} />{course.location}</span>
            <span className="flex items-center gap-1"><Car size={13} />{course.distance}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {course.categories.map((cat, i) => (
              <span key={i} className="tag-badge bg-green-50 text-green-700">{cat}</span>
            ))}
          </div>

          <p className="font-body text-gray-600 text-sm leading-relaxed mb-4">
            {expanded ? course.desc : course.desc.slice(0, 100) + "..."}
          </p>

          {/* Fee Info */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "그린피", value: course.greenFee },
              { label: "캐디피", value: course.caddyFee },
              { label: "카트비", value: course.cartFee },
            ].map((fee, i) => (
              <div key={i} className="bg-cream rounded-lg p-2.5 text-center">
                <div className="font-body text-xs text-gray-400 mb-0.5">{fee.label}</div>
                <div className="font-body font-semibold text-xs text-charcoal">{fee.value}</div>
              </div>
            ))}
          </div>

          {/* Couple Note */}
          <div className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-4">
            <p className="font-body text-xs text-amber-700">
              <span className="font-semibold">💑 커플 포인트:</span> {course.coupleNote}
            </p>
          </div>

          {expanded && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-body font-semibold text-green-700 text-xs mb-2">👍 좋은 점</h4>
                <ul className="space-y-1">
                  {course.pros.map((p, i) => (
                    <li key={i} className="font-body text-xs text-gray-600 flex items-start gap-1">
                      <span className="text-green-500 mt-0.5">•</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-body font-semibold text-amber-700 text-xs mb-2">⚠️ 아쉬운 점</h4>
                <ul className="space-y-1">
                  {course.cons.map((c, i) => (
                    <li key={i} className="font-body text-xs text-gray-600 flex items-start gap-1">
                      <span className="text-amber-500 mt-0.5">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-forest-green text-sm font-body font-medium hover:underline"
          >
            {expanded ? "접기" : "자세히 보기"}
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GolfCourses() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const filtered = activeCategory === "전체"
    ? courses
    : courses.filter(c => c.categories.includes(activeCategory));

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      {/* Page Header */}
      <div className="bg-forest-green pt-24 pb-12">
        <div className="container">
          <p className="font-accent italic text-golden text-lg mb-2">Golf Courses</p>
          <h1 className="font-display font-bold text-white text-3xl md:text-4xl mb-3">
            방콕 근교 골프장 정보
          </h1>
          <p className="font-body text-white/75 text-base max-w-2xl">
            커플·부부 방문객이 많이 찾는 방콕 근교 주요 골프장을 정리했습니다.
            그린피, 캐디피, 접근성, 커플 포인트까지 한눈에 비교해보세요.
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

      {/* Courses List */}
      <div className="container py-10">
        {/* Info Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-body font-semibold text-amber-800 text-sm mb-1">골프장 예약 전 참고사항</p>
            <p className="font-body text-amber-700 text-xs leading-relaxed">
              그린피는 시즌, 요일, 시간대에 따라 다를 수 있습니다. 캐디피는 대부분 필수이며, 팁(400 THB 이상 권장)은 별도입니다.
              2인 예약 가능 여부는 골프장마다 다르므로 사전 확인이 필요합니다. 이 정보는 참고용이며 실제 예약 시 공식 채널을 통해 확인하세요.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {filtered.map((course, i) => (
            <CourseCard key={i} course={course} />
          ))}
        </div>

        {/* Comparison Tips */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-100">
          <h2 className="font-display font-bold text-charcoal text-xl mb-2">
            골프장 선택할 때 꼭 봐야 할 7가지
          </h2>
          <div className="gold-divider mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { num: "01", title: "2인 예약 가능 여부", desc: "일부 골프장은 4인 이상만 예약 가능한 경우가 있습니다." },
              { num: "02", title: "시내에서의 거리와 교통편", desc: "이동 시간이 길면 하루 일정이 빡빡해질 수 있습니다." },
              { num: "03", title: "캐디 의무 여부", desc: "방콕 대부분의 골프장은 캐디가 필수입니다." },
              { num: "04", title: "비골퍼 배우자 대기 시설", desc: "수영장, 레스토랑, 스파 등 동반자를 위한 시설을 확인하세요." },
              { num: "05", title: "그린피 외 추가 비용", desc: "카트비, 캐디피, 클럽 렌탈비 등을 모두 합산해야 합니다." },
              { num: "06", title: "복장 규정", desc: "대부분 카라 있는 셔츠와 골프화가 필요합니다." },
              { num: "07", title: "예약 방법과 선불 여부", desc: "온라인 예약 가능 여부와 취소 정책을 미리 확인하세요." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <span className="font-accent font-bold text-golden text-2xl leading-none mt-0.5">{item.num}</span>
                <div>
                  <h4 className="font-body font-semibold text-charcoal text-sm mb-1">{item.title}</h4>
                  <p className="font-body text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
