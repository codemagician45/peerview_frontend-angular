import * as crypto from 'crypto';

export class CryptoUtilities {
  constructor () {}

  private ccipher = crypto.createCipher('aes192', 'sample cipher here');
  private ddecipher = crypto.createDecipher('aes192', 'sample cipher here');

  public cipher (value): string {
    let encrypted: any = this.ccipher.update(value.toString(), 'utf8', 'hex');
    encrypted += this.ccipher.final('hex');

    return encrypted;
  }

  public decipher (value): string {
    let decrypted = this.ddecipher.update(value.toString(), 'hex', 'utf8');
    decrypted += this.ddecipher.final('utf8');
    console.log(decrypted);
    return decrypted;
  }
}
