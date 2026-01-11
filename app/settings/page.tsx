'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Settings as SettingsIcon, RefreshCw } from 'lucide-react';

interface ConnectionStatus {
  google: {
    connected: boolean;
    email?: string;
    spreadsheetId?: string;
  };
}

export default function SettingsPage() {
  const [connections, setConnections] = useState<ConnectionStatus>({
    google: { connected: false }
  });
  const [loading, setLoading] = useState(true);
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    // Check URL params for OAuth callback status
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const error = params.get('error');
    const email = params.get('email');

    if (success === 'google_connected') {
      setStatusMessage({ type: 'success', message: 'Google Sheets connected successfully!' });

      // Save email to localStorage if provided
      if (email) {
        localStorage.setItem('google_user_email', email);
        setConnections({
          google: {
            connected: true,
            email: email
          }
        });
      }

      // Clear URL params
      window.history.replaceState({}, '', '/settings');
    } else if (error) {
      const errorMessages: { [key: string]: string } = {
        'oauth_denied': 'OAuth authorization was denied',
        'no_code': 'No authorization code received',
        'no_tokens': 'Failed to receive access tokens',
        'callback_failed': 'OAuth callback failed'
      };
      setStatusMessage({
        type: 'error',
        message: errorMessages[error] || 'An error occurred during connection'
      });
      // Clear URL params
      window.history.replaceState({}, '', '/settings');
    }

    // Load connection status from localStorage
    const savedSpreadsheetId = localStorage.getItem('google_spreadsheet_id');
    const savedEmail = localStorage.getItem('google_user_email');

    if (savedEmail) {
      setConnections({
        google: {
          connected: true,
          email: savedEmail,
          spreadsheetId: savedSpreadsheetId || undefined
        }
      });
      if (savedSpreadsheetId) {
        setSpreadsheetId(savedSpreadsheetId);
      }
    }

    setLoading(false);
  }, []);

  const handleConnectGoogle = () => {
    // Redirect to OAuth initiation endpoint
    window.location.href = '/api/oauth/google';
  };

  const handleSaveSpreadsheetId = () => {
    if (!spreadsheetId.trim()) {
      setStatusMessage({ type: 'error', message: 'Please enter a valid spreadsheet ID' });
      return;
    }

    localStorage.setItem('google_spreadsheet_id', spreadsheetId);
    setConnections({
      ...connections,
      google: {
        ...connections.google,
        spreadsheetId
      }
    });
    setStatusMessage({ type: 'success', message: 'Spreadsheet ID saved successfully!' });
  };

  const handleDisconnectGoogle = () => {
    localStorage.removeItem('google_spreadsheet_id');
    localStorage.removeItem('google_user_email');
    setConnections({
      google: { connected: false }
    });
    setSpreadsheetId('');
    setStatusMessage({ type: 'success', message: 'Google Sheets disconnected' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          </div>
          <p className="text-gray-600">Manage your API connections and integrations</p>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className={`mb-6 p-4 rounded-lg ${
            statusMessage.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <p>{statusMessage.message}</p>
            </div>
          </div>
        )}

        {/* Connections Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">API Connections</h2>
          </div>

          <div className="p-6">
            {/* Google Sheets Connection */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Google Sheets</h3>
                  <p className="text-sm text-gray-600">Connect your Google account to sync spreadsheet data</p>
                </div>
                <div className="flex items-center gap-2">
                  {connections.google.connected ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium text-green-700">Connected</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-500">Not Connected</span>
                    </>
                  )}
                </div>
              </div>

              {connections.google.connected && connections.google.email && (
                <div className="mb-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Account:</span> {connections.google.email}
                  </p>
                  {connections.google.spreadsheetId && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Spreadsheet ID:</span> {connections.google.spreadsheetId}
                    </p>
                  )}
                </div>
              )}

              {connections.google.connected && (
                <div className="mb-4">
                  <label htmlFor="spreadsheetId" className="block text-sm font-medium text-gray-700 mb-2">
                    Google Sheets Spreadsheet ID
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="spreadsheetId"
                      value={spreadsheetId}
                      onChange={(e) => setSpreadsheetId(e.target.value)}
                      placeholder="Enter spreadsheet ID from URL"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={handleSaveSpreadsheetId}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Save
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Find the ID in your Google Sheets URL: docs.google.com/spreadsheets/d/<strong>SPREADSHEET_ID</strong>/edit
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                {!connections.google.connected ? (
                  <button
                    onClick={handleConnectGoogle}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Connect Google Sheets
                  </button>
                ) : (
                  <button
                    onClick={handleDisconnectGoogle}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  >
                    Disconnect
                  </button>
                )}
              </div>
            </div>

            {/* Placeholder for future integrations */}
            <div className="mt-6 p-6 border border-dashed border-gray-300 rounded-lg text-center">
              <p className="text-sm text-gray-500">More integrations coming soon...</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">How to connect Google Sheets:</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Click "Connect Google Sheets" button</li>
            <li>Sign in with your Google account and grant permissions</li>
            <li>After connecting, enter your spreadsheet ID</li>
            <li>Click "Save" to complete the setup</li>
            <li>Go to AI Works dashboard to see your data</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
