export type Profile = {
    provider: 'figma';
    id: string;
    displayName: string;
    emails: {
        value: string;
    }[];
    photos: string[];
};