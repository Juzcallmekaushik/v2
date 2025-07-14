import { createClient, type ContentfulClientApi } from 'contentful';

// Check if we have valid Contentful configuration
function isContentfulConfigValid() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  
  return !!(
    spaceId && 
    accessToken && 
    spaceId !== '' && 
    accessToken !== '' &&
    !spaceId.includes('your_') && // Check for placeholder values
    !accessToken.includes('your_')
  );
}

// Check if we have valid Contentful preview configuration
function isContentfulPreviewConfigValid() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const previewToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  
  return !!(
    spaceId && 
    previewToken && 
    spaceId !== '' && 
    previewToken !== '' &&
    !spaceId.includes('your_') && // Check for placeholder values
    !previewToken.includes('your_')
  );
}

// Create Contentful clients only if we have valid configuration
let contentfulClient: ContentfulClientApi<undefined> | null = null;
let contentfulPreviewClient: ContentfulClientApi<undefined> | null = null;

if (isContentfulConfigValid()) {
  try {
    contentfulClient = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    });
  } catch (error) {
    console.error('Contentful client initialization error:', error);
    contentfulClient = null;
  }
} else {
  console.warn('Contentful configuration is invalid or incomplete. Contentful services will not be available.');
}

if (isContentfulPreviewConfigValid()) {
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
} else {
  console.warn('Contentful preview configuration is invalid or incomplete. Contentful preview services will not be available.');
}

// Helper function to get client based on preview mode
export const getContentfulClient = (preview = false) => {
  return preview ? contentfulPreviewClient : contentfulClient;
};

// Export the clients
export { contentfulClient, contentfulPreviewClient };
