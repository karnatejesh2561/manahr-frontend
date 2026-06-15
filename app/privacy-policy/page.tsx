import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Privacy Policy',
    description: 'Learn how ManaTech collects, uses, and protects personal data while delivering technology services and product experiences.',
    path: '/privacy-policy',
    keywords: ['privacy policy', 'data protection', 'ManaTech privacy'],
});

export default function PrivacyPolicyPage() {
    return (
        <main className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Notice — ManaTech</h1>
                    <p className="text-base text-black/70 max-w-3xl mx-auto">
                        This notice explains how ManaTech collects, uses, and protects data while giving you full visibility into your privacy rights.
                    </p>
                    <p className="mt-4 text-sm text-slate-500">Last updated: June 15, 2026</p>
                </div>

                <div className="rounded-[2rem] bg-white/80 border border-slate-200 p-8">
                    <div className="space-y-8 text-black/90">
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Introduction</h2>
                            <p className="leading-8 text-black/75">
                                ManaTech respects your privacy and is committed to protecting the personal data you share with us. This notice outlines how information is gathered when you visit our website or contact us about our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Content overview</h2>
                            <ol className="list-decimal list-inside space-y-2 text-black/75">
                                <li>Data controller and contact</li>
                                <li>Data collection</li>
                                <li>Processing purposes</li>
                                <li>Information sharing</li>
                                <li>Third-country transfers</li>
                                <li>Data retention</li>
                                <li>Your privacy rights</li>
                                <li>Policy updates</li>
                            </ol>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">1. Data controller</h2>
                            <p className="leading-8 text-black/75">
                                ManaTech is the data controller for personal information collected through this website. For questions about your data, email us at{' '}
                                <a href="mailto:manatech.services.official@gmail.com" className="text-[#0e67ff] font-semibold">manatech.services.official@gmail.com</a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">2. Data collection</h2>
                            <p className="leading-8 text-black/75 mb-4">
                                We collect the minimum information needed to respond to inquiries and provide a quality site experience.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-black/75">
                                <li><strong>Contact details</strong> — name, email, company, and message.</li>
                                <li><strong>Technical data</strong> — browser, device, IP address, and performance signals.</li>
                                <li><strong>Usage data</strong> — page visits and interaction patterns used for analytics.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">3. Processing purposes</h2>
                            <p className="leading-8 text-black/75 mb-4">
                                We process personal data to communicate with you, evaluate project requests, and improve our website.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-black/75">
                                <li>Respond to contact requests and book consultations.</li>
                                <li>Improve website performance and reliability.</li>
                                <li>Protect the site from security threats and misuse.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">4. Information sharing</h2>
                            <p className="leading-8 text-black/75 mb-4">
                                Personal data is only shared when necessary to deliver services or comply with legal requirements.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-black/75">
                                <li>With trusted service providers for hosting and analytics.</li>
                                <li>When required by law or legal process.</li>
                                <li>To protect our rights, safety, or property.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">5. Third-country transfers</h2>
                            <p className="leading-8 text-black/75">
                                Data may be processed outside the EEA when needed to operate our services. In such cases, we ensure adequate safeguards are in place.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">6. Data retention</h2>
                            <p className="leading-8 text-black/75 mb-4">
                                We keep personal information only as long as necessary for the purpose it was collected. When it is no longer needed, we delete or anonymize it.
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-black/75">
                                <li>Contact details — up to 12 months after last contact.</li>
                                <li>Technical and analytics data — retained briefly to support site performance.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">7. Your privacy rights</h2>
                            <p className="leading-8 text-black/75 mb-4">
                                You may request access, correction, or deletion of your personal data. You can also object to processing when applicable.
                            </p>
                            <p className="leading-8 text-black/75">
                                To exercise your rights, contact us at{' '}
                                <a href="mailto:manatech.services.official@gmail.com" className="text-[#0e67ff] font-semibold">manatech.services.official@gmail.com</a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">8. Policy updates</h2>
                            <p className="leading-8 text-black/75">
                                We may update this notice periodically to reflect changes in our practices or legal requirements. Please check this page regularly for the latest version.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
