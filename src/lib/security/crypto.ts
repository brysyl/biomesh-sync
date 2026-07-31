/**
 * Edge-compatible HMAC validation using Web Crypto API.
 */
export async function verifyTerraSignature(payload: string, signature: string, secret: string): Promise<boolean> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  // Terra usually provides signatures in hex
  const signatureBytes = hexToBytes(signature);

  return await crypto.subtle.verify(
    'HMAC',
    keyMaterial,
    signatureBytes,
    enc.encode(payload)
  );
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}
