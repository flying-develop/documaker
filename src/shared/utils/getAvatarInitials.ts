export const getAvatarInitials = (initials: string) => {
    if (!initials) return;

    return initials
        .split(' ')
        .filter((word) => word[0] === word[0].toUpperCase())
        .map((word) => word[0])
        .join('');
};
