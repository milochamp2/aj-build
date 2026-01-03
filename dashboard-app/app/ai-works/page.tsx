'use client';

import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Brain, Cpu, Zap, GitBranch, TrendingUp } from 'lucide-react';

const modelPerformance = [
  { week: 'Week 1', accuracy: 82, precision: 78, recall: 80 },
  { week: 'Week 2', accuracy: 85, precision: 82, recall: 83 },
  { week: 'Week 3', accuracy: 88, precision: 85, recall: 86 },
  { week: 'Week 4', accuracy: 91, precision: 88, recall: 89 },
  { week: 'Week 5', accuracy: 93, precision: 91, recall: 92 },
  { week: 'Week 6', accuracy: 95, precision: 93, recall: 94 },
];

const projectsData = [
  { month: 'Jan', active: 3, completed: 1, planned: 2 },
  { month: 'Feb', active: 4, completed: 2, planned: 3 },
  { month: 'Mar', active: 5, completed: 3, planned: 2 },
  { month: 'Apr', active: 6, completed: 4, planned: 4 },
  { month: 'May', active: 7, completed: 5, planned: 3 },
  { month: 'Jun', active: 8, completed: 6, planned: 5 },
];

const trainingProgress = [
  { epoch: '10', loss: 0.85, validation: 0.88 },
  { epoch: '20', loss: 0.72, validation: 0.76 },
  { epoch: '30', loss: 0.58, validation: 0.63 },
  { epoch: '40', loss: 0.45, validation: 0.52 },
  { epoch: '50', loss: 0.35, validation: 0.42 },
  { epoch: '60', loss: 0.28, validation: 0.36 },
  { epoch: '70', loss: 0.22, validation: 0.31 },
  { epoch: '80', loss: 0.18, validation: 0.28 },
];

const aiProjects = [
  { id: 1, name: 'Customer Sentiment Analysis', type: 'NLP', status: 'Active', accuracy: 94, progress: 85 },
  { id: 2, name: 'Product Recommendation Engine', type: 'ML', status: 'Active', accuracy: 91, progress: 72 },
  { id: 3, name: 'Fraud Detection System', type: 'Deep Learning', status: 'Active', accuracy: 96, progress: 90 },
  { id: 4, name: 'Image Classification Model', type: 'Computer Vision', status: 'Training', accuracy: 88, progress: 65 },
  { id: 5, name: 'Chatbot Assistant', type: 'NLP', status: 'Active', accuracy: 92, progress: 95 },
  { id: 6, name: 'Predictive Analytics', type: 'ML', status: 'Testing', accuracy: 89, progress: 78 },
];

export default function AIWorksPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Works Dashboard</h1>
        <p className="mt-2 text-gray-600">Monitor AI projects, model performance, and training metrics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">12</p>
              <p className="mt-2 text-sm text-green-600">+3 this quarter</p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Models Deployed</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">28</p>
              <p className="mt-2 text-sm text-blue-600">+5 this month</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Cpu className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Accuracy</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">93.2%</p>
              <p className="mt-2 text-sm text-green-600">+2.5% improvement</p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">API Requests</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900">1.2M</p>
              <p className="mt-2 text-sm text-orange-600">+18% from last week</p>
            </div>
            <div className="rounded-full bg-orange-100 p-3">
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Model Performance Metrics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={modelPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[70, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#8b5cf6" strokeWidth={2} />
              <Line type="monotone" dataKey="precision" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="recall" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Status Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="active" fill="#3b82f6" name="Active" />
              <Bar dataKey="completed" fill="#10b981" name="Completed" />
              <Bar dataKey="planned" fill="#f59e0b" name="Planned" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Training Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trainingProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="loss" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Training Loss" />
              <Area type="monotone" dataKey="validation" stackId="2" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Validation Loss" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Neural Networks</p>
                  <p className="text-lg font-semibold text-gray-900">8 Active</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <GitBranch className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Experiments</p>
                  <p className="text-lg font-semibold text-gray-900">45 Running</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">GPU Utilization</p>
                  <p className="text-lg font-semibold text-gray-900">78%</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center">
                <Cpu className="h-8 w-8 text-orange-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Training Time</p>
                  <p className="text-lg font-semibold text-gray-900">142 Hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Projects</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Accuracy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {aiProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Brain className="h-5 w-5 text-purple-600 mr-2" />
                      <div className="text-sm font-medium text-gray-900">{project.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      {project.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      project.status === 'Active' ? 'bg-green-100 text-green-800' :
                      project.status === 'Training' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{project.accuracy}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2" style={{ width: '120px' }}>
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900">{project.progress}%</span>
                    </div>
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
