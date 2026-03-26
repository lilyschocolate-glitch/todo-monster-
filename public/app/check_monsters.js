import { MONSTERS } from './src/pixel-engine.js';

let hasError = false;

MONSTERS.forEach(monster => {
    if (!monster.data || !Array.isArray(monster.data)) {
        console.error(`ERROR: Monster ${monster.id} has no data array`);
        hasError = true;
        return;
    }
    if (monster.data.length !== 16) {
        console.error(`ERROR: Monster ${monster.id} has incorrect row count: ${monster.data.length}`);
        hasError = true;
    }
    monster.data.forEach((row, rowIndex) => {
        if (!Array.isArray(row) || row.length !== 16) {
            console.error(`ERROR: Monster ${monster.id} row ${rowIndex} has incorrect length: ${row ? row.length : 'undefined'}`);
            hasError = true;
        }
    });

    // パレットのnullチェック
    if (!monster.palette || monster.palette.length < 9) {
          console.warn(`WARN: Monster ${monster.id} may have short palette: ${monster.palette.length}`);
    }
});

if (!hasError) {
    console.log("ALL MONSTERS OK: No data structure errors found.");
} else {
    console.log("ERRORS FOUND in monster data.");
}
