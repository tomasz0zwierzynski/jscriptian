const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

module.exports = {

    getLogger: function ( _label ) {
        return createLogger({
            level: 'debug',
            format: combine(
                label({ label: _label }),
                timestamp(),
                logFormat
            ),
            transports: [
                new transports.Console(),
                new transports.File({ filename: 'logs/jscriptian.log', level: 'debug' })
            ]
        })
    }

}