/**
 * Itinerary Page — Tropical Editorial Design
 * 방콕 커플 일정 추천 (직접 예약 참고용)
 */
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Clock, MapPin, Info, Sun, Moon } from "lucide-react";

const COUPLE_GOLF_IMG = "/manus-storage/couple-golf-course_91e9dbb5.jpg";

const itineraries = [
  {
    id: "3n5d",
    title: "3박 5일 알찬 일정",
    subtitle: "라운딩 2회 + 방콕 핵심 관광",
    duration: "3박 5일",
    rounds: 2,
    style: "알찬형",
    styleColor: "bg-blue-100 text-blue-700",
    desc: "처음 방콕 골프여행을 떠나는 커플에게 추천하는 알찬 일정입니다. 골프 2회와 방콕 핵심 관광을 모두 즐길 수 있습니다.",
    days: [
      {
        day: 1,
        title: "도착 & 첫 라운딩",
        isGolfDay: true,
        schedule: [
          { time: "오전", icon: "✈️", activity: "인천 출발 → 방콕 수완나품 공항 도착", type: "transport" },
          { time: "오전", icon: "⛳", activity: "공항 근처 타나 시티 골프장 라운딩 (도착 당일 추천)", type: "golf" },
          { time: "오후", icon: "🏨", activity: "숙소 체크인 (수쿰빗 지역 추천)", type: "hotel" },
          { time: "저녁", icon: "🍽️", activity: "수쿰빗 지역 태국 음식 저녁 식사", type: "food" },
          { time: "밤", icon: "🌃", activity: "나나 플라자 또는 아속 지역 야경 산책", type: "activity" },
        ],
      },
      {
        day: 2,
        title: "자유 관광 & 야시장",
        isGolfDay: false,
        schedule: [
          { time: "오전", icon: "💆", activity: "타이 마사지 (2시간)", type: "spa" },
          { time: "오전", icon: "🛍️", activity: "터미널21 또는 엠쿼티어 쇼핑", type: "shopping" },
          { time: "오후", icon: "🏛️", activity: "왓 포 또는 왓 아룬 사원 관광", type: "sightseeing" },
          { time: "저녁", icon: "🌊", activity: "아시아티크 야시장 방문", type: "activity" },
          { time: "밤", icon: "🍺", activity: "루프탑바에서 방콕 야경 감상", type: "activity" },
        ],
      },
      {
        day: 3,
        title: "두 번째 라운딩",
        isGolfDay: true,
        schedule: [
          { time: "오전", icon: "⛳", activity: "알파인 또는 니칸티 골프장 라운딩", type: "golf" },
          { time: "오후", icon: "☕", activity: "트렌디한 방콕 카페 방문", type: "cafe" },
          { time: "오후", icon: "💆", activity: "커플 마사지 (2시간)", type: "spa" },
          { time: "저녁", icon: "🍽️", activity: "고급 태국 레스토랑 저녁 식사", type: "food" },
        ],
      },
      {
        day: 4,
        title: "쇼핑 & 출발 준비",
        isGolfDay: false,
        schedule: [
          { time: "오전", icon: "🛍️", activity: "마지막 쇼핑 (시암 파라곤, 센트럴월드)", type: "shopping" },
          { time: "오후", icon: "🏛️", activity: "짜오프라야 강변 카페 또는 아이콘시암 방문", type: "sightseeing" },
          { time: "저녁", icon: "✈️", activity: "공항 이동 및 귀국 준비", type: "transport" },
        ],
      },
      {
        day: 5,
        title: "귀국",
        isGolfDay: false,
        schedule: [
          { time: "새벽/아침", icon: "✈️", activity: "방콕 출발 → 인천 도착", type: "transport" },
        ],
      },
    ],
  },
  {
    id: "4n6d",
    title: "4박 6일 여유 일정",
    subtitle: "라운딩 3회 + 충분한 휴양",
    duration: "4박 6일",
    rounds: 3,
    style: "여유형",
    styleColor: "bg-green-100 text-green-700",
    desc: "방콕 골프여행을 여유롭게 즐기고 싶은 커플에게 추천합니다. 라운딩 3회와 충분한 휴양 시간을 갖는 일정입니다.",
    days: [
      {
        day: 1,
        title: "도착 & 첫 라운딩",
        isGolfDay: true,
        schedule: [
          { time: "오전", icon: "✈️", activity: "인천 출발 → 방콕 도착", type: "transport" },
          { time: "오전", icon: "⛳", activity: "타나 시티 골프장 라운딩 (공항 근처)", type: "golf" },
          { time: "오후", icon: "🏨", activity: "숙소 체크인", type: "hotel" },
          { time: "저녁", icon: "🍽️", activity: "숙소 근처 저녁 식사", type: "food" },
        ],
      },
      {
        day: 2,
        title: "관광 & 마사지",
        isGolfDay: false,
        schedule: [
          { time: "오전", icon: "🏛️", activity: "왓 포, 왓 아룬 사원 관광", type: "sightseeing" },
          { time: "오후", icon: "💆", activity: "타이 마사지 (2시간)", type: "spa" },
          { time: "오후", icon: "☕", activity: "방콕 카페 투어", type: "cafe" },
          { time: "저녁", icon: "🌊", activity: "짜오프라야 강변 저녁 식사", type: "food" },
          { time: "밤", icon: "🌃", activity: "아시아티크 야시장", type: "activity" },
        ],
      },
      {
        day: 3,
        title: "두 번째 라운딩",
        isGolfDay: true,
        schedule: [
          { time: "오전", icon: "⛳", activity: "니칸티 골프장 라운딩 (사진 명소)", type: "golf" },
          { time: "오후", icon: "🛍️", activity: "엠쿼티어 쇼핑", type: "shopping" },
          { time: "저녁", icon: "🍺", activity: "루프탑바 저녁", type: "activity" },
        ],
      },
      {
        day: 4,
        title: "쇼핑 & 스파",
        isGolfDay: false,
        schedule: [
          { time: "오전", icon: "🛍️", activity: "시암 파라곤, 센트럴월드 쇼핑", type: "shopping" },
          { time: "오후", icon: "💆", activity: "커플 스파 (2시간)", type: "spa" },
          { time: "저녁", icon: "🍽️", activity: "고급 태국 레스토랑", type: "food" },
          { time: "밤", icon: "🎡", activity: "아이콘시암 야경", type: "activity" },
        ],
      },
      {
        day: 5,
        title: "세 번째 라운딩",
        isGolfDay: true,
        schedule: [
          { time: "오전", icon: "⛳", activity: "알파인 골프장 라운딩 (최고급 코스)", type: "golf" },
          { time: "오후", icon: "☕", activity: "여유로운 카페 시간", type: "cafe" },
          { time: "저녁", icon: "🍽️", activity: "마지막 저녁 식사 (특별한 레스토랑)", type: "food" },
        ],
      },
      {
        day: 6,
        title: "귀국",
        isGolfDay: false,
        schedule: [
          { time: "오전", icon: "🛍️", activity: "마지막 쇼핑 또는 마사지", type: "shopping" },
          { time: "오후", icon: "✈️", activity: "공항 이동 및 귀국", type: "transport" },
        ],
      },
    ],
  },
];

const typeColors: Record<string, string> = {
  transport: "bg-gray-100 text-gray-600",
  golf: "bg-green-100 text-green-700",
  hotel: "bg-purple-100 text-purple-700",
  food: "bg-orange-100 text-orange-700",
  spa: "bg-pink-100 text-pink-700",
  shopping: "bg-blue-100 text-blue-700",
  sightseeing: "bg-amber-100 text-amber-700",
  activity: "bg-red-100 text-red-700",
  cafe: "bg-yellow-100 text-yellow-700",
};

export default function Itinerary() {
  const [selectedItinerary, setSelectedItinerary] = useState("3n5d");
  const current = itineraries.find(i => i.id === selectedItinerary)!;

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      {/* Page Header */}
      <div className="relative pt-16">
        <div className="h-56 md:h-72 relative overflow-hidden">
          <img src={COUPLE_GOLF_IMG} alt="커플 골프" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-center">
            <div className="container">
              <p className="font-accent italic text-golden text-lg mb-2">Itinerary Guide</p>
              <h1 className="font-display font-bold text-white text-3xl md:text-4xl mb-3">
                방콕 커플 일정 추천
              </h1>
              <p className="font-body text-white/80 text-base max-w-xl">
                직접 예약할 때 참고할 수 있는 예시 일정입니다.
                부부·연인 여행자가 많이 선호하는 동선을 정리했습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10">
        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex gap-3">
          <Info size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="font-body text-amber-700 text-sm leading-relaxed">
            이 일정은 <strong>직접 예약 시 참고할 수 있는 예시 일정</strong>입니다. 여행상품이 아니며, 모집·예약·결제 대행을 제공하지 않습니다.
            항공권, 호텔, 골프장은 각 공식 채널을 통해 직접 예약하시기 바랍니다.
          </p>
        </div>

        {/* Itinerary Selector */}
        <div className="flex gap-4 mb-8">
          {itineraries.map((itin) => (
            <button
              key={itin.id}
              onClick={() => setSelectedItinerary(itin.id)}
              className={`flex-1 md:flex-none rounded-xl p-4 border-2 transition-all duration-200 text-left ${
                selectedItinerary === itin.id
                  ? "border-forest-green bg-white shadow-md"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`tag-badge ${itin.styleColor}`}>{itin.style}</span>
                <span className="font-body text-xs text-gray-500">{itin.duration}</span>
              </div>
              <h3 className="font-display font-semibold text-charcoal text-base">{itin.title}</h3>
              <p className="font-body text-gray-500 text-xs mt-0.5">{itin.subtitle}</p>
            </button>
          ))}
        </div>

        {/* Itinerary Description */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h2 className="font-display font-bold text-charcoal text-xl">{current.title}</h2>
            <span className={`tag-badge ${current.styleColor}`}>{current.style}</span>
            <span className="tag-badge bg-gray-100 text-gray-600">{current.duration}</span>
            <span className="tag-badge bg-green-50 text-green-700">라운딩 {current.rounds}회</span>
          </div>
          <p className="font-body text-gray-600 text-sm leading-relaxed">{current.desc}</p>
        </div>

        {/* Day by Day */}
        <div className="space-y-6">
          {current.days.map((day) => (
            <div key={day.day} className={`rounded-2xl overflow-hidden border ${
              day.isGolfDay ? "border-green-200" : "border-gray-100"
            }`}>
              {/* Day Header */}
              <div className={`px-6 py-4 flex items-center gap-3 ${
                day.isGolfDay ? "bg-forest-green text-white" : "bg-white text-charcoal"
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-lg flex-shrink-0 ${
                  day.isGolfDay ? "bg-white/20 text-white" : "bg-cream text-forest-green"
                }`}>
                  {day.day}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-xs opacity-70">Day {day.day}</span>
                    {day.isGolfDay && (
                      <span className="tag-badge bg-white/20 text-white text-xs">⛳ 라운딩 데이</span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-base">{day.title}</h3>
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-white p-4">
                <div className="space-y-3">
                  {day.schedule.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-16 text-right">
                        <span className="font-body text-xs text-gray-400">{item.time}</span>
                      </div>
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-cream flex items-center justify-center text-sm">
                        {item.icon}
                      </div>
                      <div className="flex-1 flex items-center gap-2 flex-wrap">
                        <p className="font-body text-sm text-charcoal">{item.activity}</p>
                        <span className={`tag-badge text-xs ${typeColors[item.type] || "bg-gray-100 text-gray-600"}`}>
                          {item.type === "golf" ? "골프" :
                           item.type === "spa" ? "마사지" :
                           item.type === "shopping" ? "쇼핑" :
                           item.type === "food" ? "식사" :
                           item.type === "transport" ? "이동" :
                           item.type === "hotel" ? "숙박" :
                           item.type === "sightseeing" ? "관광" :
                           item.type === "cafe" ? "카페" : "액티비티"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Planning Tips */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-display font-bold text-charcoal text-lg mb-4 flex items-center gap-2">
              <Sun size={18} className="text-golden" /> 건기 vs 우기
            </h3>
            <div className="space-y-3">
              {[
                { season: "건기 (11월~2월)", desc: "최적의 골프 시즌. 날씨가 맑고 시원합니다. 성수기라 항공권과 호텔이 비쌀 수 있습니다.", color: "bg-blue-50 border-blue-200" },
                { season: "우기 (5월~10월)", desc: "오전에는 맑고 오후에 소나기가 오는 경우가 많습니다. 비수기라 가격이 저렴합니다.", color: "bg-amber-50 border-amber-200" },
                { season: "전환기 (3~4월, 11월)", desc: "날씨가 불안정할 수 있지만 가격과 날씨의 균형이 좋습니다.", color: "bg-green-50 border-green-200" },
              ].map((item, i) => (
                <div key={i} className={`rounded-lg p-3 border ${item.color}`}>
                  <p className="font-body font-semibold text-charcoal text-sm mb-1">{item.season}</p>
                  <p className="font-body text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h3 className="font-display font-bold text-charcoal text-lg mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-forest-green" /> 숙소 위치 추천
            </h3>
            <div className="space-y-3">
              {[
                { area: "수쿰빗 (아속, 프롬퐁)", desc: "쇼핑, 마사지, 맛집이 밀집된 최고의 위치. 비골퍼 배우자에게 특히 좋습니다.", color: "bg-green-50 border-green-200" },
                { area: "실롬/사톤", desc: "비즈니스 지구로 교통이 편리합니다. 고급 레스토랑과 루프탑바가 많습니다.", color: "bg-blue-50 border-blue-200" },
                { area: "골프장 근처 리조트", desc: "이동 시간을 줄이고 싶다면 골프장 내 또는 근처 리조트 숙박을 고려해보세요.", color: "bg-amber-50 border-amber-200" },
              ].map((item, i) => (
                <div key={i} className={`rounded-lg p-3 border ${item.color}`}>
                  <p className="font-body font-semibold text-charcoal text-sm mb-1">{item.area}</p>
                  <p className="font-body text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="mt-6 bg-forest-green rounded-2xl p-8 text-white">
          <h3 className="font-display font-bold text-white text-xl mb-2">
            방콕 골프여행 준비 체크리스트
          </h3>
          <div className="gold-divider mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {[
              "여권 유효기간 6개월 이상 확인",
              "항공권 직접 예약 (항공사 또는 비교 사이트)",
              "호텔 직접 예약 (호텔 공식 사이트 또는 예약 사이트)",
              "골프장 예약 (공식 사이트 또는 이메일)",
              "여행자보험 가입",
              "태국 바트 환전 (출발 전 또는 현지)",
              "골프 복장 및 골프화 준비",
              "골프백 수하물 규정 확인",
              "그랩(Grab) 앱 설치",
              "태국 유심 또는 eSIM 준비",
              "캐디피 팁용 현금 준비 (400 THB 이상)",
              "마사지샵 미리 검색 및 예약",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 py-1">
                <div className="w-4 h-4 rounded border border-white/40 flex-shrink-0" />
                <span className="font-body text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
