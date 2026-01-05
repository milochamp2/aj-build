import { google } from 'googleapis';

// OAuth2 client configuration
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set credentials using refresh token
if (process.env.GOOGLE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
}

const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

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

export async function getWorkItems(): Promise<WorkItem[]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
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

// Helper function to generate OAuth URL (for initial setup)
export function getAuthUrl() {
  const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent', // Force to get refresh token
  });
}

// Helper function to get tokens from authorization code
export async function getTokensFromCode(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}
