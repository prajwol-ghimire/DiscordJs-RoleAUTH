
# Discord OAuth Next.js Application

A Next.js application integrated with Discord OAuth for user authentication, role-based access control, and real-time role synchronization using a Discord bot.

---

## **Features**

1. **Discord OAuth Login**:
   - Users can log in using their Discord account.
   - User details (ID, username, email, roles) are stored in the database.

2. **Role-Based Access Control**:
   - Protected routes for Admin and Moderator pages.
   - Only users with specific roles can access these pages.

3. **Real-Time Role Synchronization**:
   - A Discord bot listens for role updates (add/remove) and syncs them with the database.

4. **Database as Source of Truth**:
   - Role checks are performed against the database instead of hitting the Discord API every time.

5. **Secure Token Management**:
   - Access and refresh tokens are securely stored and refreshed when expired.

---

## **Technologies Used**

- **Frontend**: Next.js, React
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth.js, Discord OAuth
- **Discord Integration**: discord.js
- **Environment Management**: dotenv

---

## **Folder Structure**
```
discord-oauth-nextjs/
├── components/ # Reusable React components
│   └── Layout.js # Layout component for pages
├── lib/ # Utility functions and libraries
│   ├── db.js # MongoDB connection
│   └── discordAuth.js # Discord API utilities
├── models/ # Mongoose models
│   └── User.js # User schema and model
├── pages/ # Next.js pages
│   ├── api/ # API routes
│   │   ├── auth/ # NextAuth.js configuration
│   │   │   └── [...nextauth].js
│   │   ├── check-admin.js # Admin role verification
│   │   └── check-mod.js # Moderator role verification
│   ├── admin.js # Admin dashboard
│   ├── mod.js # Moderator dashboard
│   └── index.js # Landing page
├── public/ # Static assets
├── .env.local # Environment variables
├── .gitignore # Git ignore file
├── package.json # Project dependencies and scripts
├── README.md # Project documentation
└── next.config.js # Next.js configuration
```

---

## **Installation**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/discord-oauth-nextjs.git
   cd discord-oauth-nextjs
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   MONGODB_URI=your_mongodb_uri
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=http://localhost:3000
   DISCORD_CLIENT_ID=your_discord_client_id
   DISCORD_CLIENT_SECRET=your_discord_client_secret
   DISCORD_BOT_TOKEN=your_discord_bot_token
   DISCORD_GUILD_ID=your_server_id
   DISCORD_ADMIN_ROLE_ID=your_admin_role_id
   DISCORD_MOD_ROLE_ID=your_mod_role_id
   ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```

5. **Invite the Discord Bot**:
   - Create a bot in the Discord Developer Portal.
   - Invite the bot to your server with the following permissions:
     - MANAGE_ROLES
     - VIEW_GUILD_MEMBERS

---

## **Usage**

- **Landing Page**:
  - Accessible to everyone.
  - Users can log in using their Discord account.

- **Admin Dashboard**:
  - Only accessible to users with the Admin role.
  - Displays admin-specific content.

- **Moderator Dashboard**:
  - Only accessible to users with the Moderator role.
  - Displays moderator-specific content.

- **Real-Time Role Updates**:
  - When a user’s roles are updated in Discord, the database is automatically updated.

---

## **Dependencies**

### **Frontend**:
- `next`: 13.x
- `react`: 18.x
- `next-auth`: 4.x

### **Backend**:
- `mongoose`: 7.x
- `axios`: 1.x
- `discord.js`: 14.x

### **Development**:
- `concurrently`: 8.x
- `dotenv`: 16.x

---

## **Contributing**

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

---

## **License**

This project is licensed under the MIT License. See the LICENSE file for details.

---

## **Acknowledgements**

- [Next.js Documentation](https://nextjs.org/docs)
- [Discord.js Documentation](https://discord.js.org/)
- [NextAuth.js Documentation](https://next-auth.js.org/)