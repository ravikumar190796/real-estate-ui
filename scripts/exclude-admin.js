const fs = require("fs");
const path = require("path");

const adminPath = path.join(__dirname, "..", "app", "admin");
const adminBackupPath = path.join(__dirname, "..", "app", ".admin-backup");

// Move admin folder to backup location before build
if (fs.existsSync(adminPath)) {
  console.log("📦 Moving admin routes out of build...");
  if (fs.existsSync(adminBackupPath)) {
    fs.rmSync(adminBackupPath, { recursive: true, force: true });
  }
  fs.renameSync(adminPath, adminBackupPath);
  console.log("✅ Admin routes excluded from static build");
}

// Restore admin folder after build
function restoreAdmin() {
  if (fs.existsSync(adminBackupPath) && !fs.existsSync(adminPath)) {
    console.log("📦 Restoring admin routes...");
    fs.renameSync(adminBackupPath, adminPath);
    console.log("✅ Admin routes restored");
  }
}

// Handle process exit to restore admin folder
process.on("exit", restoreAdmin);
process.on("SIGINT", () => {
  restoreAdmin();
  process.exit();
});
process.on("SIGTERM", () => {
  restoreAdmin();
  process.exit();
});

// Export restore function for use in build script
if (require.main === module) {
  // If run directly, just exclude (build script will handle restore)
  process.on("beforeExit", restoreAdmin);
}

module.exports = { restoreAdmin };

