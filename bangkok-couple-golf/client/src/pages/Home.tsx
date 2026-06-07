/**
 * Home Page — Tropical Editorial Design
 * 방콕커플골프 메인 페이지
 * 
 * Sections:
 * 1. Hero — Full-screen with golf course background
 * 2. Target Audience — Who this site is for
 * 3. Popular Content — Featured articles
 * 4. Golf Courses Preview — Top courses
 * 5. Non-Golfer Section — Spouse activities
 * 6. Community Reviews — Real experiences
 * 7. Budget Preview — Cost calculator teaser
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowRight, Star, MapPin, Users, Calculator, ChevronDown } from "lucide-react";

// Image URLs from generated assets
const HERO_IMG = "/manus-storage/hero-golf-bangkok_aef3ba40.jpg";
const COUPLE_GOLF_IMG = "/manus-storage/couple-golf-course_91e9dbb5.jpg";
const ROOFTOP_IMG = "/manus-storage/bangkok-rooftop-couple_29b3dd39.jpg";
const MASSAGE_IMG = "/manus-storage/bangkok-massage-spa_f426cf3b.jpg";
const NIGHT_MARKET_IMG = "/manus-storage/bangkok-night-market_b938a3b1.jpg";

function useIntersection(ref: React.RefObject<Element | null>, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function FadeSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIntersection(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const targetAudience = [
  { icon: "👫", text: "부부가 함께 해외 골프를 준비하는 분" },
  { icon: "💑", text: "연인과 골프+휴양 여행을 계획하는 분" },
  { icon: "🏌️", text: "배우자는 골프를 안 치지만 함께 즐길 일정을 찾는 분" },
  { icon: "🔍", text: "패키지보다 직접 비교하고 준비하고 싶은 분" },
  { icon: "🏨", text: "방콕 골프장과 호텔 위치를 미리 알고 싶은 분" },
];

const popularContent = [
  {
    title: "방콕 부부 골프여행 준비 체크리스트",
    desc: "출발 전 꼭 확인해야 할 준비물부터 현지 팁까지 한눈에 정리했습니다.",
    tag: "필독 가이드",
    tagColor: "bg-green-100 text-green-800",
    img: COUPLE_GOLF_IMG,
    href: "/golf-courses",
  },
  {
    title: "골프 안 치는 배우자를 위한 방콕 하루 코스",
    desc: "남편 라운딩 중 아내 혼자 마사지·쇼핑·야시장을 즐기는 알찬 동선.",
    tag: "비골퍼 코스",
    tagColor: "bg-amber-100 text-amber-800",
    img: MASSAGE_IMG,
    href: "/non-golfer",
  },
  {
    title: "방콕 골프여행 2인 예상비용 계산법",
    desc: "항공권부터 그린피, 마사지, 식비까지 현실적인 예산을 계산해보세요.",
    tag: "예산 정보",
    tagColor: "bg-blue-100 text-blue-800",
    img: NIGHT_MARKET_IMG,
    href: "/budget",
  },
];

const golfCourses = [
  {
    name: "알파인 골프 & 스포츠 클럽",
    nameEn: "Alpine Golf & Sports Club",
    location: "방콕 북부",
    rating: 4.8,
    tags: ["고급 코스", "커플 추천"],
    greenFee: "약 3,500~5,000 THB",
    desc: "아시아 최고 수준의 코스 중 하나로, 잘 관리된 페어웨이와 아름다운 조경이 특징입니다.",
    img: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80",
  },
  {
    name: "니칸티 골프 클럽",
    nameEn: "Nikanti Golf Club",
    location: "나콘파톰",
    rating: 4.7,
    tags: ["사진 명소", "초보자 환영"],
    greenFee: "약 3,000~4,500 THB",
    desc: "독특한 원형 클럽하우스와 아름다운 코스 디자인으로 커플 사진 명소로도 유명합니다.",
    img: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=80",
  },
  {
    name: "타나 시티 골프 & 스포츠 클럽",
    nameEn: "Thana City Golf & Sports Club",
    location: "방콕 동부 (공항 근처)",
    rating: 4.5,
    tags: ["공항 접근성", "가성비"],
    greenFee: "약 2,000~3,500 THB",
    desc: "수완나품 공항에서 가까워 도착 당일 또는 출발 전 라운딩에 최적입니다.",
    img: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=600&q=80",
  },
];

const reviews = [
  {
    title: "50대 부부 방콕 골프 4박 6일 후기",
    author: "골프부부K",
    date: "2025년 3월",
    type: "부부",
    rating: 5,
    excerpt: "남편은 라운딩 3회, 저는 마사지와 쇼핑으로 각자의 시간을 즐기다가 저녁엔 루프탑바에서 함께 만났어요. 이게 진짜 커플 골프여행이더라고요.",
    satisfaction: "배우자 만족도: ★★★★★",
  },
  {
    title: "여자친구와 첫 해외 골프 다녀온 후기",
    author: "골린이커플",
    date: "2025년 1월",
    type: "연인",
    rating: 4,
    excerpt: "여자친구가 골프를 전혀 모르는데도 캐디 언니들이 너무 친절하게 도와줘서 같이 즐겁게 라운딩 했어요. 방콕 골프장은 초보자도 환영해줘서 좋아요.",
    satisfaction: "배우자 만족도: ★★★★☆",
  },
  {
    title: "남편 라운딩 중 아내 혼자 마사지·쇼핑 후기",
    author: "비골퍼아내",
    date: "2024년 11월",
    type: "비골퍼",
    rating: 5,
    excerpt: "처음엔 골프장에서 뭘 하나 걱정했는데, 숙소 근처 마사지샵에서 2시간, 터미널21에서 쇼핑하고 나니 남편 라운딩이 끝나있더라고요. 완벽한 하루였어요.",
    satisfaction: "배우자 만족도: ★★★★★",
  },
];

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        <img
          src={HERO_IMG}
          alt="방콕 골프 코스 전경"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${heroLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setHeroLoaded(true)}
        />
        {/* Gradient overlay — left-heavy for text contrast */}
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="container">
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6"
                style={{ animation: "fadeInUp 0.8s ease 0.2s both" }}
              >
                <span className="text-golden text-sm font-body font-medium">⛳ Bangkok Couple Golf</span>
              </div>

              {/* Main heading */}
              <h1
                className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-4"
                style={{ animation: "fadeInUp 0.8s ease 0.4s both" }}
              >
                부부와 연인을 위한<br />
                <span className="text-golden font-accent italic">방콕 골프여행</span><br />
                정보 커뮤니티
              </h1>

              {/* Sub heading */}
              <p
                className="text-white/85 text-base md:text-lg font-body leading-relaxed mb-8 max-w-xl"
                style={{ animation: "fadeInUp 0.8s ease 0.6s both" }}
              >
                방콕 골프장, 호텔, 마사지, 쇼핑, 맛집, 야시장, 커플 동선까지.<br />
                직접 다녀온 후기와 실전 정보를 모아 편하게 비교해보세요.
              </p>

              {/* CTA Buttons */}
              <div
                className="flex flex-wrap gap-3"
                style={{ animation: "fadeInUp 0.8s ease 0.8s both" }}
              >
                <Link href="/golf-courses">
                  <button className="flex items-center gap-2 bg-forest-green hover:bg-forest-green-dark text-white px-6 py-3 rounded-full font-body font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    골프장 정보 보기
                    <ArrowRight size={16} />
                  </button>
                </Link>
                <Link href="/community">
                  <button className="flex items-center gap-2 bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white border border-white/30 px-6 py-3 rounded-full font-body font-semibold text-sm transition-all duration-200">
                    커뮤니티 보기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-xs font-body">스크롤</span>
          <ChevronDown size={18} />
        </div>
      </section>

      {/* ===== TARGET AUDIENCE ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <FadeSection>
            <div className="text-center mb-12">
              <p className="font-accent italic text-golden text-lg mb-2">Who is this for?</p>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-charcoal mb-3">
                방콕 골프여행, 이런 분들에게 추천합니다
              </h2>
              <div className="gold-divider mx-auto" />
            </div>
          </FadeSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {targetAudience.map((item, i) => (
              <FadeSection key={i} delay={i * 80}>
                <div className="bg-cream rounded-xl p-5 text-center card-hover border border-amber-100/60">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <p className="font-body text-sm text-gray-700 leading-relaxed">{item.text}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR CONTENT ===== */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="container">
          <FadeSection>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-accent italic text-golden text-lg mb-1">Popular Content</p>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-charcoal">
                  인기 콘텐츠
                </h2>
              </div>
              <Link href="/golf-courses">
                <span className="text-forest-green text-sm font-body font-medium hover:underline flex items-center gap-1">
                  전체 보기 <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularContent.map((item, i) => (
              <FadeSection key={i} delay={i * 100}>
                <Link href={item.href}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-gray-100 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <span className={`absolute top-3 left-3 tag-badge ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-display font-semibold text-charcoal text-base mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="font-body text-gray-500 text-sm leading-relaxed flex-1">
                        {item.desc}
                      </p>
                      <div className="mt-4 flex items-center text-forest-green text-sm font-body font-medium">
                        자세히 보기 <ArrowRight size={14} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GOLF COURSES PREVIEW ===== */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <FadeSection>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-accent italic text-golden text-lg mb-1">Golf Courses</p>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-charcoal">
                  커플·부부 추천 골프장
                </h2>
                <p className="text-gray-500 font-body text-sm mt-1">방콕 근교 주요 골프장 정보</p>
              </div>
              <Link href="/golf-courses">
                <span className="text-forest-green text-sm font-body font-medium hover:underline flex items-center gap-1">
                  전체 보기 <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </FadeSection>

          <div className="space-y-5">
            {golfCourses.map((course, i) => (
              <FadeSection key={i} delay={i * 100}>
                <Link href="/golf-courses">
                  <div className="bg-cream rounded-2xl overflow-hidden card-hover border border-amber-100/60 flex flex-col md:flex-row">
                    <div className="md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                      <img
                        src={course.img}
                        alt={course.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-display font-bold text-charcoal text-lg">{course.name}</h3>
                          <p className="font-accent italic text-gray-400 text-sm">{course.nameEn}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                          <Star size={14} className="text-golden fill-golden" />
                          <span className="font-body font-semibold text-sm text-amber-700">{course.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 text-sm font-body mb-3">
                        <MapPin size={13} />
                        <span>{course.location}</span>
                      </div>
                      <p className="font-body text-gray-600 text-sm leading-relaxed mb-4">{course.desc}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {course.tags.map((tag, j) => (
                          <span key={j} className="tag-badge bg-green-50 text-green-700">{tag}</span>
                        ))}
                        <span className="ml-auto text-forest-green font-body font-semibold text-sm">
                          그린피 {course.greenFee}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NON-GOLFER SECTION ===== */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={ROOFTOP_IMG} alt="방콕 루프탑바" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 container">
          <div className="max-w-xl">
            <FadeSection>
              <p className="font-accent italic text-golden text-lg mb-2">For Non-Golfers</p>
              <h2 className="font-display font-bold text-white text-3xl md:text-4xl mb-4">
                골프 안 치는 배우자도<br />만족하는 방콕 여행
              </h2>
              <div className="gold-divider mb-6" />
              <p className="font-body text-white/80 text-base leading-relaxed mb-6">
                남편은 라운딩, 아내는 마사지·쇼핑 가능한 방콕 동선부터

                라운딩 후 같이 가기 좋은 루프탑바, 야시장 데이트 코스까지.

                비골퍼 배우자도 100% 만족하는 일정을 소개합니다.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {["커플 마사지 추천", "방콕 야시장 코스", "루프탑바 데이트", "쇼핑몰 가이드"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/80 font-body text-sm">
                    <span className="text-golden">✓</span> {item}
                  </div>
                ))}
              </div>
              <Link href="/non-golfer">
                <button className="flex items-center gap-2 bg-golden hover:bg-amber-500 text-white px-6 py-3 rounded-full font-body font-semibold text-sm transition-all duration-200 shadow-lg">
                  비골퍼 배우자 코스 보기
                  <ArrowRight size={16} />
                </button>
              </Link>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY REVIEWS ===== */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="container">
          <FadeSection>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-accent italic text-golden text-lg mb-1">Real Reviews</p>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-charcoal">
                  직접 다녀온 부부·연인 후기
                </h2>
              </div>
              <Link href="/reviews">
                <span className="text-forest-green text-sm font-body font-medium hover:underline flex items-center gap-1">
                  후기 더 보기 <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <FadeSection key={i} delay={i * 100}>
                <Link href="/reviews">
                  <div className="bg-white rounded-2xl p-6 shadow-sm card-hover border border-gray-100 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`tag-badge ${

                        review.type === "부부" ? "bg-green-100 text-green-700" :

                        review.type === "연인" ? "bg-pink-100 text-pink-700" :

                        "bg-amber-100 text-amber-700"

                      }`}>

                        {review.type}

                      </span>

                      <div className="flex">

                        {[...Array(5)].map((_, j) => (

                          <Star

                            key={j}

                            size={13}

                            className={j < review.rating ? "text-golden fill-golden" : "text-gray-200 fill-gray-200"}

                          />

                        ))}

                      </div>

                    </div>

                    <h3 className="font-display font-semibold text-charcoal text-base mb-3 leading-snug">

                      {review.title}

                    </h3>

                    <p className="font-body text-gray-500 text-sm leading-relaxed flex-1 mb-4">

                      "{review.excerpt}"

                    </p>

                    <div className="border-t border-gray-100 pt-3 flex items-center justify-between">

                      <div className="flex items-center gap-1.5">

                        <div className="w-7 h-7 rounded-full bg-forest-green/10 flex items-center justify-center">

                          <Users size={13} className="text-forest-green" />

                        </div>

                        <span className="font-body text-xs text-gray-500">{review.author}</span>

                      </div>

                      <span className="font-body text-xs text-gray-400">{review.date}</span>

                    </div>

                    <p className="font-body text-xs text-golden mt-2">{review.satisfaction}</p>

                  </div>

                </Link>

              </FadeSection>

            ))}

          </div>

        </div>

      </section>

      {/* ===== BUDGET CALCULATOR TEASER ===== */}

      <section className="py-16 md:py-20 bg-forest-green">

        <div className="container">

          <div className="max-w-3xl mx-auto text-center">

            <FadeSection>

              <p className="font-accent italic text-golden text-lg mb-2">Budget Calculator</p>

              <h2 className="font-display font-bold text-white text-3xl md:text-4xl mb-4">

                방콕 골프여행 2인 예상비용<br />직접 계산해보세요

              </h2>

              <div className="gold-divider mx-auto mb-6" />

              <p className="font-body text-white/75 text-base leading-relaxed mb-8">

                항공권, 호텔, 그린피, 캐디피, 마사지, 식비까지<br />

                항목별로 입력하면 2인 예상 총비용을 바로 확인할 수 있습니다.

              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                {[

                  { label: "항공권", value: "약 40~80만원" },

                  { label: "호텔 (4박)", value: "약 30~80만원" },

                  { label: "그린피 (2회)", value: "약 15~30만원" },

                  { label: "마사지·식비", value: "약 10~20만원" },

                ].map((item, i) => (

                  <div key={i} className="bg-white/10 rounded-xl p-4 text-center">

                    <div className="font-body text-white/60 text-xs mb-1">{item.label}</div>

                    <div className="font-display font-bold text-white text-sm">{item.value}</div>

                  </div>

                ))}

              </div>

              <Link href="/budget">

                <button className="flex items-center gap-2 bg-golden hover:bg-amber-500 text-white px-8 py-3.5 rounded-full font-body font-semibold text-base transition-all duration-200 shadow-lg mx-auto">

                  <Calculator size={18} />

                  예산 계산기 사용하기

                </button>

              </Link>

            </FadeSection>

          </div>

        </div>

      </section>

      <Footer />

    </div>

  );

}
