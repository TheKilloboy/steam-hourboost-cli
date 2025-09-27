# Steam Hour Boost CLI

A Node.js-based command-line tool for idling game hours on multiple Steam accounts simultaneously.

## Key Features

*   **Multi-Account Management**: Run several Steam clients at once from a single script.
*   **Persistent Connection**: Automatically tries to reconnect if a client gets disconnected.
*   **Automated Chat Replies**: Sends a customizable, automated message to incoming chats.
*   **Account Health Monitoring**: Keeps an eye on VAC status, community bans, and other account restrictions.
*   **2FA Support**: Works with both manual Steam Guard code entry and automatic generation via a shared secret.
*   **Platform Independent**: Compatible with any OS that supports Node.js (Windows, macOS, Linux).

## Requirements

*   [Node.js](https://nodejs.org/) (v12 or higher is recommended)
*   [Git](https://git-scm.com/)

## Getting Started

1.  **Clone the project:**
    ```bash
    git clone https://github.com/your-repo/steam-activity-manager.git
    ```

2.  **Enter the project directory:**
    ```bash
    cd steam-activity-manager
    ```

3.  **Install required packages:**
    ```bash
    npm install
    ```

## How to Configure

All account settings are managed in the `config.js` file.

1.  **Open `config.js` in a text editor.**

2.  **Add Your Accounts**: Edit the `accounts` array to include your Steam accounts. You can add as many as you need.

    Each account is an object with the following properties:
    - `username`: Your Steam account username.
    - `password`: Your Steam account password.
    - `games`: An array of App IDs for the games you want to appear as "in-game".
    - `sharedSecret` (Optional): Your 2FA shared secret for automatic code generation.

    **Example `config.js`:**
    ```javascript
    const accounts = [
      {
        username: 'your_steam_username',
        password: 'your_steam_password',
        sharedSecret: 'YOUR_SHARED_SECRET', // Leave as '' to enter codes manually
        games: [730, 570, 440] // e.g., CS:GO, Dota 2, TF2
      },
      {
        username: 'second_username',
        password: 'second_password',
        sharedSecret: '',
        games: [4000] // e.g., Garry's Mod
      }
    ];

    module.exports = accounts;
    ```

### Finding Game App IDs
You can find the App ID for any game on its Steam store page URL or by using a site like [SteamDB](https://steamdb.info/apps/).

### Two-Factor Authentication (2FA)

*   **Manual Input (Default)**: If you leave `sharedSecret` as an empty string (`''`), the script will prompt you to enter the 2FA code from your authenticator app in the console.
*   **Automatic Generation**: To enable automatic code generation, you must provide your `sharedSecret`. You can extract this from your authenticator's data files (e.g., from Steam Desktop Authenticator's `maFiles` folder).

## Running the Tool

After configuring `config.js`, start the script from your terminal:

```bash
node index.js
```

The script will initialize, connect each account to Steam, and begin idling.

## Disclaimer

This tool is for educational purposes only. Using it may violate Steam's Terms of Service. Use at your own risk.