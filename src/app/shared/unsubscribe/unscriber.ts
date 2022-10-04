import { Subscription } from 'rxjs';
import { createInjectableType } from '@angular/compiler';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class Unsubscriber implements OnDestroy {
  private _subscription: Subscription = new Subscription();
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  set anotherSubscription(sub: Subscription) {
    this._subscription.add(sub);
  }
}
