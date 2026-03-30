export const accessMiddleware = ({getState}: any) => (next: any) => (action: any) => {
    const state = getState();

    if (!state.profile.accessToken) {
        // console.log('Middleware triggered:', action);
    }

    return next(action);
};
