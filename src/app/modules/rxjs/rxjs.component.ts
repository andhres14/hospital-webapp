import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {
    /*this.returnObservable()
      .pipe(
        retry(1)
      ).subscribe(
      value => console.log('Subs: ', value),
      error => console.warn('Error: ', error),
      () => console.info('Obs Terminado')
    );*/
    this.intervalSubs = this.returnInterval()
      .subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnInterval(): Observable<number> {
    return interval(100)
      .pipe(
        map(value => value + 1),
        filter(value => (value % 2 === 0)),
        take(10)
      );
  }

  returnObservable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>(observer => {
      const intervalAdded = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalAdded);
          observer.complete();
        }

        if (i === 2) {
          observer.error('I llego a 2');
        }

      }, 1000);
    });
    return obs$;
  }

}
