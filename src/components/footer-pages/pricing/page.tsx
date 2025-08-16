'use client'

import DashboardLayout from '@/app/components/layout/DashboardLayout';

export default function PricingPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Pricing</h1>
      <p className="text-gray-300">
        Details about subscription plans and pricing tiers will be displayed here.
      </p>
    </DashboardLayout>
  );
} 