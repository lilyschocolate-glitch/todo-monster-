const fs = require('fs');
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));
const additions = {
  'bg_changed': 'Changed the playground background to {{name}}!',
  'placed_furniture': 'Placed {{name}} in the playground! ({{current}}/{{total}})',
  'item_not_owned': "You don't have this yet. Get it from the shop!",
  'all_placed': 'All owned items have been placed! Need more to place more.',
  'no_use_yet': '{{name}} has no use yet. It might help with Dex completion!',
  'copy_success_x': 'Copied! Paste it on X',
  're_egged': 'Returned to an egg. What kind of monster will it be next?',
};
let added = 0;
for (const [k, v] of Object.entries(additions)) {
  if (!en.message[k]) {
    en.message[k] = v;
    added++;
  }
}
if (added > 0) {
  fs.writeFileSync('locales/en.json', JSON.stringify(en, null, 2), 'utf8');
}
console.log('Added ' + added + ' missing message keys');

// Also verify monster names
const names = Object.keys(en.monster.name);
console.log('Monster name entries: ' + names.length);

// Check special_evolved
console.log('special_evolved: ' + (en.message.special_evolved ? 'OK' : 'MISSING'));
console.log('graduate: ' + (en.ui.graduate ? 'OK' : 'MISSING'));
