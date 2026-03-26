const fs = require('fs');
const path = require('path');

function mergeTranslation(locale, chatFile) {
    const localePath = path.join(__dirname, 'locales', `${locale}.json`);
    const chatPath = path.join(__dirname, chatFile);

    if (!fs.existsSync(chatPath)) {
        console.error(`Missing ${chatPath}. Waiting...`);
        return false;
    }

    const localeData = JSON.parse(fs.readFileSync(localePath, 'utf8'));
    const chatData = JSON.parse(fs.readFileSync(chatPath, 'utf8'));

    if (!localeData.chat) {
        localeData.chat = {};
    }

    // Merge chat data
    localeData.chat = { ...localeData.chat, ...chatData };

    fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2), 'utf8');
    console.log(`Successfully merged ${chatFile} into ${locale}.json`);
    return true;
}

const j = mergeTranslation('ja', 'chat_ja.json');
const e = mergeTranslation('en', 'chat_en.json');

if (j && e) {
    console.log('All merged!');
}
