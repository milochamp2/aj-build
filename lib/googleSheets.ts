import { google } from 'googleapis';
import { getOAuthTokens } from '@raindance-1/dashboard-core';

export interface WorkItem {
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

export async function getWorkItems(clientId: string, spreadsheetId: string): Promise<WorkItem[]> {
  try {
    // Retrieve OAuth tokens from Supabase using dashboard-core
    const connection = await getOAuthTokens(clientId, 'google');

    if (!connection || !connection.tokens || !connection.tokens.access_token) {
      throw new Error('No OAuth tokens found. Please connect Google Sheets first.');
    }

    // Create OAuth2 client with retrieved tokens
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: connection.tokens.access_token,
      refresh_token: connection.tokens.refresh_token,
      expiry_date: connection.tokens.expires_at ? connection.tokens.expires_at * 1000 : undefined
    });

    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: 'Sheet1!A2:H', // Adjust this range based on your sheet name and data range
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.log('No data found in sheet');
      return [];
    }

    return rows.map((row, index) => ({
      id: index + 1,
      date: row[0] || '',
      teamMember: row[1] || '',
      client: row[2] || '',
      task: row[3] || '',
      hoursWorked: parseInt(row[4]) || 0,
      status: row[5] || '',
      notes: row[6] || '',
      documentation: row[7] || '',
    }));
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error;
  }
}
