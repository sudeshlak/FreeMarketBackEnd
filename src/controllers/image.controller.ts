import { promisify } from 'util';
import { Context } from '../types/context';
import { Bucket, s3 } from '../config';
import { IImage } from '../types/imageTypes';
import { VerifyAdminAuthorization } from '../decorators/auth.decorator';

const getSignedUrlPromise = promisify(s3.getSignedUrl.bind(s3)) as (
  operation: string,
  params: Record<string, unknown>,
) => Promise<string>;

export class ImageController {
  private normalizeMime(type: string): string {
    if (!type) return 'image/jpeg';

    const map: Record<string, string> = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
    };

    return map[type.toLowerCase()] || type;
  }

  @VerifyAdminAuthorization
  async generatePutUrl(ctx: Context, image: IImage): Promise<string> {
    const params = {
      Bucket,
      Key: image.imageName,
    };
    return await getSignedUrlPromise('putObject', params);
  }

  async generateGetUrl(image: IImage): Promise<string> {
    const params = {
      Bucket,
      Key: image.imageName,
      Expires: 120,
    };
    return await getSignedUrlPromise('getObject', params);
  }
}
