"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationItem } from "@/lib/navigation";
import { useClickOutside } from "@/hooks/useClickOutside";

interface NavItemProps {
  item: NavigationItem;
  dictionary: any;
  onClose?: () => void;
}

export function NavItem({ item, dictionary, onClose }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  // Get the nested value from dictionary using the labelKey path
  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  };

  const label = getNestedValue(dictionary, item.labelKey) || item.labelKey;

  if (!item.children) {
    return (
      <Link
        href={item.href || "#"}
        className="text-[#1F1F1F] hover:text-[#D4A373] transition-colors duration-300"
        onClick={onClose}
      >
        {label}
      </Link>
    );
  }

  return (
    <div ref={dropdownRef} className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-[#1F1F1F] hover:text-[#D4A373] transition-colors duration-300"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100"
          >
            {item.children.map((child) => (
              <Link
                key={child.key}
                href={child.href || "#"}
                className="block px-4 py-2 text-sm text-[#1F1F1F] hover:bg-[#F5EBE0] hover:text-[#D4A373] transition-colors duration-300"
                onClick={() => {
                  setIsOpen(false);
                  onClose?.();
                }}
              >
                {getNestedValue(dictionary, child.labelKey) || child.labelKey}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
