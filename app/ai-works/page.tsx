'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, ExternalLink, Filter, Search, Download, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DateRangePicker from '@/components/DateRangePicker';

interface WorkItem {
  id: number;
  date: string;
  teamMember: string;
  client: string;
  task: string;
  hoursWorked: number;
  status: string;
  notes: string;
  documentation: string;
}

// Sample/fallback data matching Google Sheets structure
const sampleWorkItems: WorkItem[] = [
  {
    id: 1,
    date: '12/15/2025',
    teamMember: 'Joshua',
    client: 'Rolls Royce Hire',
    task: 'Form Responder',
    hoursWorked: 0,
    status: 'In Dev (On Hold)',
    notes: '-Need the content',
    documentation: ''
  },
  {
    id: 2,
    date: '12/23/2025',
    teamMember: 'AJ',
    client: 'Setup n6n and',
    task: '',
    hoursWorked: 0,
    status: 'In Dev (On Hold)',
    notes: '',
    documentation: ''
  },
  {
    id: 3,
    date: '12/24/2025',
    teamMember: 'AJ',
    client: 'LHM Dashboard',
    task: '',
    hoursWorked: 0,
    status: 'In Dev',
    notes: '',
    documentation: ''
  },
  {
    id: 4,
    date: '12/24/2025',
    teamMember: 'Joshua',
    client: 'Skylark booking',
    task: '',
    hoursWorked: 0,
    status: 'In Dev (On Hold)',
    notes: '',
    documentation: 'https://drive.google.c...'
  },
  {
    id: 5,
    date: '12/24/2025',
    teamMember: 'Joshua',
    client: 'Skylark Dashboard',
    task: '',
    hoursWorked: 0,
    status: 'Not Started',
    notes: '',
    documentation: ''
  },
  {
    id: 6,
    date: '12/24/2025',
    teamMember: 'Joshua',
    client: 'Haines Glass',
    task: '',
    hoursWorked: 0,
    status: 'Not Started',
    notes: '',
    documentation: ''
  },
  {
    id: 7,
    date: '12/24/2025',
    teamMember: 'Joshua',
    client: 'Tutorial Videos for',
    task: '',
    hoursWorked: 0,
    status: 'In Dev',
    notes: '',
    documentation: ''
  },
];

// Status color mapping
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Deployed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'In Dev':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'In Dev (On Hold)':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Planning':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Not Started':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const statusColors: Record<string, string> = {
  'Deployed': '#10b981',
  'In Dev': '#f97316',
  'In Dev (On Hold)': '#ef4444',
  'Planning': '#3b82f6',
  'Not Started': '#6b7280'
};

export default function AIWorksPage() {
  const [workItems, setWorkItems] = useState<WorkItem[]>(sampleWorkItems);
  const [filteredItems, setFilteredItems] = useState<WorkItem[]>(sampleWorkItems);
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch data from Google Sheets
  const fetchData = async () => {
    try {
      setIsRefreshing(true);

      // Get clientId and spreadsheetId from localStorage
      const clientId = localStorage.getItem('google_user_email');
      const spreadsheetId = localStorage.getItem('google_spreadsheet_id');

      if (!clientId || !spreadsheetId) {
        setError('Google Sheets not connected. Please go to Settings to connect.');
        setLoading(false);
        setIsRefreshing(false);
        return;
      }

      const response = await fetch(`/api/sheets?clientId=${encodeURIComponent(clientId)}&spreadsheetId=${encodeURIComponent(spreadsheetId)}`);
      const result = await response.json();

      if (result.success && result.data.length > 0) {
        setWorkItems(result.data);
        setFilteredItems(result.data);
        setError(null);
      } else if (!result.success) {
        setError(result.error || 'Failed to load data');
        console.error('API Error:', result.details);
      }
    } catch (err) {
      setError('Failed to connect to Google Sheets');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Calculate statistics based on filtered items
  const statusCounts = filteredItems.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusChartData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value
  }));

  // Team member stats based on filtered items
  const teamStats = filteredItems.reduce((acc, item) => {
    if (!acc[item.teamMember]) {
      acc[item.teamMember] = { total: 0, hours: 0 };
    }
    acc[item.teamMember].total += 1;
    acc[item.teamMember].hours += item.hoursWorked;
    return acc;
  }, {} as Record<string, { total: number; hours: number }>);

  const teamChartData = Object.entries(teamStats).map(([name, data]) => ({
    name,
    tasks: data.total,
    hours: data.hours
  }));

  const handleDateChange = (startDate: Date | undefined, endDate: Date | undefined) => {
    setDateRange({ start: startDate, end: endDate });

    if (!startDate || !endDate) {
      setFilteredItems(workItems);
      return;
    }

    const filtered = workItems.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });

    setFilteredItems(filtered);
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading data from Google Sheets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Works Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Project tracking and team workflow management
            {error && <span className="ml-2 text-amber-600">(Using sample data - Check connection)</span>}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <DateRangePicker onDateChange={handleDateChange} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{filteredItems.length}</p>
              <p className="mt-2 text-sm text-gray-500">Active items</p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Development</p>
              <p className="mt-2 text-3xl font-bold text-orange-900">
                {(statusCounts['In Dev'] || 0) + (statusCounts['In Dev (On Hold)'] || 0)}
              </p>
              <p className="mt-2 text-sm text-orange-600">Active work</p>
            </div>
            <div className="rounded-full bg-orange-100 p-3">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Not Started</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{statusCounts['Not Started'] || 0}</p>
              <p className="mt-2 text-sm text-gray-600">Pending</p>
            </div>
            <div className="rounded-full bg-gray-100 p-3">
              <Calendar className="h-8 w-8 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{Object.keys(teamStats).length}</p>
              <p className="mt-2 text-sm text-blue-600">Active contributors</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={statusColors[entry.name] || '#6b7280'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Workload</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#8b5cf6" name="Tasks Assigned" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Table */}
      <div className="rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Project Tracker</h2>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Search className="h-4 w-4" />
                Search
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Team Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Documentation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      {item.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold text-xs">
                        {item.teamMember.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{item.teamMember}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={item.client}>
                      {item.client}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{item.task || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      {item.hoursWorked || 0}h
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate" title={item.notes}>
                      {item.notes || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.documentation ? (
                      <a
                        href={item.documentation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Legend */}
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Status Legend</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">
              Deployed
            </span>
          </div>
          <div className="flex items-center">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800 border border-orange-200">
              In Dev
            </span>
          </div>
          <div className="flex items-center">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 border border-red-200">
              In Dev (On Hold)
            </span>
          </div>
          <div className="flex items-center">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              Planning
            </span>
          </div>
          <div className="flex items-center">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 border border-gray-200">
              Not Started
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
