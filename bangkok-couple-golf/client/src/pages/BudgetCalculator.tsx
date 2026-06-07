/**
 * Budget Calculator Page — Tropical Editorial Design
 * 방콕 골프여행 2인 예상비용 계산기
 */
import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calculator, Info } from "lucide-react";

interface BudgetItem {
  label: string;
  key: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  desc: string;
  category: "flight" | "hotel" | "golf" | "activity" | "food" | "transport";
}

const budgetItems: BudgetItem[] = [
  {
    label: "항공권 (2인 왕복)",
    key: "flight",
    defaultValue: 120,
    min: 60,
    max: 300,
    step: 10,
    unit: "만원",
    desc: "직항 기준 2인 왕복 항공권 예상 비용. 시즌과 예약 시기에 따라 크게 달라집니다.",
    category: "flight",
  },
  {
    label: "호텔 숙박비",
    key: "hotel",
    defaultValue: 60,
    min: 20,
    max: 200,
    step: 5,
    unit: "만원",
    desc: "1박 기준으로 입력하세요. 박수는 아래에서 설정합니다.",
    category: "hotel",
  },
  {
    label: "그린피 (1인 1회)",
    key: "greenFee",
    defaultValue: 15,
    min: 5,
    max: 50,
    step: 1,
    unit: "만원",
    desc: "골프장 그린피. 카트비 포함 여부 확인 필요. 1인 기준입니다.",
    category: "golf",
  },
  {
    label: "캐디피 (1인 1회)",
    key: "caddyFee",
    defaultValue: 2,
    min: 1,
    max: 5,
    step: 0.5,
    unit: "만원",
    desc: "캐디피는 대부분 필수입니다. 팁(400 THB 이상)은 별도로 계산하세요.",
    category: "golf",
  },
  {
    label: "카트비 (1인 1회)",
    key: "cartFee",
    defaultValue: 1.5,
    min: 0,
    max: 5,
    step: 0.5,
    unit: "만원",
    desc: "카트비가 그린피에 포함된 경우 0으로 설정하세요.",
    category: "golf",
  },
  {
    label: "마사지 (1인 1회)",
    key: "massage",
    defaultValue: 3,
    min: 1,
    max: 10,
    step: 0.5,
    unit: "만원",
    desc: "타이 마사지 2시간 기준. 고급 스파는 더 비쌀 수 있습니다.",
    category: "activity",
  },
  {
    label: "식비 (1인 1일)",
    key: "food",
    defaultValue: 5,
    min: 2,
    max: 20,
    step: 0.5,
    unit: "만원",
    desc: "하루 식비 1인 기준. 고급 레스토랑 위주면 더 높게 설정하세요.",
    category: "food",
  },
  {
    label: "차량/교통비 (1일)",
    key: "transport",
    defaultValue: 4,
    min: 1,
    max: 15,
    step: 0.5,
    unit: "만원",
    desc: "그랩, BTS, 골프장 이동 포함. 골프장 거리에 따라 달라집니다.",
    category: "transport",
  },
  {
    label: "쇼핑·기타 (1인 총)",
    key: "shopping",
    defaultValue: 20,
    min: 0,
    max: 100,
    step: 5,
    unit: "만원",
    desc: "쇼핑, 관광, 입장료 등 기타 비용 1인 기준 총액.",
    category: "activity",
  },
];

const categoryColors = {
  flight: "bg-blue-100 text-blue-700",
  hotel: "bg-purple-100 text-purple-700",
  golf: "bg-green-100 text-green-700",
  activity: "bg-pink-100 text-pink-700",
  food: "bg-orange-100 text-orange-700",
  transport: "bg-amber-100 text-amber-700",
};

const categoryLabels = {
  flight: "항공",
  hotel: "숙박",
  golf: "골프",
  activity: "액티비티",
  food: "식비",
  transport: "교통",
};

export default function BudgetCalculator() {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(budgetItems.map((item) => [item.key, item.defaultValue]))
  );
  const [nights, setNights] = useState(4);
  const [rounds, setRounds] = useState(2);
  const [massageTimes, setMassageTimes] = useState(3);

  const result = useMemo(() => {
    const flight = values.flight;
    const hotel = values.hotel * nights;
    const golf = (values.greenFee + values.caddyFee + values.cartFee) * rounds * 2; // 2인
    const massage = values.massage * massageTimes * 2; // 2인
    const food = values.food * (nights + 1) * 2; // 2인, 여행 일수
    const transport = values.transport * (nights + 1);
    const shopping = values.shopping * 2; // 2인

    const total = flight + hotel + golf + massage + food + transport + shopping;
    const perPerson = total / 2;

    return {
      flight,
      hotel,
      golf,
      massage,
      food,
      transport,
      shopping,
      total,
      perPerson,
    };
  }, [values, nights, rounds, massageTimes]);

  const formatWon = (value: number) => {
    if (value >= 100) {
      return `${value.toFixed(0)}만원`;
    }
    return `${value.toFixed(1)}만원`;
  };

  const totalPercent = (value: number) => ((value / result.total) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />

      {/* Page Header */}
      <div className="bg-forest-green pt-24 pb-12">
        <div className="container">
          <p className="font-accent italic text-golden text-lg mb-2">Budget Calculator</p>
          <h1 className="font-display font-bold text-white text-3xl md:text-4xl mb-3">
            방콕 골프여행 예산 계산기
          </h1>
          <p className="font-body text-white/75 text-base max-w-2xl">
            항목별로 직접 입력해서 2인 예상 총비용을 확인해보세요.
            이 계산기는 참고용이며, 실제 비용은 시즌·예약 시기·선택에 따라 달라질 수 있습니다.
          </p>
        </div>
      </div>

      <div className="container py-10">
        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex gap-3">
          <Info size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="font-body text-amber-700 text-sm leading-relaxed">
            이 계산기는 <strong>참고용 예상 비용 도구</strong>입니다. 실제 비용은 여행 시기, 항공사, 호텔 등급, 골프장 선택에 따라 크게 달라질 수 있습니다.
            항공권과 호텔은 각 공식 판매처에서 직접 확인하시기 바랍니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Settings */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-display font-bold text-charcoal text-lg mb-5">여행 기본 설정</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "숙박 일수", value: nights, setter: setNights, min: 1, max: 10, unit: "박" },
                  { label: "라운딩 횟수 (1인)", value: rounds, setter: setRounds, min: 1, max: 6, unit: "회" },
                  { label: "마사지 횟수 (1인)", value: massageTimes, setter: setMassageTimes, min: 0, max: 8, unit: "회" },
                ].map((setting, i) => (
                  <div key={i} className="text-center">
                    <label className="font-body text-xs text-gray-500 block mb-2">{setting.label}</label>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setting.setter(Math.max(setting.min, setting.value - 1))}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-lg flex items-center justify-center transition-colors"
                      >
                        −
                      </button>
                      <span className="font-display font-bold text-charcoal text-xl w-12 text-center">
                        {setting.value}
                        <span className="text-xs font-body font-normal text-gray-400 ml-0.5">{setting.unit}</span>
                      </span>
                      <button
                        onClick={() => setting.setter(Math.min(setting.max, setting.value + 1))}
                        className="w-8 h-8 rounded-full bg-forest-green hover:bg-forest-green-dark text-white font-bold text-lg flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Items */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-display font-bold text-charcoal text-lg mb-5">항목별 비용 입력</h2>
              <div className="space-y-5">
                {budgetItems.map((item) => (
                  <div key={item.key}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`tag-badge ${categoryColors[item.category]}`}>
                          {categoryLabels[item.category]}
                        </span>
                        <label className="font-body font-medium text-charcoal text-sm">{item.label}</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={values[item.key]}
                          onChange={(e) => setValues(prev => ({ ...prev, [item.key]: Number(e.target.value) }))}
                          min={item.min}
                          max={item.max}
                          step={item.step}
                          className="w-20 text-right border border-gray-200 rounded-lg px-2 py-1 font-body text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest-green/30"
                        />
                        <span className="font-body text-xs text-gray-400 w-8">{item.unit}</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={item.min}
                      max={item.max}
                      step={item.step}
                      value={values[item.key]}
                      onChange={(e) => setValues(prev => ({ ...prev, [item.key]: Number(e.target.value) }))}
                      className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-forest-green"
                    />
                    <p className="font-body text-xs text-gray-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-5">
            {/* Total */}
            <div className="bg-forest-green rounded-2xl p-6 text-white sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Calculator size={20} className="text-golden" />
                <h2 className="font-display font-bold text-white text-lg">예상 총비용</h2>
              </div>

              <div className="text-center mb-6">
                <p className="font-body text-white/60 text-sm mb-1">2인 총 예상비용</p>
                <p className="font-display font-bold text-white text-4xl">
                  {formatWon(result.total)}
                </p>
                <p className="font-body text-golden text-sm mt-1">
                  1인 약 {formatWon(result.perPerson)}
                </p>
                <p className="font-body text-white/50 text-xs mt-1">
                  {nights}박 {nights + 1}일 / 라운딩 {rounds}회 기준
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5">
                {[
                  { label: "항공권", value: result.flight, color: "bg-blue-400" },
                  { label: "숙박", value: result.hotel, color: "bg-purple-400" },
                  { label: "골프 (2인)", value: result.golf, color: "bg-green-400" },
                  { label: "마사지 (2인)", value: result.massage, color: "bg-pink-400" },
                  { label: "식비 (2인)", value: result.food, color: "bg-orange-400" },
                  { label: "교통", value: result.transport, color: "bg-amber-400" },
                  { label: "쇼핑·기타 (2인)", value: result.shopping, color: "bg-red-400" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body text-white/80 text-xs">{item.label}</span>
                      <span className="font-body font-semibold text-white text-xs">{formatWon(item.value)}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${item.color} transition-all duration-500`}
                        style={{ width: `${totalPercent(item.value)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-white/20">
                <p className="font-body text-white/50 text-xs text-center leading-relaxed">
                  이 금액은 예상 참고값입니다.<br />
                  실제 비용은 선택에 따라 달라집니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Tips */}
        <div className="mt-10 bg-white rounded-2xl p-8 border border-gray-100">
          <h2 className="font-display font-bold text-charcoal text-xl mb-2">
            방콕 골프여행 예산 절약 팁
          </h2>
          <div className="gold-divider mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: "항공권은 3개월 전 예약", desc: "직항 기준 3개월 전 예약이 가장 저렴한 경우가 많습니다. 경유 항공편을 이용하면 더 저렴할 수 있습니다." },
              { title: "골프장 평일 라운딩", desc: "주말보다 평일 그린피가 30~40% 저렴합니다. 이른 아침 시간대(오전 6~8시)도 할인이 있는 경우가 많습니다." },
              { title: "숙소는 BTS 역 근처로", desc: "BTS 역 근처 숙소를 선택하면 교통비를 크게 절약할 수 있습니다. 수쿰빗 지역이 접근성과 가성비 모두 좋습니다." },
              { title: "환전은 방콕 현지에서", desc: "슈퍼리치 등 방콕 현지 환전소를 이용하면 한국보다 환율이 유리한 경우가 많습니다." },
              { title: "마사지는 현지 샵 이용", desc: "호텔 스파보다 현지 마사지샵이 훨씬 저렴합니다. 구글맵 리뷰 4.0 이상인 곳을 선택하면 안전합니다." },
              { title: "식비는 현지 음식 위주로", desc: "태국 현지 음식은 매우 저렴하고 맛있습니다. 쇼핑몰 푸드코트나 현지 식당을 이용하면 식비를 크게 줄일 수 있습니다." },
            ].map((tip, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-golden font-display font-bold text-lg leading-none mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-body font-semibold text-charcoal text-sm mb-1">{tip.title}</h4>
                  <p className="font-body text-gray-500 text-xs leading-relaxed">{tip.desc}</p>
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
