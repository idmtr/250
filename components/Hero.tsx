import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { Locale } from "@/types"

export default function Hero({ dictionary, lang }: { dictionary: any; lang: Locale }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5EBE0] to-[#D4A373]">
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/ddqw1uuhd/image/upload/v1740252199/images/pages/ylzglgyn7h82m4oakj7w.jpg')] bg-cover bg-center opacity-20"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative container mx-auto px-6 z-10"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl text-[#1F1F1F] font-light leading-tight"
          >
            {dictionary.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-[#1F1F1F]/80 font-light max-w-2xl mx-auto"
          >
            {dictionary.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          >
            <Button className="bg-[#D4A373] text-white hover:bg-[#D4A373]/90 transition-all duration-300 group">
              {dictionary.hero.learnMore}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              className="border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-white transition-all duration-300"
            >
              {dictionary.hero.getInTouch}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

