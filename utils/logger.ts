import winston from "winston";

const { align, combine, timestamp, colorize, json } = winston.format;

export const logger = winston.createLogger({
  level: "info",
  format: combine(json(), colorize({ all: true }), align(), timestamp()),
  defaultMeta: { service: "botbert-smith" },
  transports: [
    new winston.transports.Console({}),
    ...(process.env.NODE_ENV !== "development"
      ? [
          new winston.transports.File({
            filename: "error.log",
            level: "error",
          }),
          new winston.transports.File({ filename: "combined.log" }),
        ]
      : []),
  ],
});
