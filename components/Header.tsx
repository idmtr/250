"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/i18n-config";
import { getLocalizedPath } from "@/lib/url-utils";
import { translateUrl } from "@/lib/url-utils";

interface HeaderProps {
  lang: Locale;
  dictionary: any;
}

export default function Header({ lang, dictionary }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScrolled(window.scrollY > 0);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      href: `/${lang}/${getLocalizedPath("mission", lang)}`,
      label: dictionary.header.mission,
    },
    {
      label: dictionary.header.services,
      children: [
        {
          href: `/${lang}/${getLocalizedPath(
            "coworking-consulting-services",
            lang
          )}`,
          label: dictionary.header.coworkingConsultancy,
        },
        {
          href: `/${lang}/${getLocalizedPath("workshops", lang)}`,
          label: dictionary.header.workshops,
        },
        {
          href: `/${lang}/${getLocalizedPath("education", lang)}`,
          label: dictionary.header.education,
        },
        {
          href: `/${lang}/${getLocalizedPath("speaking-events", lang)}`,
          label: dictionary.header.speakingEvents,
        },
        {
          href: `/${lang}/${getLocalizedPath("get-feedback", lang)}`,
          label: dictionary.header.getFeedback,
        },
      ],
    },
    {
      href: `/${lang}/${getLocalizedPath("retreats", lang)}`,
      label: dictionary.header.communityRetreats,
    },
    {
      href: `/${lang}/${getLocalizedPath("blog", lang)}`,
      label: dictionary.header.blog,
    },
    {
      label: `🌐 ${dictionary.header.language}`,
      children: [
        { href: translateUrl(pathname, lang, "en"), label: "🇬🇧 English" },
        { href: translateUrl(pathname, lang, "fr"), label: "🇫🇷 Français" },
        { href: translateUrl(pathname, lang, "de"), label: "🇩🇪 Deutsch" },
        { href: translateUrl(pathname, lang, "es"), label: "🇪🇸 Español" },
      ],
    },
  ];

  const handleDropdownToggle = (index: string) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleDropdownKeyPress = (
    event: React.KeyboardEvent,
    index: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleDropdownToggle(`${index}`);
    }
  };

  const handleLanguageChange = (newLang: Locale) => {
    const newPath = translateUrl(pathname, lang, newLang);
    router.push(newPath);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#eddfd0cc] backdrop-blur-sm py-2 shadow-sm"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* 
            Updated Implementation:
            Wrap the link in a motion.div that handles the hover state, 
            so both text spans animate together.
          */}
          <motion.div
            className="relative block text-xl font-light tracking-wide"
            initial="initial"
            whileHover="hover"
          >
            <Link href={`/${lang}`}>
              {/* Increased from h-6 to h-10 and added leading-none */}
              <div className="relative h-10 overflow-hidden flex items-center">
                {/* For mobile - static text */}
                <span className="block md:hidden">Twofifty.co</span>
                {/* For desktop - animated text */}
                <div className="hidden md:block relative">
                  <motion.span
                    className="block"
                    variants={{
                      initial: { y: 0 },
                      hover: { y: "-110%" },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    Twofifty.co
                  </motion.span>
                  <motion.span
                    className="absolute left-0 block text-sm text-[#D4A373]"
                    variants={{
                      initial: { y: "150%" },
                      hover: { y: "-80%" },
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {dictionary.header.coworkingConsultancy}
                  </motion.span>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8 text-sm font-light">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.children ? (
                  <button
                    onClick={() => handleDropdownToggle(`${index}`)}
                    onKeyDown={(e) => handleDropdownKeyPress(e, index)}
                    className="flex items-center space-x-1 hover:text-[#D4A373] transition-colors"
                    aria-expanded={openDropdown === `${index}`}
                    aria-haspopup="true"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-[#D4A373] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
                {item.children && openDropdown === `${index}` && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100"
                  >
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href}
                        className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-[#D4A373] transition-colors"
                        onClick={() => {
                          setOpenDropdown(null);
                          setIsMenuOpen(false);
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href={`/${lang}/${getLocalizedPath("contact", lang)}`}>
              <Button
                variant="outline"
                className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                {dictionary.header.getInTouch}
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 hover:bg-[#F5EBE0] rounded-full transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={
              isMenuOpen
                ? dictionary.header.closeMenu
                : dictionary.header.openMenu
            }
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm md:hidden pt-20"
          >
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col space-y-6 text-lg">
                {menuItems.map((item, index) => (
                  <div key={index}>
                    {item.children ? (
                      <div className="space-y-4">
                        <div className="text-[#D4A373] font-light">
                          {item.label}
                        </div>
                        <div className="pl-4 space-y-4">
                          {item.children.map((child, childIndex) =>
                            item.label.includes("Language") ? (
                              <button
                                key={childIndex}
                                className="block w-full text-left text-[#1F1F1F] hover:text-[#D4A373] transition-colors duration-300"
                                onClick={() => {
                                  handleLanguageChange(child.href);
                                  setIsMenuOpen(false);
                                }}
                              >
                                {child.label}
                              </button>
                            ) : (
                              <Link
                                key={childIndex}
                                href={child.href}
                                className="block text-[#1F1F1F] hover:text-[#D4A373] transition-colors duration-300"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {child.label}
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-[#1F1F1F] hover:text-[#D4A373] transition-colors duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                <Link href={`/${lang}/${getLocalizedPath("contact", lang)}`}>
                  <Button
                    className="w-full bg-[#D4A373] text-white hover:bg-[#D4A373]/90 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {dictionary.header.getInTouch}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
