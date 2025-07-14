import { createClient, type ContentfulClientApi } from 'contentful';

// Create Contentful clients with better error handling
let contentfulClient: ContentfulClientApi<undefined> | null = null;
let contentfulPreviewClient: ContentfulClientApi<undefined> | null = null;

// Check if we have valid Contentful configuration
const hasValidContentfulConfig = () => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  
  return spaceId && accessToken && spaceId.length > 0 && accessToken.length > 0;
};

// Check if we have valid Contentful preview configuration  
const hasValidPreviewConfig = () => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const previewToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  
  return spaceId && previewToken && spaceId.length > 0 && previewToken.length > 0;
};

// Initialize clients
if (hasValidContentfulConfig()) {
  try {
    contentfulClient = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    });
  } catch (error) {
    console.error('Contentful client initialization error:', error);
    contentfulClient = null;
  }
}

if (hasValidPreviewConfig()) {
  try {
    contentfulPreviewClient = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
      host: 'preview.contentful.com',
    });
  } catch (error) {
    console.error('Contentful preview client initialization error:', error);
    contentfulPreviewClient = null;
  }
}

// Helper function to get client based on preview mode
export const getContentfulClient = (preview = false) => {
  return preview ? contentfulPreviewClient : contentfulClient;
};

// Export the clients
export { contentfulClient, contentfulPreviewClient };
