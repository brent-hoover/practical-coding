const fs = require('fs/promises');
const path = require('path');

async function isDirectoryEmpty(dirPath) {
  const files = await fs.readdir(dirPath);
  return files.length === 0;
}

async function copyDirectory(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function bootstrapExercises(rootDir, templateDir) {
  try {
    // Find all numbered exercise directories
    const entries = await fs.readdir(rootDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory() && /^\d{2}-/.test(entry.name)) {
        const categoryPath = path.join(rootDir, entry.name);
        const subEntries = await fs.readdir(categoryPath, { withFileTypes: true });

        for (const subEntry of subEntries) {
          if (subEntry.isDirectory() && /^\d{2}-/.test(subEntry.name)) {
            const exercisePath = path.join(categoryPath, subEntry.name);

            if (await isDirectoryEmpty(exercisePath)) {
              console.log(`Bootstrapping: ${exercisePath}`);
              await copyDirectory(templateDir, exercisePath);
            }
          }
        }
      }
    }
    console.log('Bootstrap completed successfully');
  } catch (error) {
    console.error('Error during bootstrap:', error);
  }
}

const rootDir = process.argv[2] || './nodejs';
const templateDir = path.join(rootDir, 'template-project');

console.log('Starting bootstrap process...');
bootstrapExercises(rootDir, templateDir)
  .catch(error => console.error('Fatal error:', error));
