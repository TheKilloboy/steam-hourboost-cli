// --- Account Setup ---
// Define your Steam account credentials below.
// You can add multiple account objects to the `accounts` array.

const accounts = [];
let accountConfig;

// First Account
accountConfig = {};
accountConfig.username = 'user1';
accountConfig.password = 'pass1';
accountConfig.sharedSecret = ''; // Optional: for 2FA, get from authenticator app.
accountConfig.games = [730, 440, 570] // App IDs of games to run.
accounts.push(accountConfig);

// Second Account
accountConfig = {};
accountConfig.username = 'user2';
accountConfig.password = 'pass2';
accountConfig.sharedSecret = ''; // Optional: for 2FA.
accountConfig.games = [730, 440, 570]
accounts.push(accountConfig);


module.exports = accounts;