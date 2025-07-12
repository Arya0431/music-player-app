# Music Player App

A modern React-based music player application with Redux state management, built with Vite and Tailwind CSS.

## Features

- 🎵 Music discovery and search
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🎛️ Full music player controls
- ❤️ Favorites system
- 📋 Playlist management
- 🎤 Artist details and top charts

## Tech Stack

- React 18
- Redux Toolkit
- React Router
- Tailwind CSS
- Vite
- iTunes API integration

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment to Render

### Step-by-Step Process

#### 1. Prepare Your Repository

- Ensure your code is pushed to a Git repository (GitHub, GitLab, etc.)
- Make sure all files are committed and pushed

#### 2. Create Render Account

- Go to [render.com](https://render.com)
- Sign up or log in to your account

#### 3. Deploy Your Application

**Option A: Using Render Dashboard (Recommended)**

1. **Connect Repository**

   - Click "New +" in your Render dashboard
   - Select "Static Site"
   - Connect your Git repository
   - Select the repository containing your music player app

2. **Configure Build Settings**

   - **Name**: `music-player-app` (or your preferred name)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment**: Static Site

3. **Advanced Settings**

   - **Auto-Deploy**: Enable (recommended)
   - **Branch**: `main` (or your default branch)

4. **Deploy**
   - Click "Create Static Site"
   - Render will automatically build and deploy your app

**Option B: Using render.yaml (Already configured)**

The `render.yaml` file is already configured in your project. You can use it for automated deployments:

1. Connect your repository to Render
2. Render will automatically detect the `render.yaml` file
3. The deployment will use the predefined settings

#### 4. Configure Custom Domain (Optional)

1. In your Render dashboard, go to your deployed site
2. Click "Settings" → "Custom Domains"
3. Add your domain and configure DNS settings

#### 5. Environment Variables (If Needed)

If you need to add environment variables:

1. Go to your site settings in Render
2. Navigate to "Environment Variables"
3. Add any required API keys or configuration

### Important Notes

- **Build Time**: First deployment may take 5-10 minutes
- **Auto-Deploy**: Render will automatically redeploy when you push to your main branch
- **Preview Deployments**: Render creates preview deployments for pull requests
- **Free Tier**: Includes 750 hours/month of build time

### Troubleshooting

1. **Build Fails**: Check the build logs in Render dashboard
2. **Routing Issues**: The `_redirects` file ensures proper SPA routing
3. **API Issues**: Ensure your API endpoints are accessible from Render's servers

### Post-Deployment

After successful deployment:

- Your app will be available at `https://your-app-name.onrender.com`
- You can share this URL with others
- Monitor performance and logs in the Render dashboard

## Local Testing

Before deploying, test the production build locally:

```bash
npm run build
npm run preview
```

This will serve the built files locally to ensure everything works correctly.

## Support

For deployment issues:

- Check Render's [documentation](https://render.com/docs)
- Review build logs in your Render dashboard
- Ensure all dependencies are properly listed in `package.json`
