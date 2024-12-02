import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor() {}

  public eventEmitter(eventName: string, eventParams: any = {}) {
    try {
      gtag('event', eventName, eventParams);
    } catch (err) {
      console.warn(
        'Event Emitt Google Failed: ',
        err,
        ' , Action: ',
        eventName
      );
    }
  }
}
