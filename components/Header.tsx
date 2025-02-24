"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale } from "@/i18n-config";
import { getNavigation, getLanguageMenu } from "@/lib/navigation";
import { NavItem } from "@/components/navigation/NavItem";

interface HeaderProps {
  lang: Locale;
  dictionary: any;
}

export default function Header({ lang, dictionary }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = getNavigation(lang);
  const languageMenu = getLanguageMenu(pathname, lang);

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
          <motion.div
            className="relative block text-xl font-light tracking-wide"
            initial="initial"
            whileHover="hover"
          >
            <Link href={`/${lang}`}>
              <div className="relative h-10 overflow-hidden flex items-center">
                <span className="block md:hidden">Twofifty.co</span>
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
            {navigation.map((item) => (
              <NavItem key={item.key} item={item} dictionary={dictionary} />
            ))}
            <NavItem item={languageMenu} dictionary={dictionary} />
            <Link href={`/${lang}/contact`}>
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
                {navigation.map((item) => (
                  <div key={item.key} className="py-2">
                    <NavItem
                      item={item}
                      dictionary={dictionary}
                      onClose={() => setIsMenuOpen(false)}
                    />
                  </div>
                ))}
                <div className="py-2">
                  <NavItem
                    item={languageMenu}
                    dictionary={dictionary}
                    onClose={() => setIsMenuOpen(false)}
                  />
                </div>
                <Link href={`/${lang}/contact`}>
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
