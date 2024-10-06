const nodemailer = require('nodemailer');
const config = require('../config/config');

const mailConfig = {
    service: config.mailing.service,
    port: config.mailing.port,
    auth: {
        user: config.mailing.auth.user,
        pass: config.mailing.auth.pass,
    },
}

const transport = nodemailer.createTransport(mailConfig);

class MailingService {
    async sendRecomendationsEmail(user, events) {
        const destination = user.email;
        const subject = 'Recommended events for you';
        let html = `<p>Hi ${user.name}, we have some events that you might like!</p>`;

        events.forEach(event => {
            html += `<p>${event.name} - ${event.event_url}</p>`;
        });

        const mailOptions = {
            from: mailConfig.auth.user,
            to: destination,
            subject,
            html,
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return { error };
            }
            return info;
        });
    }
}

module.exports = new MailingService();
