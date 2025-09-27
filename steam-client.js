var SteamUser = require('steam-user');
var SteamTotp = require('steam-totp');

/**
 * Factory for creating and configuring Steam client instances.
 * @type {Object}
 */
var instanceFactory = {};

/**
 * Builds and configures a Steam client.
 * @param {Object} config - The configuration object for the client.
 * @param {string} config.username - The Steam account username.
 * @param {string} config.password - The Steam account password.
 * @param {string} [config.sharedSecret] - The shared secret for 2FA.
 * @param {number[]} config.games - An array of app IDs to run.
 * @returns {SteamUser} A configured SteamUser instance.
 */
instanceFactory.createInstance = function (config) {
    var client = new SteamUser({
        promptSteamGuardCode: false,
        dataDirectory: "./sentry",
        singleSentryfile: false
    });

    // Assign properties from config
    client.username = config.username;
    client.password = config.password;
    client.sharedSecret = config.sharedSecret;
    client.games = config.games;
    client.chatSessions = {};

    /**
     * Handles successful logon.
     * @param {Object} details - Logon session details.
     */
    client.on('loggedOn', function (details) {
        console.log(`[${this.username}] Connected to Steam with ID: ${client.steamID.getSteam3RenderedID()}`);
        client.setPersona(SteamUser.EPersonaState.Online);
        client.gamesPlayed(this.games);
    });

    /**
     * Handles connection errors.
     * @param {Error} err - The error object.
     */
    client.on('error', function (err) {
        console.log(`[${this.username}] Connection Error: ${err.message}`);
        setTimeout(() => client.connect(), 30 * 60 * 1000); // Reconnect after 30 minutes.
    });

    /**
     * Initiates the connection to Steam.
     */
    client.connect = function () {
        this.logOn({
            "accountName": this.username,
            "password": this.password
        });
    }

    /**
     * Handles Steam Guard code requests.
     * @param {string|null} domain - The email domain if applicable.
     * @param {function} callback - Callback to provide the auth code.
     */
    client.on('steamGuard', function (domain, callback) {
        if (!this.sharedSecret) {
            var readlineSync = require('readline-sync');
            var authCode = readlineSync.question(`[${this.username}] Enter Steam Guard Code${!domain ? ' (App)' : ''}: `);
            callback(authCode);
        } else {
            var authCode = SteamTotp.generateAuthCode(this.sharedSecret);
            console.log(`[${this.username}] Using generated auth code: ${authCode}`);
            callback(authCode);
        }
    });

    /**
     * Handles incoming friend messages.
     * @param {SteamID} steamID - The sender's SteamID.
     * @param {string} message - The message content.
     */
    client.on("friendMessage", function (steamID, message) {
        console.log(`[${this.username}] Received message from ${steamID}: ${message}`);
        if (!this.chatSessions[steamID]) {
            client.chatMessage(steamID, "This is an automated reply. I am currently unavailable.");
            this.chatSessions[steamID] = true;
        }
    });

    /**
     * Handles VAC ban notifications.
     * @param {number} banCount - Number of VAC bans.
     * @param {number[]} appids - App IDs with bans.
     */
    client.on('vacBans', function (banCount, appids) {
        if (banCount > 0) {
            console.log(`[${this.username}] ${banCount} VAC ban(s) detected.` +
                (appids.length > 0 ? ` In apps: ${appids.join(', ')}` : ''));
        }
    });

    /**
     * Handles account limitation status.
     */
    client.on('accountLimitations', function (isLimited, isCommunityBanned, isLocked, canInviteFriends) {
        var restrictions = [];

        if (isLimited) {
            restrictions.push('LIMITED');
        }
        if (isCommunityBanned) {
            restrictions.push('COMMUNITY BANNED');
        }
        if (isLocked) {
            restrictions.push('LOCKED');
        }

        if (restrictions.length > 0) {
            console.log(`[${this.username}] Account has the following restrictions: ${restrictions.join(', ')}.`);
        }
    });

    return client;
}

module.exports = instanceFactory;