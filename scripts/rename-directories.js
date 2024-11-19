const fs = require('fs/promises');
const path = require('path');

async function padDirectoryNumbers(directoryPath) {
  try {
    // Read the directory
    const entries = await fs.readdir(directoryPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        let currentPath = path.join(directoryPath, entry.name);

        // Check if directory starts with a number
        const match = entry.name.match(/^(\d+)-(.*)/);
        if (match) {
          const [, num, rest] = match;
          // Pad the number with leading zero if needed
          const paddedNum = num.padStart(2, '0');
          const newName = `${paddedNum}-${rest}`;

          if (newName !== entry.name) {
            const newPath = path.join(directoryPath, newName);
            console.log(`Renaming: ${entry.name} -> ${newName}`);
            await fs.rename(currentPath, newPath);

            // Update currentPath for recursive call
            currentPath = newPath;
          }
        }

        // Recursively process subdirectories
        await padDirectoryNumbers(currentPath);
      }
    }
  } catch (error) {
    console.error('Error processing directory:', error);
  }
}

// Get the project root directory from command line or use default
const projectRoot = process.argv[2] || './nodejs';

// Start the renaming process
console.log('Starting directory renaming...');
padDirectoryNumbers(projectRoot)
  .then(() => console.log('Directory renaming completed'))
  .catch(error => console.error('Error:', error));
