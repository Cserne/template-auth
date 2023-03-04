const _config = {
    dev: {
        todoapi: 'http://localhost:8080/api', google_client_id: '423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com', google_base_url: 'https://accounts.google.com/o/oauth2/v2/auth'
    },
    prod: {
        todoapi: process.env.REACT_APP_TODOAPI || 'http://localhost:8080/api',
        google_client_id: process.env.REACT_APP_CLIENT_ID || '423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com',
        google_base_url: process.env.REACT_APP_GOOGLEBASEURL || 'https://accounts.google.com/o/oauth2/v2/auth'

    }
};

const config = process.env.NODE_ENV === 'development' ? _config.dev : _config.prod;

export default config;