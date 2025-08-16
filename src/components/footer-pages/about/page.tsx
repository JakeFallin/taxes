'use client'

import DashboardLayout from '@/app/components/layout/DashboardLayout';

export default function AboutPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">About Us</h1>
      <p className="text-gray-300">
        Information about the company, mission, and team will be displayed here.
      </p>
    </DashboardLayout>
  );
} 