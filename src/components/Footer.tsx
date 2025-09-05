'use client'

import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
// Placeholder icons for social media - Replace with actual icons if desired

// Footer link structure (Copied from app/page.tsx)
const footerNavigation = {
  product: [
    { nameKey: 'footer.link.integrations', href: '/footer-pages/integrations' },
    { nameKey: 'footer.link.taxCalculator', href: '/footer-pages/tax-calculator' },
    { nameKey: 'footer.link.tracker', href: '/footer-pages/portfolio-tracker' },
    { nameKey: 'footer.link.profit', href: '/footer-pages/profit-calculator' },
    { nameKey: 'footer.link.accountants', href: '/footer-pages/for-accountants' },
    { nameKey: 'footer.link.businesses', href: '/footer-pages/for-businesses' },
  ],
  resources: [
    { nameKey: 'footer.link.pricing', href: '/footer-pages/pricing' },
    { nameKey: 'footer.link.support', href: '/footer-pages/support' },
    { nameKey: 'footer.link.taxAccountants', href: '/footer-pages/tax-accountants' },
    { nameKey: 'footer.link.taxGuide', href: '/footer-pages/tax-guide' },
    { nameKey: 'footer.link.glossary', href: '/footer-pages/glossary' },
    { nameKey: 'footer.link.discuss', href: '/footer-pages/discuss' },
    { nameKey: 'footer.link.feedback', href: '/footer-pages/feedback' },
    { nameKey: 'footer.link.compare', href: '/footer-pages/compare' },
  ],
  company: [
    { nameKey: 'footer.link.blog', href: '/footer-pages/blog' },
    { nameKey: 'footer.link.about', href: '/footer-pages/about' },
    { nameKey: 'footer.link.partners', href: '/footer-pages/partners' },
    { nameKey: 'footer.link.affiliates', href: '/footer-pages/affiliates' },
    { nameKey: 'footer.link.media', href: '/footer-pages/media' },
    { nameKey: 'footer.link.contact', href: '/footer-pages/contact' },
  ],
  legal: [
    { nameKey: 'footer.link.privacy', href: '/footer-pages/privacy' },
    { nameKey: 'footer.link.terms', href: '/footer-pages/terms' },
    { nameKey: 'footer.link.disclaimer', href: '/footer-pages/disclaimer' },
    { nameKey: 'footer.link.security', href: '/footer-pages/security' },
    { nameKey: 'footer.link.cookies', href: '/footer-pages/cookies' },
  ],
}

export default function Footer() {
  const { t } = useLanguage();
  return (
     <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="mx-auto max-w-7xl px-6 pb-6 pt-6 sm:pt-8 lg:px-8 lg:pt-10">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* Left Side: Logo, Name, Social */}
            <div className="space-y-6 mb-8 xl:mb-0">
              {/* Simple Text Logo Placeholder */}
              <div className="flex items-center gap-3">
                 <span className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-500 text-2xl font-bold text-white">
                   K
                 </span>
                 <span className="text-2xl font-bold text-black-500">Kryptools</span> {/* Use Kryptools name */}
              </div>
              <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                {t('footer.tagline')}
              </p>
              <div className="flex space-x-6">
                {/* Placeholder Social Links - Replace href and icons */}
                <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  <span className="sr-only">Twitter</span>
                  <Globe className="h-6 w-6" aria-hidden="true" /> 
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  <span className="sr-only">Facebook</span>
                  <Globe className="h-6 w-6" aria-hidden="true" /> 
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  <span className="sr-only">GitHub</span>
                  <Globe className="h-6 w-6" aria-hidden="true" /> 
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  <span className="sr-only">LinkedIn</span>
                  <Globe className="h-6 w-6" aria-hidden="true" /> 
                </a>
              </div>
            </div>

            {/* Right Side: Links Grid */}
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {/* Product Column */}
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">{t('footer.product')}</h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {footerNavigation.product.map((item) => (
                      <li key={item.nameKey}>
                        <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                          {t(item.nameKey as any)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Resources Column */}
                <div className="mt-8 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">{t('footer.resources')}</h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {footerNavigation.resources.map((item) => (
                      <li key={item.nameKey}>
                        <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                          {t(item.nameKey as any)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {/* Company Column */}
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">{t('footer.company')}</h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {footerNavigation.company.map((item) => (
                      <li key={item.nameKey}>
                        <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                          {t(item.nameKey as any)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Legal Column */}
                <div className="mt-8 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">{t('footer.legal')}</h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.nameKey}>
                        <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                          {t(item.nameKey as any)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Copyright */}
          <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 sm:mt-12 lg:mt-14">
            <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Kryptools. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
  );
} 