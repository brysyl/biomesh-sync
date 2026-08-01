// src/lib/security/crypto.ts
export async function verifyWebhookSignature(
  signedPayload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(signedPayload);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: { name: 'SHA-256' } },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    const hashArray = Array.from(new Uint8Array(signatureBuffer));
    const computedSignature = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    return computedSignature === signature;
  } catch (error) {
    console.error('Signature verification exception:', error);
    return false;
  }
}
