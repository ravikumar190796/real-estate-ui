const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const adminPath = path.join(__dirname, "..", "app", "admin");
const adminBackupPath = path.join(__dirname, "..", "app", ".admin-backup");

console.log("🚀 Starting static build for GitHub Pages...\n");

// Step 1: Exclude admin routes
if (fs.existsSync(adminPath)) {
  console.log("📦 Excluding admin routes from build...");
  if (fs.existsSync(adminBackupPath)) {
    fs.rmSync(adminBackupPath, { recursive: true, force: true });
  }
  // Use copy + delete instead of rename for Windows compatibility
  fs.cpSync(adminPath, adminBackupPath, { recursive: true });
  fs.rmSync(adminPath, { recursive: true, force: true });
  console.log("✅ Admin routes moved to backup\n");
}

try {
  // Step 2: Build static export
  console.log("🔨 Building static export...");
  execSync("next build", { stdio: "inherit", cwd: path.join(__dirname, "..") });
  console.log("\n✅ Static build completed successfully!");
  console.log("📁 Output directory: ./out\n");
} catch (error) {
  console.error("\n❌ Build failed!");
  throw error;
} finally {
  // Step 3: Restore admin routes
  if (fs.existsSync(adminBackupPath) && !fs.existsSync(adminPath)) {
    console.log("📦 Restoring admin routes...");
    // Use copy + delete instead of rename for Windows compatibility
    fs.cpSync(adminBackupPath, adminPath, { recursive: true });
    fs.rmSync(adminBackupPath, { recursive: true, force: true });
    console.log("✅ Admin routes restored\n");
  }
}

console.log("✨ Build process complete!");
console.log("\n📋 Next steps:");
console.log("   1. Review the ./out directory");
console.log("   2. Commit and push to GitHub");
console.log("   3. Enable GitHub Pages in repository settings");
console.log("   4. Set source to 'out' directory (or 'gh-pages' branch)\n");

