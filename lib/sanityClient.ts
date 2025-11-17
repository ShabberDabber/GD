import sanityClient from '@sanity/client';

// This is a browser-only client, so we can expose the projectId
// Make sure to configure CORS origins in your Sanity project settings
export const client = sanityClient({
  // IMPORTANT: Remember to find and replace this with your actual project ID
  projectId: 'YOUR_PROJECT_ID', 
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data on every load
  apiVersion: '2024-07-15', // use a UTC date string
});
