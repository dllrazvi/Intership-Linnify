import { FirestoreDataConverter, QueryDocumentSnapshot } from '@google-cloud/firestore';

import { User } from '@app/user/types/user.types.ts';

export class UserConverter implements FirestoreDataConverter<User, any> {
  toFirestore(user: any) {
    return {
      email: user.email,
      name: user.name,
      image: user.image,
      role: user.role
    };
  }

  fromFirestore(snapshot: QueryDocumentSnapshot): User {
    const data = snapshot.data();

    return {
      email: data.email,
      name: data.name,
      image: data.image,
      role: data.role,
      id: snapshot.id
    };
  }
}

export const userConverter = new UserConverter();
