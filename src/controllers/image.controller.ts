import { Context } from '../types/context';
import { Bucket } from '../config';
import { s3 } from '../config';
import { IImage } from '../types/imageTypes';
import { VerifyAdminAuthorization } from '../decorators/auth.decorator';

export class ImageController {
  @VerifyAdminAuthorization
  generatePutUrl(ctx: Context, image: IImage) {
    return new Promise((resolve, reject) => {
      // Note Bucket is retrieved from the env variable above.
      const params = { Bucket, Key: image.imageName, ContentType: image.imageFileType };
      // Note operation in this case is putObject
      s3.getSignedUrl('putObject', params, function(err: Error, url: string) {
        if (err) {
          reject(err);
        }
        // If there is no errors we can send back the pre-signed PUT URL
        resolve(url);
      });
    });
  }

  generateGetUrl(image: IImage) {
    return new Promise((resolve, reject) => {
      const params: any = {
        Bucket,
        Key: image.imageName,
        Expires: 120, // 2 minutes
      };
      // Note operation in this case is getObject
      s3.getSignedUrl('getObject', params, (err: Error, url: string) => {
        if (err) {
          reject(err);
        } else {
          // If there is no errors we will send back the pre-signed GET URL
          resolve(url);
        }
      });
    });
  }
}