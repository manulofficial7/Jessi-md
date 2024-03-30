import { fileURLToPath } from 'url';
import path from 'path';
import { writeFileSync } from 'fs';
import { BufferJSON } from '@whiskeysockets/baileys';
import PastebinAPI from 'pastebin-js';
 let pastebin = new PastebinAPI('5kA52X-5mHVN14hMO4NjKFn4wvXAF3LI')

async function processTxtAndSaveCredentials(txt) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const pasteId = txt.replace("jessipair;", "");

  let decodedData = await pastebin.getPaste(pasteId);

  try {
    const credsPath = path.join(__dirname, '..', 'sessions', 'creds.json');
    writeFileSync(credsPath, decodedData.toString());
    console.log('Saved credentials to', credsPath);
  } catch (jsonError) {
    console.error('Error parsing JSON:', jsonError);
  }
}

export default processTxtAndSaveCredentials
