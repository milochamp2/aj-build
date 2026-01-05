'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Users, UserPlus, Award, Activity } from 'lucide-react';

const teamMembers = [
  { id: 1, name: 'Alice Johnson', role: 'Engineering Lead', department: 'Engineering', status: 'Active', performance: 95, avatar: 'AJ' },
  { id: 2, name: 'Bob Smith', role: 'Senior Developer', department: 'Engineering', status: 'Active', performance: 88, avatar: 'BS' },
  { id: 3, name: 'Carol Williams', role: 'Product Manager', department: 'Product', status: 'Active', performance: 92, avatar: 'CW' },
  { id: 4, name: 'David Brown', role: 'Designer', department: 'Design', status: 'Active', performance: 90, avatar: 'DB' },
  { id: 5, name: 'Emma Davis', role: 'Marketing Manager', department: 'Marketing', status: 'Active', performance: 87, avatar: 'ED' },
  { id: 6, name: 'Frank Miller', role: 'DevOps Engineer', department: 'Engineering', status: 'Active', performance: 91, avatar: 'FM' },
  { id: 7, name: 'Grace Lee', role: 'Data Scientist', department: 'AI/ML', status: 'Active', performance: 94, avatar: 'GL' },
  { id: 8, name: 'Henry Wilson', role: 'Sales Lead', department: 'Sales', status: 'Active', performance: 85, avatar: 'HW' },
];

const departmentStats = [
  { department: 'Engineering', count: 8, productivity: 92 },
  { department: 'Product', count: 3, productivity: 88 },
  { department: 'Design', count: 4, productivity: 85 },
  { department: 'Marketing', count: 5, productivity: 90 },
  { department: 'Sales', count: 4, productivity: 87 },
];

const teamSkills = [
  { skill: 'Technical', value: 92 },
  { skill: 'Communication', value: 85 },
  { skill: 'Leadership', value: 78 },
  { skill: 'Innovation', value: 88 },
  { skill: 'Collaboration', value: 90 },
];

export default function TeamPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Team Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your team members and track performance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{teamMembers.length}</p>
              <p className="mt-2 text-sm text-green-600">+2 this month</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{departmentStats.length}</p>
              <p className="mt-2 text-sm text-gray-500">Across organization</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Performance</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {Math.round(teamMembers.reduce((sum, m) => sum + m.performance, 0) / teamMembers.length)}%
              </p>
              <p className="mt-2 text-sm text-green-600">+3.2% from last quarter</p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Hires</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">3</p>
              <p className="mt-2 text-sm text-gray-500">In last 30 days</p>
            </div>
            <div className="rounded-full bg-orange-100 p-3">
              <UserPlus className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Department Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" name="Team Size" />
              <Bar dataKey="productivity" fill="#10b981" name="Productivity Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Skills Assessment</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={teamSkills}>
              <PolarGrid />
              <PolarAngleAxis dataKey="skill" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Team Average" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Members</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {member.avatar}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {member.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2" style={{ width: '100px' }}>
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${member.performance}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900">{member.performance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
