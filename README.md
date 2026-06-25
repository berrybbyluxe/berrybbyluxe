# Berrybby Luxury Lighting & Furnishing

Professional Next.js application for Berrybby Luxury, featuring a premium product catalog, secure Paystack checkout, and SEO-optimized product pages.

## Fix "Large Files Detected" Git Error

If you see an error about files exceeding 100MB (like `.firebase/` or `.next/`) when pushing to GitHub, run these commands in your terminal:

```bash
# 1. Remove build artifacts from Git tracking (does not delete them from your PC)
git rm -r --cached .firebase/
git rm -r --cached .next/

# 2. Add the new .gitignore file
git add .gitignore

# 3. Commit the fix
git commit -m "chore: remove large build artifacts from tracking"

# 4. Push again
git push -u origin main
```

## Deployment Guide

Follow these steps to deploy your project to your GitHub repository and set up automatic hosting.

### 1. Push Code to GitHub

Open your terminal in the project root and run the following commands:

```bash
# Initialize git
git init

# Add files
git add .

# Create initial commit
git commit -m "Initial commit: Professional furniture and lighting catalog"

# Rename branch to main
git branch -M main

# Link to your repository
git remote add origin https://github.com/bigdevsircole/berrybby.git

# Push the code
git push -u origin main
```

### 2. Configure Firebase Hosting

This project is configured for **Static Site Generation (SSG)** using `output: 'export'` in `next.config.ts`. This allows you to host it for free on the Firebase Spark Plan.

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Navigate to **Hosting** in the sidebar.
3.  Click **Get Started**.
4.  Follow the setup wizard. When prompted about GitHub, choose to **Set up GitHub Actions**.
5.  Authorize Firebase to access your `bigdevsircole/berrybby` repository.
6.  Firebase will automatically create a workflow file that builds and deploys your site every time you push to the `main` branch.

### 3. Environment Variables

Don't forget to set your Paystack public key. In your local development, use `.env.local`. For production:
1.  Go to your GitHub repository settings.
2.  Navigate to **Secrets and variables** > **Actions**.
3.  Add `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` as a secret if your deployment pipeline requires it, or ensure it is accessible to the build process.

## Project Structure

- `/src/app`: Next.js App Router pages and layouts.
- `/src/components`: Reusable UI components (Shadcn UI).
- `/src/lib/products.ts`: The core product catalog.
- `/public/images`: High-quality product photography.
