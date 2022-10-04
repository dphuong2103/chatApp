import { AuthService } from './../auth/auth.service';
import { User } from '../models/user/user.model';
import { Injectable } from '@angular/core';

import { Database } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private db: Database,

    public afsDB: AngularFirestore
  ) {}
}
