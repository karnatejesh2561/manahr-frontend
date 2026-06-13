'use client';

import { organizationSchema } from '@/lib/seo';

export default function SchemaMarkup() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(organizationSchema),
            }}
        />
    );
}
