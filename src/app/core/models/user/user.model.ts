export class User {
  _uid?: string;
  _firstName: string;
  _lastName: string;
  _email: string = '';
  _displayName;
  _chatRooms?: string[];
  _photoURL: string = '';
  //   uid: string, firstName: string, lastName: string, email: string
  constructor(
    uid: string,
    { _firstName, _lastName, _email, _displayName, _photoURL }: any
  ) {
    this._uid = uid || '';
    this._firstName = _firstName || '';
    this._lastName = _lastName || '';
    this._email = _email || '';
    this._displayName = _displayName || '';
    this._photoURL = _photoURL || '';
  }
  get uid() {
    return this._uid || '';
  }
  set uid(uid: string) {
    this._uid = uid;
  }
  get firstName() {
    return this._firstName || '';
  }
  set firstName(firstName: string) {
    this._firstName = firstName;
  }
  get lastName() {
    return this._lastName || '';
  }
  set lastName(lastName: string) {
    this._lastName = lastName;
  }
  get email() {
    return this._email;
  }
  set email(email: string) {
    this._email = email;
  }

get chatRooms(): string[] {
    return this._chatRooms!;
  }

  set chatRooms(chatRooms: string[]) {
    this._chatRooms = chatRooms;
  }

  get displayName() {
    return this._displayName || '';
  }

  set displayName(displayName: string) {
    this._displayName = displayName;
  }

  get photoURL() {
    return this._photoURL;
  }

  set photoURL(photoURL: string) {
    this._photoURL = photoURL;
  }
}
