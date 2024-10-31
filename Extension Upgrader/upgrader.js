// import modules
const fs = require('fs/promises');
const path = require('path');

// Define folder configurations and changes to apply
const folders = [
    { folder: "chrome", file: "manifest.json" },
    { folder: "firefox", file: "manifest.json" },
    { folder: "opera", file: "manifest.json" },
    { folder: "edge", file: "manifest.json" }
];

// Changes you want to apply
const changes = {
    description: "New description here",
    version: "newVersion"
};

// Update function
async function updateManifests() {
    // Set base directory to one level above current script location
    const baseDir = path.resolve(__dirname, '..');
    
    for (const { folder, file } of folders) {
        try {
            const filePath = path.join(baseDir, folder, file);
            const manifestData = await fs.readFile(filePath, 'utf-8');
            const manifestJson = JSON.parse(manifestData);

            // Apply changes
            Object.entries(changes).forEach(([key, value]) => {
                if (manifestJson.hasOwnProperty(key)) {
                    manifestJson[key] = value;
                } else {
                    console.log(`[extension-upgrader] [${folder}] Didn't find jsonObject "${key}", skipped!`);
                }
            });

            // Write updated JSON back to file
            await fs.writeFile(filePath, JSON.stringify(manifestJson, null, 2));
            console.log(`[extension-upgrader] [${folder}] Updated manifest.json successfully!`);
        } catch (err) {
            console.log(`[extension-upgrader] [${folder}] Error: ${err.message}`);
        }
    }
}

// Run the update function
updateManifests();
