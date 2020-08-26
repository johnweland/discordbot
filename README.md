# DiscordBot

Yet another DiscordJS bot, this one designed for the mobile game [Shop Titans](https://playshoptitans.com/) by [Kabam](https://kabam.com/)

## How to use

###### For Development
```bash
npm run dev
```

## Deploy for yourself

### Creating your bot
1. [Open the following link](https://discordapp.com/developers/applications/) to Discord's developer portal.
2. Create a new Application.
3. Give your application a name and image.
![Discord](/docs/img/discord01.png)
4. Under the Bot tab, click 'Add Bot'.
![Discord](/docs/img/discord02.png)
5. Copy your Client ID and Secret to another location.
6. Invite your bot to a server using the following link: https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID_HERE&scope=bot
*Replace YOUR_CLIENT_ID_HERE with your Client ID*

### Creating the GitHub Repository
1. Fork this repository
2. Clone this to your local machine
    ```bash
    git clone git@github.com:YOUR_GITHUB_NAME/discordbot.git
    ```
3. Make any changes you might like.

### Hosting on Heroku
1. Go to the [Heroku Dashboard](https://dashboard.heroku.com/apps)
2. Go to the deploy section, select GitHub, and enable Automatic Deploy
![Heroku](/docs/img/heroku01.png)
3. Under Resources, deselect web and activate the worker
![Heroku](/docs/img/heroku02.png)
4. Go to Settings, find the Config Variables section, and add a new option. The Variable’s key should be DISCORD_BOT_TOKEN and the value should be the Client Secret you copied earlier.