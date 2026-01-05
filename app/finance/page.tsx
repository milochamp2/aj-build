'use client';

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 4200, expenses: 2400, profit: 1800 },
  { month: 'Feb', revenue: 3800, expenses: 2100, profit: 1700 },
  { month: 'Mar', revenue: 5100, expenses: 2800, profit: 2300 },
  { month: 'Apr', revenue: 4600, expenses: 2500, profit: 2100 },
  { month: 'May', revenue: 6200, expenses: 3100, profit: 3100 },
  { month: 'Jun', revenue: 7100, expenses: 3400, profit: 3700 },
];

const expenseBreakdown = [
  { name: 'Salaries', value: 12000, color: '#3b82f6' },
  { name: 'Marketing', value: 4500, color: '#10b981' },
  { name: 'Operations', value: 3200, color: '#f59e0b' },
  { name: 'Technology', value: 2800, color: '#8b5cf6' },
  { name: 'Other', value: 1500, color: '#ef4444' },
];

export default function FinancePage() {
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Finance Dashboard</h1>
        <p className="mt-2 text-gray-600">Track your revenue, expenses, and financial performance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">${totalRevenue.toLocaleString()}</p>
              <div className="mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="ml-1 text-sm text-green-600">+12.5%</span>
              </div>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">${totalExpenses.toLocaleString()}</p>
              <div className="mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 text-red-500" />
                <span className="ml-1 text-sm text-red-600">+5.2%</span>
              </div>
            </div>
            <div className="rounded-full bg-red-100 p-3">
              <Wallet className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">${totalProfit.toLocaleString()}</p>
              <div className="mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="ml-1 text-sm text-green-600">+18.3%</span>
              </div>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Profit Margin</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {((totalProfit / totalRevenue) * 100).toFixed(1)}%
              </p>
              <div className="mt-2 flex items-center">
                <TrendingDown className="h-4 w-4 text-yellow-500" />
                <span className="ml-1 text-sm text-yellow-600">-2.1%</span>
              </div>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Revenue vs Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Profit</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="profit" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Expense Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Summary</h2>
          <div className="space-y-4">
            {expenseBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="h-4 w-4 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  ${item.value.toLocaleString()}
                </span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-gray-900">Total Expenses</span>
                <span className="text-base font-bold text-gray-900">
                  ${expenseBreakdown.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
