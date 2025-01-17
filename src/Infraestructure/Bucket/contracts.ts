import { DefaultError } from "../../Domain/product/interface"


export type UploadFile = UploadFileSuccess | UploadFileError
export interface UploadFileSuccess {
    status: "OK"
    payload: { file_url: string }
}
interface UploadFileError {
    status: "ERROR"
    payload: DefaultError
}
export interface BucketContract {
    /**
     * Faz o upload de um arquivo no bucket.
     * @param buffer - O conteúdo do arquivo como Buffer.
     * @param fileName - O nome do arquivo (incluindo o caminho, se necessário).
     * @param mimeType - O tipo MIME do arquivo.
     * @returns - Uma string com a URL do arquivo armazenado.
     */
    upload: (buffer: Buffer, fileName: string, mimeType: string) => Promise<string>;

    /**
     * Remove um arquivo do bucket.
     * @param fileName - O nome do arquivo que deve ser removido.
     * @returns - Void, indicando que a remoção foi bem-sucedida.
     */
    remove: (fileName: string) => Promise<void>;

    /**
     * Lista os arquivos presentes no bucket.
     * @param prefix - (Opcional) Prefixo para filtrar arquivos.
     * @returns - Uma lista de objetos contendo os arquivos.
     */
    list?: (prefix?: string) => Promise<Array<{ key: string; lastModified: Date; size: number }>>;

    /**
     * Faz o download de um arquivo do bucket.
     * @param fileName - O nome do arquivo a ser baixado.
     * @returns - O conteúdo do arquivo como Buffer.
     */
    download?: (fileName: string) => Promise<Buffer>;
}

export type BucketConfig = BucketConfigDefault<"Space", BucketConfigS3>
export interface BucketConfigS3 {
    DOS_ENDPOINT: string,
    DOS_BUCKET: string,
    DOS_ACCESS_KEY_ID: string,
    DOS_SECRET_ACCESS_KEY: string,
}
export interface BucketConfigDefault<Provider extends string, Config> {
    provider: Provider
    config: Config
}
export interface FileUploader {
    file: Buffer
}
