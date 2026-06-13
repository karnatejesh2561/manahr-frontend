import InventoryWrapper from "./inventory-wrapper";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Inventory & Supply Demo',
    description: 'Inventory management dashboard demo for stock, warehouses, suppliers, and purchase workflows.',
    path: '/demos/inventory',
    keywords: ['inventory management', 'supply chain', 'warehouse dashboard'],
    image: '/demos/inventory.png',
});

export default function InventoryPage() {

    return (
        <InventoryWrapper />
    );
}