const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const axios = require('axios'); // Import axios for HTTP requests
require('dotenv').config();

// MongoDB connection URI
const MONGODB_URI = '';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the user schema
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  roles: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Initialize Discord client
const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] 
});

// Your webhook URL
const WEBHOOK_URL = '';

// Function to send embed message to Discord webhook
async function sendWebhook(color, title, description) {
  try {
    await axios.post(WEBHOOK_URL, {
      embeds: [
        {
          color, // Embed color
          title, // Title of the embed
          description, // Description of the embed
          timestamp: new Date(), // Timestamp
        },
      ],
    });
    console.log(`Webhook sent: ${title}`);
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
}

// Event: Bot is ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Event: Guild member roles updated
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
  const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

  try {
    // Find the user in the database
    const user = await User.findOne({ userId: newMember.id });

    if (!user) {
      console.error('User not found in database:', newMember.id);
      return;
    }

    // Handle added roles
    addedRoles.forEach(async (role) => {
      if (!user.roles.includes(role.id)) {
        user.roles.push(role.id);
        console.log(`Added role ${role.name} to user ${newMember.user.username}`);
        await sendWebhook(
          0x00FF00, // Green color
          'Role Added',
          `**User:** ${newMember.user.username}\n**Role Added:** ${role.name}`
        );
      }
    });

    // Handle removed roles
    removedRoles.forEach(async (role) => {
      user.roles = user.roles.filter(r => r !== role.id);
      console.log(`Removed role ${role.name} from user ${newMember.user.username}`);
      await sendWebhook(
        0xFF0000, // Red color
        'Role Removed',
        `**User:** ${newMember.user.username}\n**Role Removed:** ${role.name}`
      );
    });

    // Save updated user roles
    await user.save();
    console.log(`Updated roles for user ${newMember.user.username}`);

  } catch (error) {
    console.error('Error updating user roles:', error);
  }
});

// Discord bot token
const botToken = '';
if (!botToken) {
  console.error('DISCORD_BOT_TOKEN is not defined in .env');
  process.exit(1);
}

// Log in to Discord
client.login(botToken).catch(err => {
  console.error('Failed to log in to Discord:', err);
  process.exit(1);
});
