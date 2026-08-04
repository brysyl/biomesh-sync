import crypto from 'crypto';

/**
 * Validates the HMAC-SHA256 signature of incoming wearable webhooks.
 * Ensures data integrity and prevents spoofed physiological payloads.
 */
export function verifyHmacSignature(payload: string, signature: string, secret: string): boolean {
  try {
    if (!signature || !secret) return false;

    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('base64');
      
    // Buffer lengths must match exactly for timingSafeEqual
    const sigBuffer = Buffer.from(signature);
    const genBuffer = Buffer.from(generatedSignature);

    if (sigBuffer.length !== genBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(sigBuffer, genBuffer);
  } catch (error) {
    console.error('Cryptographic validation fault:', error);
    return false;
  }
}
