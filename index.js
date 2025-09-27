/**
 * @file index.js
 * This script runs multiple Steam clients for various tasks.
 * It loads account settings from config.js, creates a client for each, and connects them.
 */
const steamClientFactory = require('./steam-client.js');
const accounts = require('./config.js');
const steamInstances = [];

console.log('Total accounts configured: ' + accounts.length);

// --- Client Initialization ---
// Iterate through each account configuration and create a client.
for (let i = 0; i < accounts.length; i++) {
    const currentConfig = accounts[i];

    // Create the client instance using the factory
    const instance = steamClientFactory.createInstance(currentConfig);
    // Initiate the login process
    instance.connect();
    // Store the instance for tracking
    steamInstances.push(instance);
}

console.log('Activating ' + steamInstances.length + ' clients.');