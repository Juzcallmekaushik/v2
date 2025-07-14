import { getContentfulClient } from '~/lib/contentful';
import type { 
    ProjectEntry, 
    SkillEntry
} from '~/types/contentful';

export async function getProjects(preview = false): Promise<ProjectEntry[]> {
    try {
        const client = getContentfulClient(preview);
        if (!client) {
            console.warn('Contentful client not available');
            return [];
        }
        const response = await client.getEntries({
            content_type: 'projects',
        });
        return response.items as unknown as ProjectEntry[];
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export async function getFeaturedProjects(preview = false): Promise<ProjectEntry[]> {
    try {
        const client = getContentfulClient(preview);
        if (!client) {
            console.warn('Contentful client not available');
            return [];
        }
        const response = await client.getEntries({
            content_type: 'projects',
            'fields.featured': true,
        } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
        return response.items as unknown as ProjectEntry[];
    } catch (error) {
        console.error('Error fetching featured projects:', error);
        return [];
    }
}

export async function getProject(id: string, preview = false): Promise<ProjectEntry | null> {
    try {
        const client = getContentfulClient(preview);
        if (!client) {
            console.warn('Contentful client not available');
            return null;
        }
        const response = await client.getEntry(id);
        return response as unknown as ProjectEntry;
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
}

export async function getSkills(preview = false): Promise<SkillEntry[]> {
    try {
        const client = getContentfulClient(preview);
        if (!client) {
            console.warn('Contentful client not available');
            return [];
        }
        
        const response = await client.getEntries({
            content_type: 'skill',
            order: ['fields.tech'] as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        });
        return response.items as unknown as SkillEntry[];
    } catch (error) {
        console.error('Error fetching skills:', error);
        return [];
    }
}

export async function getSkillsByCategory(category: string, preview = false): Promise<SkillEntry[]> {
    try {
        const client = getContentfulClient(preview);
        if (!client) {
            console.warn('Contentful client not available');
            return [];
        }
        const response = await client.getEntries({
            content_type: 'skill',
            'fields.category': category,
            order: ['fields.tech'] as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
        return response.items as unknown as SkillEntry[];
    } catch (error) {
        console.error('Error fetching skills by category:', error);
        return [];
    }
}
