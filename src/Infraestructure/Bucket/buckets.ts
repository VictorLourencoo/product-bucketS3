import { ENV_VAR } from "../../Env"
import { BucketConfig } from "./contracts";
import { FactoryBucket } from "./factory";

export function BuildBucket() {
    const config_bucket: BucketConfig = {
        provider: "Space",
        config: {
            DOS_ENDPOINT: ENV_VAR.SPACE.DOS_ENDPOINT,
            DOS_BUCKET: ENV_VAR.SPACE.DOS_BUCKET,
            DOS_ACCESS_KEY_ID: ENV_VAR.SPACE.DOS_ACCESS_KEY_ID,
            DOS_SECRET_ACCESS_KEY: ENV_VAR.SPACE.DOS_SECRET_ACCESS_KEY,

        }
    }
    return FactoryBucket(config_bucket)
}