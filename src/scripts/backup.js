const { google } = require('googleapis');
const fs = require('fs');
const path = require("path");

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const KEY_FILE = path.join(__dirname, '..', '..', '/credentials.json');

async function backup() {
  const auth = await getAuthToken();

  const drive = google.drive({ version: 'v3', auth });

  const fileMetadata = {
    'name': 'db.json',
    parents: ['1S4vewZ6Ks39RFYX4cYrtEaidkln35ZNs']
  };

  const media = {
    mimeType: 'txt/plain',
    body: fs.createReadStream(path.join(__dirname, '..', '../', 'db.json'))
  };

  await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
  });
}

async function getAuthToken() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE,
      scopes: SCOPES
    });
    return await auth.getClient();
  } catch (error) {
    if (error.errno === -21) {
      throw 'No se encuentra el archivo KEY_FILE de autenticación';
    }
    throw error;
  }
}

backup();