import { createClient, type ContentfulClientApi } from 'contentful';

let contentfulClient: ContentfulClientApi<undefined> | null = null;
let contentfulPreviewClient: ContentfulClientApi<undefined> | null = null;

const hasValidContentfulConfig = () => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  
  return spaceId && accessToken && spaceId.length > 0 && accessToken.length > 0;
};

const hasValidPreviewConfig = () => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const previewToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  
  return spaceId && previewToken && spaceId.length > 0 && previewToken.length > 0;
};

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

export const getContentfulClient = (preview = false) => {
  return preview ? contentfulPreviewClient : contentfulClient;
};

export { contentfulClient, contentfulPreviewClient };