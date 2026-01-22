export const fonts: Record<string, { default: string }> = import.meta.glob(
    '/src/fonts/*/*.{ttf,otf,woff,woff2}',
    { eager: true }
);