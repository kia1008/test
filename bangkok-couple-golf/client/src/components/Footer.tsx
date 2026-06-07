/**
 * Footer Component — Tropical Editorial Design
 * Dark forest green background with legal disclaimer
 */
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-forest-green-dark text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⛳</span>
              <div>
                <div className="font-display font-bold text-xl text-white">방콕커플골프</div>
                <div className="text-white/60 text-xs font-body">부부·연인 방콕 골프여행 정보 커뮤니티</div>
              </div>
            </div>
            <p className="text-white/70 text-sm font-body leading-relaxed">
              둘이 함께 떠나는 방콕 골프여행,<br />
              준비는 여기서 시작하세요.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              빠른 메뉴
            </h4>
            <ul className="space-y-2">
              {[
                { label: "방콕골프 가이드", href: "/" },
                { label: "골프장 정보", href: "/golf-courses" },
                { label: "부부·연인 후기", href: "/reviews" },
                { label: "비골퍼 배우자 코스", href: "/non-golfer" },
                { label: "일정 추천", href: "/itinerary" },
                { label: "예산 계산기", href: "/budget" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="text-white/70 hover:text-golden text-sm font-body transition-colors">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              사이트 안내
            </h4>
            <p className="text-white/70 text-sm font-body leading-relaxed mb-3">
              본 사이트는 방콕 골프여행 관련 정보를 공유하는 커뮤니티입니다.
            </p>
            <p className="text-white/70 text-sm font-body leading-relaxed mb-3">
              항공권, 숙박, 골프장, 차량, 가이드 등 여행상품의 직접 판매 또는 예약대행을 제공하지 않습니다.
            </p>
            <p className="text-white/60 text-xs font-body leading-relaxed">
              게시된 정보는 이용자의 참고용이며, 실제 예약 및 계약은 각 공식 판매처 또는 등록 여행사를 통해 직접 확인하시기 바랍니다.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/15 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/50 text-xs font-body">
              © 2025 방콕커플골프. 본 사이트는 여행상품 판매 사이트가 아닌 정보 제공 커뮤니티입니다.
            </p>
            <p className="text-white/40 text-xs font-body">
              예약·계약·결제 대행은 제공하지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
