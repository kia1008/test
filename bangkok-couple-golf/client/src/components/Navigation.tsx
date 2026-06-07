/**
 * Navigation Component — Tropical Editorial Design
 * Fixed top navigation with transparent-to-solid scroll behavior
 * Forest Green + Golden Amber color scheme
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "방콕골프 가이드", href: "/" },
  { label: "골프장 정보", href: "/golf-courses" },
  { label: "부부·연인 후기", href: "/reviews" },
  { label: "비골퍼 배우자 코스", href: "/non-golfer" },
  { label: "일정 추천", href: "/itinerary" },
  { label: "예산 계산기", href: "/budget" },
  { label: "커뮤니티", href: "/community" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-2 group">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                    scrolled
                      ? "bg-forest-green text-white"
                      : "bg-white/20 text-white border border-white/40"
                  }`}
                >
                  ⛳
                </div>
                <div>
                  <div
                    className={`font-display font-bold text-lg leading-tight transition-colors duration-300 ${
                      scrolled ? "text-forest-green" : "text-white"
                    }`}
                  >
                    방콕커플골프
                  </div>
                  <div
                    className={`font-body text-xs leading-tight transition-colors duration-300 ${
                      scrolled ? "text-gray-500" : "text-white/80"
                    }`}
                  >
                    부부·연인 방콕 골프여행 정보
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    className={`px-3 py-2 rounded-md text-sm font-body font-medium transition-all duration-200 ${
                      location === item.href
                        ? scrolled
                          ? "text-forest-green bg-green-50"
                          : "text-white bg-white/20"
                        : scrolled
                        ? "text-gray-700 hover:text-forest-green hover:bg-green-50"
                        : "text-white/90 hover:text-white hover:bg-white/15"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/15"
              }`}
              aria-label="메뉴 열기"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 w-72 h-full bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <span className="font-display font-bold text-forest-green text-lg">
                메뉴
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-800"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    className={`flex items-center px-5 py-3.5 text-sm font-body font-medium transition-colors ${
                      location === item.href
                        ? "text-forest-green bg-green-50 border-r-2 border-forest-green"
                        : "text-gray-700 hover:text-forest-green hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
            <div className="p-5 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-body">
                본 사이트는 방콕 골프여행 정보 커뮤니티입니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
