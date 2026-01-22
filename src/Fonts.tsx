export const fonts : Record<string,{ default: string }> = import.meta.glob(
    '/src/fonts/*.{ttf,otf}',
    { eager: true }
);