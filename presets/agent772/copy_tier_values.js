const fs = require('fs');

// Paths
const fileAPath = './presets/agent772/Tier7_ammo.json';
const fileBPath = './presets/example/Tier7_ammo.json';

// Read Data
const fileAData = JSON.parse(fs.readFileSync(fileAPath, 'utf8'));
const fileBData = JSON.parse(fs.readFileSync(fileBPath, 'utf8'));

// Copy Data
function updateFileA() {
  for (const caliber in fileAData.pmcAmmo) {
    for (const id in fileAData.pmcAmmo[caliber]) {
      if (fileBData.pmcAmmo[caliber] && fileBData.pmcAmmo[caliber][id]) {
        fileAData.pmcAmmo[caliber][id] = fileBData.pmcAmmo[caliber][id];
      } else {
        fileAData.pmcAmmo[caliber][id] = 0;
      }
    }
  }

  // Write File A
  fs.writeFileSync(fileAPath, JSON.stringify(fileAData, null, 2));
}

updateFileA();
console.log('Data transfered');