/**
 * Non-Golfer Guide Page — Tropical Editorial Design
 * 비골퍼 배우자를 위한 방콕 코스 가이드
 */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Clock, MapPin, Star, ArrowRight } from "lucide-react";

const MASSAGE_IMG = "/manus-storage/bangkok-massage-spa_f426cf3b.jpg";
const ROOFTOP_IMG = "/manus-storage/bangkok-rooftop-couple_29b3dd39.jpg";
const NIGHT_MARKET_IMG = "/manus-storage/bangkok-night-market_b938a3b1.jpg";

const daySchedule = [
  {
    time: "07:00",
    activity: "호텔 조식",
    desc: "느긋하게 호텔 조식 즐기기. 배우자는 일찍 골프장으로 출발.",
    type: "food",
  },
  {
    time: "09:00",
    activity: "타이 마사지 (2시간)",
    desc: "숙소 근처 마사지샵에서 타이 마사지 또는 발 마사지. 500~800 THB 수준.",
    type: "spa",
  },
  {
    time: "11:00",
    activity: "쇼핑몰 탐방",
    desc: "터미널21, 엠쿼티어, 파라곤 등 수쿰빗 지역 쇼핑몰 구경.",
    type: "shopping",
  },
  {
    time: "13:00",
    activity: "점심 식사",
    desc: "쇼핑몰 푸드코트 또는 근처 태국 음식점에서 점심. 100~300 THB.",
    type: "food",
  },
  {
    time: "14:00",
    activity: "카페 & 휴식",
    desc: "방콕의 트렌디한 카페에서 여유로운 오후 시간. 방콕 카페 문화 즐기기.",
    type: "cafe",
  },
  {
    time: "16:00",
    activity: "야시장 또는 관광",
    desc: "짜뚜짝 주말 시장, 아시아티크, 왓 포 등 관광지 방문.",
    type: "sightseeing",
  },
  {
    time: "18:30",
    activity: "배우자와 합류",
    desc: "라운딩 마친 배우자와 만나기. 숙소 또는 약속 장소에서 합류.",
    type: "couple",
  },
  {
    time: "19:30",
    activity: "루프탑바 또는 저녁 식사",
    desc: "방콕 야경을 즐기며 하루 마무리. 각자의 하루 이야기 나누기.",
    type: "couple",
  },
];

const massageAreas = [
  {
    name: "수쿰빗 지역",
    desc: "BTS 수쿰빗 라인 주변으로 마사지샵이 밀집되어 있습니다. 아속, 프롬퐁, 통로 역 주변이 특히 많습니다.",
    price: "타이 마사지 2시간 500~800 THB",
    rating: 4.5,
    tags: ["접근성 좋음", "다양한 선택지"],
  },
  {
    name: "실롬/사톤 지역",
    desc: "고급 스파부터 저렴한 마사지샵까지 다양합니다. 룸피니 공원 근처에 좋은 곳들이 많습니다.",
    price: "타이 마사지 2시간 400~700 THB",
    rating: 4.4,
    tags: ["가성비 좋음", "고급 스파도 있음"],
  },
  {
    name: "카오산 로드 근처",
    desc: "여행자 거리 특성상 저렴한 마사지샵이 많습니다. 관광지와 함께 즐기기 좋습니다.",
    price: "타이 마사지 2시간 300~500 THB",
    rating: 4.2,
    tags: ["저렴함", "관광지 연계"],
  },
];

const shoppingMalls = [
  {
    name: "터미널21",
    location: "아속 역",
    desc: "세계 각국 공항 컨셉의 독특한 쇼핑몰. 푸드코트가 저렴하고 맛있기로 유명합니다.",
    highlight: "푸드코트 가성비 최고",
    img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80",
  },
  {
    name: "엠쿼티어",
    location: "프롬퐁 역",
    desc: "고급 브랜드와 레스토랑이 모여 있는 럭셔리 쇼핑몰. 루프탑 레스토랑도 있습니다.",
    highlight: "고급 브랜드 쇼핑",
    img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=400&q=80q=80",
  },
  {
    name: "시암 파라곤",
    location: "시암 역",
    desc: "방콕 최대 쇼핑몰 중 하나. 명품부터 일반 브랜드까지 다양하고 수족관도 있습니다.",
    highlight: "방콕 최대 규모",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
  {
    name: "아이콘시암",
    location: "짜오프라야 강변",
    desc: "강변에 위치한 최신 쇼핑몰. 수상시장 컨셉의 실내 구역이 독특하고 야경이 아름답습니다.",
    highlight: "야경 포인트",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
  },
];

const rooftopBars = [
  {
    name: "버티고 & 문 바 (반얀트리 호텔)",
    location: "실롬",
    desc: "61층 루프탑으로 방콕 최고의 야경을 자랑합니다. 영화 '행오버2' 촬영지로도 유명합니다.",
    price: "칵테일 500~800 THB",
    dresscode: "스마트 캐주얼",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
  },
  {
    name: "오쿠라 프레스티지 루프탑",
    location: "플런칫",
    desc: "35층 인피니티 풀과 함께 즐기는 방콕 야경. 커플 분위기로 최고입니다.",
    price: "칵테일 400~700 THB",
    dresscode: "스마트 캐주얼",
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80",
  },
  {
    name: "티추카 루프탑 바",
    location: "수쿰빗",
    desc: "트렌디한 분위기와 합리적인 가격으로 인기 있는 루프탑 바입니다.",
    price: "칵테일 300~500 THB",
    dresscode: "캐주얼",
    img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=80",
  },
];

const typeIcon = {
  food: "🍽️",
  spa: "💆",
  shopping: "🛍️",
  cafe: "☕",
  sightseeing: "🏛️",
  couple: "💑",
};

const typeColor = {
  food: "bg-orange-100 text-orange-700",
  spa: "bg-pink-100 text-pink-700",
  shopping: "bg-purple-100 text-purple-700",
  cafe: "bg-amber-100 text-amber-700",
  sightseeing: "bg-blue-100 text-blue-700",
  couple: "bg-green-100 text-green-700",
};

export default function NonGolferGuide() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      {/* Page Header with background image */}
      <div className="relative pt-16">
        <div className="h-64 md:h-80 relative overflow-hidden">
          <img src={ROOFTOP_IMG} alt="방콕 루프탑바" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-center">
            <div className="container">
              <p className="font-accent italic text-golden text-lg mb-2">For Non-Golfers</p>
              <h1 className="font-display font-bold text-white text-3xl md:text-4xl mb-3">
                비골퍼 배우자 코스
              </h1>
              <p className="font-body text-white/80 text-base max-w-xl">
                골프를 안 치는 배우자도 방콕에서 완벽한 하루를 보낼 수 있습니다.
                마사지, 쇼핑, 야시장, 루프탑바까지 알찬 동선을 소개합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">

        {/* Day Schedule */}
        <section className="mb-16">
          <div className="mb-8">
            <p className="font-accent italic text-golden text-lg mb-1">Sample Day</p>
            <h2 className="font-display font-bold text-charcoal text-2xl md:text-3xl">
              비골퍼 배우자 하루 코스 예시
            </h2>
            <div className="gold-divider mt-3" />
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-amber-200 hidden md:block" />

            <div className="space-y-4">
              {daySchedule.map((item, i) => (
                <div key={i} className="flex gap-4 md:gap-6">
                  {/* Time */}
                  <div className="w-14 flex-shrink-0 text-right">
                    <span className="font-body font-semibold text-forest-green text-sm">{item.time}</span>
                  </div>

                  {/* Dot */}
                  <div className="hidden md:flex flex-shrink-0 w-6 items-start justify-center pt-1">
                    <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm z-10 ${
                      item.type === 'couple' ? 'bg-forest-green' : 'bg-golden'
                    }`} />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 rounded-xl p-4 ${
                    item.type === 'couple' ? 'bg-green-50 border border-green-100' : 'bg-white border border-gray-100'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{typeIcon[item.type as keyof typeof typeIcon]}</span>
                      <h3 className="font-body font-semibold text-charcoal text-sm">{item.activity}</h3>
                      <span className={`tag-badge text-xs ${typeColor[item.type as keyof typeof typeColor]}`}>
                        {item.type === 'couple' ? '함께' : item.type}
                      </span>
                    </div>
                    <p className="font-body text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Massage Areas */}
        <section className="mb-16">
          <div className="mb-8">
            <p className="font-accent italic text-golden text-lg mb-1">Thai Massage</p>
            <h2 className="font-display font-bold text-charcoal text-2xl md:text-3xl">
              방콕 마사지 추천 지역
            </h2>
            <div className="gold-divider mt-3" />
          </div>

          <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-6">
            <img src={MASSAGE_IMG} alt="태국 마사지" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="container">
                <p className="font-display font-bold text-white text-xl md:text-2xl">
                  타이 마사지 2시간<br />
                  <span className="text-golden">300~800 THB</span>
                </p>
                <p className="font-body text-white/80 text-sm mt-1">한국의 1/5 수준 가격으로 즐기는 정통 타이 마사지</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {massageAreas.map((area, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 card-hover">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-semibold text-charcoal text-base">{area.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-golden fill-golden" />
                    <span className="font-body text-xs text-amber-700">{area.rating}</span>
                  </div>
                </div>
                <p className="font-body text-gray-500 text-sm leading-relaxed mb-3">{area.desc}</p>
                <p className="font-body font-semibold text-forest-green text-sm mb-3">{area.price}</p>
                <div className="flex flex-wrap gap-1.5">
                  {area.tags.map((tag, j) => (
                    <span key={j} className="tag-badge bg-pink-50 text-pink-700">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Shopping Malls */}
        <section className="mb-16">
          <div className="mb-8">
            <p className="font-accent italic text-golden text-lg mb-1">Shopping</p>
            <h2 className="font-display font-bold text-charcoal text-2xl md:text-3xl">
              방콕 쇼핑몰 가이드
            </h2>
            <div className="gold-divider mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {shoppingMalls.map((mall, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover flex">
                <div className="w-28 flex-shrink-0 overflow-hidden">
                  <img src={mall.img} alt={mall.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-display font-semibold text-charcoal text-sm">{mall.name}</h3>
                    <span className="tag-badge bg-purple-50 text-purple-700 flex-shrink-0 text-xs">{mall.highlight}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
                    <MapPin size={11} />{mall.location}
                  </div>
                  <p className="font-body text-gray-500 text-xs leading-relaxed">{mall.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Night Market */}
        <section className="mb-16">
          <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden mb-6">
            <img src={NIGHT_MARKET_IMG} alt="방콕 야시장" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="container">
                <p className="font-accent italic text-golden text-lg mb-1">Night Market</p>
                <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-2">
                  방콕 야시장 데이트 코스
                </h2>
                <p className="font-body text-white/80 text-sm">라운딩 후 배우자와 함께 즐기는 방콕 야시장</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: "아시아티크 더 리버프론트",
                desc: "짜오프라야 강변의 야외 쇼핑몰 겸 야시장. 관람차와 함께 낭만적인 분위기를 즐길 수 있습니다.",
                time: "17:00~24:00",
                tip: "커플 사진 명소",
              },
              {
                name: "짜뚜짝 주말 시장",
                desc: "세계 최대 규모의 주말 시장. 토·일요일에만 열리며 없는 게 없는 쇼핑 천국입니다.",
                time: "토·일 09:00~18:00",
                tip: "주말에만 운영",
              },
              {
                name: "탈링 찬 수상 시장",
                desc: "현지인들이 즐겨 찾는 수상 시장. 신선한 해산물과 태국 음식을 저렴하게 즐길 수 있습니다.",
                time: "토·일 09:00~17:00",
                tip: "현지인 분위기",
              },
            ].map((market, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 card-hover">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-semibold text-charcoal text-sm">{market.name}</h3>
                  <span className="tag-badge bg-amber-50 text-amber-700 text-xs">{market.tip}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
                  <Clock size={11} />{market.time}
                </div>
                <p className="font-body text-gray-500 text-sm leading-relaxed">{market.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rooftop Bars */}
        <section className="mb-16">
          <div className="mb-8">
            <p className="font-accent italic text-golden text-lg mb-1">Rooftop Bars</p>
            <h2 className="font-display font-bold text-charcoal text-2xl md:text-3xl">
              라운딩 후 같이 가기 좋은 루프탑바
            </h2>
            <div className="gold-divider mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {rooftopBars.map((bar, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 card-hover">
                <div className="h-40 overflow-hidden">
                  <img src={bar.img} alt={bar.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-charcoal text-sm mb-1">{bar.name}</h3>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
                    <MapPin size={11} />{bar.location}
                  </div>
                  <p className="font-body text-gray-500 text-xs leading-relaxed mb-3">{bar.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-forest-green font-semibold">{bar.price}</span>
                    <span className="tag-badge bg-gray-100 text-gray-600 text-xs">{bar.dresscode}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Box */}
        <div className="bg-forest-green rounded-2xl p-8 text-white">
          <h2 className="font-display font-bold text-white text-xl mb-2">
            비골퍼 배우자를 위한 실전 팁
          </h2>
          <div className="gold-divider mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: "📱", tip: "마사지샵은 구글맵 리뷰 확인 후 예약하세요" },
              { icon: "💳", tip: "쇼핑몰에서 카드 결제 가능하지만 현금도 준비하세요" },
              { icon: "🚕", tip: "그랩(Grab) 앱으로 이동하면 바가지 없이 편리합니다" },
              { icon: "☀️", tip: "오전 11시 이후는 매우 더우니 실내 활동 위주로 계획하세요" },
              { icon: "🌧️", tip: "우기(5~10월)에는 갑작스러운 소나기에 대비하세요" },
              { icon: "💰", tip: "환전은 출발 전 또는 방콕 공항에서 하는 게 유리합니다" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xl">{item.icon}</span>
                <p className="font-body text-white/80 text-sm leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
