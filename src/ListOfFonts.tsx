import React from "react";
import { fonts } from "./Imports.tsx";
import { FontCard } from "./FontCard.tsx";
import type { FontMetadata } from "./Metadata.tsx";

interface ListOfFontsProps {
    sampleText: string;
    filter: string | null;
    metadata: FontMetadata[] | null;
}

export const ListOfFonts: React.FC<ListOfFontsProps> = ({ sampleText, filter, metadata }) => {
    const displayFonts = Object.keys(fonts)
        .sort((value, reference) => {
            const current = value.split("/").pop()!.replace(/\.\w+$/, "");
            const compared = reference.split("/").pop()!.replace(/\.\w+$/, "");
            return current.localeCompare(compared);
        })
        .filter(path => !filter || path.includes(`/${filter}/`));

    return (
        <>
            {displayFonts.map((path, index) => {
                const fontName = path.split("/").pop()!.replace(/\.\w+$/, "");
                const fontMeta = metadata?.find(meta => meta.path === path) ?? null;
                return <FontCard key={index} fontName={fontName} sampleText={sampleText} metadata={fontMeta} />;
            })}
        </>
    );
};