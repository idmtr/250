import type { Locale } from "@/i18n-config"

export default function Footer({ lang, dictionary }: { lang: Locale; dictionary: any }) {
  return (
    <footer className="py-12 border-t border-primary/10 bg-accent/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl tracking-wide font-light mb-6 md:mb-0">
            <span className="text-primary">Twofifty.co</span>
          </div>
          <div className="flex space-x-8 text-sm font-light">
            <a 
              href={dictionary.social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-primary transition-colors duration-300"
            >
              {dictionary.footer.linkedin}
            </a>

            <a 
              href={dictionary.social.contact}
              className="text-gray-600 hover:text-primary transition-colors duration-300"
            >
              {dictionary.footer.contact}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
