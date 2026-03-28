async function generateAESKey(password: string): Promise<CryptoKey> {
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
  return crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

export const decryptFile = async (
  url: string,
  password: string,
  onProgress?: (progress: number) => void
): Promise<ArrayBuffer> => {
  const response = await fetch(url);
  const contentLength = response.headers.get("content-length");
  // Fallback size if content-length is missing
  const total = contentLength ? parseInt(contentLength, 10) : 12000000;
  let loaded = 0;

  if (!response.body) {
    const encryptedData = await response.arrayBuffer();
    if (onProgress) onProgress(100);
    return processDecrypt(encryptedData, password);
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      // 99% when downloaded, 100% when decrypted and parsed
      break;
    }
    if (value) {
      chunks.push(value);
      loaded += value.byteLength;
      if (onProgress) {
        onProgress(Math.min(95, Math.round((loaded / total) * 100)));
      }
    }
  }

  const encryptedData = new Uint8Array(loaded);
  let position = 0;
  for (const chunk of chunks) {
    encryptedData.set(chunk, position);
    position += chunk.byteLength;
  }

  // The decryption process might take a brief moment, so we are at 95%
  const result = await processDecrypt(encryptedData.buffer, password);
  if (onProgress) onProgress(100);
  return result;
};

async function processDecrypt(encryptedBuffer: ArrayBuffer, password: string) {
  const encryptedData = new Uint8Array(encryptedBuffer);
  const iv = new Uint8Array(encryptedData.slice(0, 16));
  const data = encryptedData.slice(16);
  const key = await generateAESKey(password);
  return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
}
