const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    db: {
        url: process.env.DB_URL,
    },
    port: process.env.PORT,
    mailing: {
        service: process.env.MAIL_SERVICE,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_AUTH_USER,
            pass: process.env.MAIL_AUTH_PASS,
        },
    },
    openai: {
        orgId: process.env.OPEN_AI_ORG_ID,
        projectId: process.env.OPEN_AI_PROJECT_ID,
        apiKey: process.env.OPEN_AI_API_KEY,
    },
};
