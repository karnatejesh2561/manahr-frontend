import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Terms and Conditions',
    description: 'Review ManaTech terms for using our website and working with our software development services.',
    path: '/terms-and-conditions',
    keywords: ['terms and conditions', 'site terms', 'legal agreement'],
});

export default function TermsAndConditionsPage() {
    return (
        <main className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms & Conditions — ManaTech</h1>
                    <p className="text-base text-black/70 max-w-3xl mx-auto">
                        These terms explain how you can use our site and how ManaTech manages the relationship when you reach out for services.
                    </p>
                    <p className="mt-4 text-sm text-slate-500">Last updated: June 15, 2026</p>
                </div>

                <div className="rounded-[2rem] bg-white/80 border border-slate-200 p-8">
                    <div className="space-y-8 text-black/90">
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
                            <p className="leading-8 text-black/75">
                                These terms apply to the ManaTech website and any initial communications you have with us. They are intended to keep the experience clear and straightforward while protecting both parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Content overview</h2>
                            <ol className="list-decimal list-inside space-y-2 text-black/75">
                                <li>Website use</li>
                                <li>Service requests</li>
                                <li>Content ownership</li>
                                <li>Limitations</li>
                                <li>Changes to terms</li>
                                <li>Contact information</li>
                            </ol>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">1. Website use</h2>
                            <p className="leading-8 text-black/75 mb-4">
                                You may browse our website, read published content, and contact us for inquiries. The site is provided as-is, and while we work to keep it secure and accurate, occasional updates or downtime may occur.
                            </p>
                            <p className="leading-8 text-black/75">
                                ManaTech is not responsible for losses that result from reliance on this website alone. Any project engagement requires a separate written agreement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">2. Service requests</h2>
                            <p className="leading-8 text-black/75 mb-4">
                                Contacting ManaTech does not automatically form a contract. Project scope, pricing, timeline, and deliverables are agreed in writing before work begins.
                            </p>
                            <p className="leading-8 text-black/75">
                                We aim for clear proposals and confirmation of terms before any development work is started.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">3. Content ownership</h2>
                            <p className="leading-8 text-black/75 mb-4">
                                Copyright and ownership of the ManaTech website content belong to ManaTech or our licensors. You may not copy or reuse content without authorization.
                            </p>
                            <p className="leading-8 text-black/75">
                                If you provide ideas or requirements during early discussions, those remain informal until a formal agreement and confidentiality arrangement are signed.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">4. Limitations</h2>
                            <p className="leading-8 text-black/75 mb-4">
                                ManaTech is not liable for indirect losses or damages arising from use of this site. Any professional services liability is limited to the scope of the formal agreement you enter with us.
                            </p>
                            <p className="leading-8 text-black/75">
                                Use of our website is subject to applicable law, and disputes are governed by the relevant legal jurisdiction for ManaTech.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">5. Changes to terms</h2>
                            <p className="leading-8 text-black/75 mb-4">
                                We may update these terms from time to time. The version published on this page is the most current and governs your use of the site.
                            </p>
                            <p className="leading-8 text-black/75">
                                Continued use of the site after updates indicates acceptance of the revised terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">6. Contact</h2>
                            <p className="leading-8 text-black/75 mb-4">
                                For questions or clarifications about these terms, email us at{' '}
                                <a href="mailto:manatech.services.official@gmail.com" className="text-[#0e67ff] font-semibold">manatech.services.official@gmail.com</a>.
                            </p>
                            <div className="rounded-[1.75rem] bg-[#0e67ff] p-6 text-white">
                                <p className="font-semibold">Need more detail?</p>
                                <p className="mt-2 text-sm text-white/90">
                                    We're happy to explain how these terms apply to your project inquiry.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
