const { exec } = require('child_process');
const path = require('path');

const migrationsDir = path.join(__dirname, 'migrations');

function runMigration(file) {
  return new Promise((resolve, reject) => {
    exec(`psql -f ${file}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing migration ${file}:`, stderr);
        reject(error);
      } else {
        console.log(`Migration ${file} executed successfully.`);
        resolve(stdout);
      }
    });
  });
}

async function runMigrations() {
  const migrationFiles = [
    '001_create_users_table.sql',
    '002_create_books_table.sql',
    '003_create_borrow_table.sql',
  ];

  for (const file of migrationFiles) {
    const filePath = path.join(migrationsDir, file);
    try {
      await runMigration(filePath);
    } catch (error) {
      console.error('Migration failed:', error);
      process.exit(1);
    }
  }

  console.log('All migrations executed successfully.');
}

module.exports = {
  runMigrations,
};
