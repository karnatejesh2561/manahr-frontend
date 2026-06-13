import OTPWrapper from "./otp-wrapper";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'OTP Authentication Demo',
    description: 'OTP verification demo page for secure login and multi-factor authentication flows.',
    path: '/demos/auth/otp',
    keywords: ['otp demo', 'two-factor authentication', 'mfa login'],
});

export default function OTPPage() {
    return (
        <OTPWrapper />
    );
}
