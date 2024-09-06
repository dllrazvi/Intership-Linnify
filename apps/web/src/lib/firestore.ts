import { Firestore } from '@google-cloud/firestore';

const firestore = new Firestore({
  projectId: 'linny-development',
  databaseId: 'linny-skills',
  ignoreUndefinedProperties: true
});

export default firestore;
