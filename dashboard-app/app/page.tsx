import Link from 'next/link';
import { DollarSign, Users, Brain, TrendingUp } from 'lucide-react';

export default function Home() {
  const stats = [
    { name: 'Total Revenue', value: '$45,231', change: '+20.1%', icon: DollarSign, href: '/finance', color: 'bg-blue-500' },
    { name: 'Team Members', value: '24', change: '+4.5%', icon: Users, href: '/team', color: 'bg-green-500' },
    { name: 'AI Projects', value: '12', change: '+12.3%', icon: Brain, href: '/ai-works', color: 'bg-purple-500' },
    { name: 'Growth Rate', value: '58%', change: '+8.2%', icon: TrendingUp, href: '/', color: 'bg-orange-500' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600">Welcome back! Here's what's happening with your business today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className={`rounded-lg ${stat.color} p-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500"> from last month</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          <div className="mt-4 space-y-3">
            <Link href="/finance" className="block rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
              <h3 className="font-medium text-gray-900">View Financial Reports</h3>
              <p className="text-sm text-gray-500">Check revenue, expenses, and profit trends</p>
            </Link>
            <Link href="/team" className="block rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
              <h3 className="font-medium text-gray-900">Manage Team</h3>
              <p className="text-sm text-gray-500">View team members and performance metrics</p>
            </Link>
            <Link href="/ai-works" className="block rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
              <h3 className="font-medium text-gray-900">AI Projects Dashboard</h3>
              <p className="text-sm text-gray-500">Monitor AI model performance and projects</p>
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-start">
              <div className="rounded-full bg-blue-100 p-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">New payment received</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="rounded-full bg-green-100 p-2">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">New team member added</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="rounded-full bg-purple-100 p-2">
                <Brain className="h-4 w-4 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">AI model training completed</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
