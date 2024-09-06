import config from '@app/config/client.config';
import { User } from '@app/user/types/user.types';

export const getUserImageUrl = (user: Pick<User, 'image'>): string | null => {
  if (!user.image) {
    return null;
  }

  // If the user authenticated with a 3rd party provider, the image will be a URL
  if (user.image.startsWith('http')) {
    return user.image;
  }

  return `${config.storageUrl}/${user.image}`;
};
