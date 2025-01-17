export const ENV_VAR = {
    PORT: (process.env.PORT as string) || "3000",
    HOST: (process.env.HOST as string) || "127.0.0.1",
    ENVIROMENT: {
        PROD: process.env.NODE_ENV === "production",
        AS_DEV: process.env.AS_DEV === "TRUE"
    },
    SPACE: {
        DOS_ENDPOINT: process.env.DOS_ENDPOINT as string,
        DOS_BUCKET: process.env.DOS_BUCKET as string,
        DOS_ACCESS_KEY_ID: process.env.DOS_ACCESS_KEY_ID as string,
        DOS_SECRET_ACCESS_KEY: process.env.DOS_SECRET_ACCESS_KEY as string
    }
}