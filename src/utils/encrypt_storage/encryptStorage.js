import { EncryptStorage } from "encrypt-storage";

const secretKey = "iep7bfks3q";

export const encryptStorage = new EncryptStorage(secretKey, {
  prefix: "@instance1",
});
