
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Do you have to pay taxes on crypto gains?",
      answer: "Yes, the IRS enforces capital gains tax on cryptocurrencies by classifying them as property, not currency. This means crypto sales, trades, or purchases are taxed under standard investment tax rules—either as short-term gains (taxed as income) or long-term gains (lower tax rates if held >1 year)."
    },
    {
      question: "How do you report crypto on taxes?",
      answer: "To report crypto on taxes, track all taxable events, such as selling, trading, or earning crypto. Capital gains go on Form 8949 & Schedule D, while earned crypto is reported as income. Keep detailed records, and consider using crypto tax software for accuracy."
    },
    {
      question: "Do you have to report crypto on taxes if you don't sell?",
      answer: "No, if you only buy and hold crypto, you don't need to report it. However, if you earn crypto (from staking, mining, airdrops, or payments), it's considered taxable income and must be reported, even if you don't sell."
    },
    {
      question: "When do you pay taxes on crypto?",
      answer: "In general, there are four major taxable events you must include when filing your crypto taxes:\n• Selling cryptocurrency for a fiat currency (e.g., USD or EUR)\n• Trading cryptocurrency for other digital assets\n• Using cryptocurrency to buy goods or services\n• Receiving cryptocurrency from a hard fork upgrade or passive income opportunities like mining, staking, or yield farming"
    },
    {
      question: "How much tax do you have to pay on crypto?",
      answer: "Crypto tax rates depend on how long you hold it and your income bracket:\n• Short-term capital gains (held ≤1 year) are taxed as ordinary income (10%–37% in the U.S.).\n• Long-term capital gains (held >1 year) have lower rates (0%, 15%, or 20%).\n• Crypto earned (from mining, staking, or payments) is taxed as income at your regular tax rate."
    },
    {
      question: "How does tax software help with my crypto taxes?",
      answer: "Crypto tax software like CoinTracker automates transaction tracking, calculates capital gains/losses, and generates tax forms (Form 8949 & Schedule D). It syncs with exchanges and wallets, reducing errors and simplifying compliance—saving you time during tax season."
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about crypto taxes and reporting requirements.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white/50 backdrop-blur-sm rounded-lg border shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium text-gray-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
