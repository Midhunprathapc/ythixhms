import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    { q: "What's included in the rent?", a: "Your rent covers high-speed Wi-Fi, all utilities (water, electricity, heating), bi-weekly room cleaning, and access to all building amenities like the gym and study lounges." },
    { q: "Can I bring guests?", a: "Yes, you can have guests over. However, overnight guests must be registered at the reception for security purposes and are limited to 3 nights per month." },
    { q: "How do I report a maintenance issue?", a: "You can easily report any maintenance issues through your Student Portal dashboard under the 'Maintenance' section." },
    { q: "Is the security deposit refundable?", a: "Yes, your security deposit is fully refundable at the end of your tenancy, provided there is no damage to the room or outstanding balances." },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="font-display text-4xl md:text-5xl text-center mb-12">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary transition-colors cursor-pointer group">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  {faq.q}
                </h3>
                <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              {/* Note: In a real app, this would be an accordion. For static UI, we'll just show it. */}
              <p className="mt-4 text-muted-foreground pl-8">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
