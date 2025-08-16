'use client'

import DashboardLayout from '@/app/components/layout/DashboardLayout';

export default function CookiesPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Cookie Preferences</h1>
      <p className="text-gray-300">
        Information about cookie usage and preferences management will be displayed here.
      </p>
    </DashboardLayout>
  );
} 