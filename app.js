/**
 * @file app.js
 * This script runs multiple Steam clients for various tasks.
 * It loads account settings, creates a client for each, and connects them.
 */
var steamHandlerFactory = require('./steamHandler.js');
var accounts = [];
var accountConfig;
var steamInstances = [];

// --- Account Setup ---
// Define your Steam account credentials below.
// You can add multiple account objects to the `accounts` array.

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

console.log('Total accounts configured: ' + accounts.length);

// --- Client Initialization ---
// Iterate through each account configuration and create a client.
for (let i = 0; i < accounts.length; i++) {
    var currentConfig = accounts[i];

    // Create the client instance using the factory
    var instance = steamHandlerFactory.createInstance(currentConfig);
    // Initiate the login process
    instance.connect();
    // Store the instance for tracking
    steamInstances.push(instance);
}

console.log('Activating ' + steamInstances.length + ' clients.');