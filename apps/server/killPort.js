const execSync = require('child_process').execSync;
// Kills Port defined in the .env file
const output = execSync(`yarn kill-port ${process.env.PORT}`, {
  encoding: 'utf-8',
});
console.log(output);
