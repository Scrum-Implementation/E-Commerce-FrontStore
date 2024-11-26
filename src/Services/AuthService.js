import Api from './Api';

const AuthService = {
    login: async (email, password) => {
        try {
            const response = await Api.post('/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    signup: async (userDetails) => {
        try {
            const response = await Api.post('/signup', userDetails);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('user');
    }
};

export default AuthService;