'use client'

import DashboardLayout from '@/app/components/layout/DashboardLayout';

export default function GlossaryPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Crypto Glossary</h1>
      <p className="text-gray-300">
        A glossary of cryptocurrency and tax-related terms will be displayed here.
      </p>
    </DashboardLayout>
  );
} 