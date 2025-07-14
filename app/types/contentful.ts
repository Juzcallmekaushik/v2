import { Asset, Entry } from 'contentful';

export interface ContentfulEntry {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ProjectFields {
  name: string;
  description: string;
  cover: Asset;
  tech: string[];
  github?: string;
  website?: string;
  featured: boolean;
}

export type ProjectEntry = Entry<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

export interface SkillFields {
  tech: string;
  category: 'Frameworks & Languages' | 'OS & Cloud Services' | 'Browsers & IDE';
  link: string;
}

export type SkillEntry = Entry<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
