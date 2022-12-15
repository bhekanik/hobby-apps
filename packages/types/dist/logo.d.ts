export interface Logo {
    id?: number;
    cloudinary_public_id: string;
    url: string;
    created_at?: string;
    format: string;
    original_filename?: string;
}
export type LogoRelation = {
    logo: Logo | null;
    logo_id?: number | null;
} | {
    logo?: never;
    logo_id: number | null;
};
