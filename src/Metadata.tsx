import opentype from "opentype.js";
import { fonts } from "./Imports";
import { useState, useEffect } from 'react'

export interface FontMetadata {
    path: string;
    url: string;
    family: string;
    copyright?: string;
    author?: string;
    license?: string;
    version?: string;
}

let cache: FontMetadata[] | null = null;

async function Metadata(): Promise<FontMetadata[]> {
    if (cache) return cache;

    const results: FontMetadata[] = [];

    for (const [path, module] of Object.entries(fonts)) {
        const url = module.default;

        try {
            const response = await fetch(url);
            const buffer = await response.arrayBuffer();
            const font = opentype.parse(buffer);

            results.push({
                path,
                url,
                family: font.names.fontFamily?.en ?? path, /* Static for english currently, adjust here for other languages if neccesary */
                copyright: font.names.copyright?.en,
                author: font.names.designer?.en,
                license: font.names.license?.en,
                version: font.names.version?.en,
            });
        } catch (error) {
            console.warn("Failed to parse font:", path, error);
        }
    }

    cache = results;
    return results;
}

/* Custom hook to easily call metadata in App.tsx */
export function useMetadata() {
    const [metadata, setMetadata] = useState<FontMetadata[] | null>(null);

    useEffect(() => {
        Metadata().then(setMetadata);
    }, []);

    return metadata;
}