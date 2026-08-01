// Module-level cache to store imported CryptoKeys across warm invocations
const keyCache = new Map<string, CryptoKey>();

/**
 * Edge-compatible HMAC validation using Web Crypto API.
 * Optimized for peak performance with key caching and zero-allocation hex parsing.
 */
export async function verifyTerraSignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    if (!payload || !signature || !secret) {
      return false;
    }

    // Retrieve cached CryptoKey or import and cache it on cold start
    let keyMaterial = keyCache.get(secret);
    if (!keyMaterial) {
      const enc = new TextEncoder();
      keyMaterial = await crypto.subtle.importKey(
        'raw',
        enc.encode(secret),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['verify']
      );
      keyCache.set(secret, keyMaterial);
    }

    const signatureBytes = hexToBytes(signature);
    if (!signatureBytes) {
      return false;
    }

    return await crypto.subtle.verify(
      'HMAC',
      keyMaterial,
      signatureBytes as unknown as ArrayBufferView,
      new TextEncoder().encode(payload)
    );
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

function hexToBytes(hex: string): Uint8Array | null {
  if (hex.length % 2 !== 0) {
    return null;
  }

  const length = hex.length / 2;
  const bytes = new Uint8Array(length);
  
  for (let i = 0; i < length; i++) {
    const high = parseHexChar(hex.charCodeAt(i * 2));
    const low = parseHexChar(hex.charCodeAt(i * 2 + 1));
    if (high === -1 || low === -1) {
      return null;
    }
    bytes[i] = (high << 4) | low;
  }
  
  return bytes;
}

function parseHexChar(code: number): number {
  if (code >= 48 && code <= 57) return code - 48;  // 0-9
  if (code >= 65 && code <= 70) return code - 55;  // A-F
  if (code >= 97 && code <= 102) return code - 87; // a-f
  return -1;
}
