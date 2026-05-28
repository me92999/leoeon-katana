const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const DB_NAME = "leoeon-katana-db";
const TABLES = ["products", "orders", "settings"];
const BACKUP_DIR = path.join(__dirname, "../backups");

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupFolder = path.join(BACKUP_DIR, `backup-${timestamp}`);
fs.mkdirSync(backupFolder, { recursive: true });

let allSuccess = true;

for (const table of TABLES) {
  try {
    const rawOutput = execSync(
      `npx wrangler d1 execute ${DB_NAME} --remote --command='SELECT * FROM ${table}' --json`,
      { cwd: path.dirname(__dirname), encoding: "utf8" }
    );
    const startIdx = rawOutput.indexOf("[");
    if (startIdx === -1) throw new Error("No JSON found in output");
    const data = JSON.parse(rawOutput.slice(startIdx));
    const rows = data[0]?.results || [];

    const outPath = path.join(backupFolder, `${table}.json`);
    fs.writeFileSync(outPath, JSON.stringify(rows, null, 2));
    console.log(`[backup] ${table}: ${rows.length} rows → ${outPath}`);
  } catch (err) {
    console.error(`[backup] Failed to backup ${table}:`, err.message);
    allSuccess = false;
  }
}

if (allSuccess) {
  console.log(`[backup] All tables backed up to ${backupFolder}`);
} else {
  console.error("[backup] Some tables failed to backup");
  process.exit(1);
}
