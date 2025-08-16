'use client'

import DashboardLayout from '@/app/components/layout/DashboardLayout';

export default function BlogPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <p className="text-gray-300">
        Blog posts and articles will be displayed here.
      </p>
    </DashboardLayout>
  );
} 