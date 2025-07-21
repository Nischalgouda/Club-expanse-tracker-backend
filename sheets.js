const { google } = require('googleapis');
const sheets = google.sheets('v4');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Authenticate using your service account
async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: SCOPES,
  });
  return auth.getClient();
}

// Read all expenses from the sheet
async function getExpenses() {
  const authClient = await getAuthClient();
  const res = await sheets.spreadsheets.values.get({
    auth: authClient,
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sheet1!A:E', // Adjust if your sheet has a different name
  });
  return res.data.values;
}

// Append a new expense to the sheet
async function appendExpense(data) {
  const authClient = await getAuthClient();
  const res = await sheets.spreadsheets.values.append({
    auth: authClient,
    spreadsheetId: process.env.SHEET_ID,
    range: 'Sheet1!A:E',
    valueInputOption: 'RAW',
    resource: { values: [data] },
  });
  return res;
}

module.exports = { getExpenses, appendExpense };
