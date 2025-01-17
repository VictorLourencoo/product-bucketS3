import { spaceBucket } from "./adapters/space";
import type { BucketConfig, BucketContract } from "./contracts";

export function FactoryBucket(config: BucketConfig): BucketContract {
    switch (config.provider) {
        case "Space":
            return spaceBucket(config); // Usa a factory para o Space (DigitalOcean)
        default:
            throw new TILT()// Lança um erro genérico caso o provedor não seja reconhecido
    }
}
