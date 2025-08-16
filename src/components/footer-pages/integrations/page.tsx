'use client'

import DashboardLayout from '@/app/components/layout/DashboardLayout';

export default function IntegrationsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Integrations</h1>
      <p className="text-gray-300">
        Information about supported exchanges, wallets, and blockchains will be displayed here.
      </p>
    </DashboardLayout>
  );
} 