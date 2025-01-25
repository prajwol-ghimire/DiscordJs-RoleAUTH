import axios from 'axios';

// Fetch user roles from Discord API
export const fetchUserRoles = async (accessToken) => {
  try {
    const response = await axios.get(
      `https://discord.com/api/users/@me/guilds/${process.env.NEXT_PUBLIC_DISCORD_GUILD_ID}/member`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response.data.roles || [];
  } catch (error) {
    console.error('Failed to fetch roles:', error.response?.data);
    return [];
  }
};

// Refresh Discord tokens
export const refreshDiscordTokens = async (refreshToken) => {
  try {
    const params = new URLSearchParams();
    params.append('client_id', process.env.DISCORD_CLIENT_ID);
    params.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);

    const { data } = await axios.post(
      'https://discord.com/api/oauth2/token',
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in
    };
  } catch (error) {
    console.error('Token refresh failed:', error.response?.data);
    return null;
  }
};