import { Profile } from '../../types/Profile';
import { ProfileSchema } from '../../types/ProfileSchema';

export const fetchProfileFulfilled = (state: ProfileSchema, { payload }: any) => {
    state.loading = false;

    const roles = payload.user.roles.map(({ id, name, display_name }: any) => ({
        id,
        name,
        displayName: display_name,
    }));

    const profile: Profile = {
        id: payload.user.id,
        name: payload.user.name,
        phone: payload.user.phone,
        email: payload.user.email,
        last_active_at: payload.user.last_active_at,
        roles,
    };

    if (payload.user.avatar) {
        profile.avatar = {
            id: payload.user.avatar.id,
            url: payload.user.avatar.url
        }
    }

    state.profile = profile;
};
