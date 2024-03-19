import Realm, { BSON, ObjectSchema } from "realm";

export class Profile extends Realm.Object<Profile> {
    _id!: string;
    name!: string;
    
    static schema: ObjectSchema = {
      name: 'Profile',
      properties: {
        _id: 'string',
        name: {type: 'string', indexed: 'full-text'},
      },
      primaryKey: '_id',
    };
  }

export class SavedBook extends Realm.Object<SavedBook> {
  key!: string;
  url?: string;
  title?: string;
  author?: string[];
  genre?: string[];
  published?: string;

  static schema: Realm.ObjectSchema = {
    name: 'SavedBook',
    properties: {
      key: 'string',
      url: 'string',
      title: 'string',
      author: { type: 'list', objectType: 'string' },
      genre: { type: 'list', objectType: 'string' },
      published: 'string',
    },
    primaryKey: 'key',
  };
  
}
  