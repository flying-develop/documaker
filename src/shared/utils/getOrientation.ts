export const getOrientation = (): string | null => {
    const orientation = window.screen.orientation.type;
    const landscapeTypes = ['landscape-primary', 'landscape-secondary'];
    const portraitTypes = ['portrait-primary', 'portrait-secondary'];

    if (portraitTypes.includes(orientation)) {
        return 'portrait';
    }

    if (landscapeTypes.includes(orientation)) {
        return 'landscape';
    }

    return null;
};
