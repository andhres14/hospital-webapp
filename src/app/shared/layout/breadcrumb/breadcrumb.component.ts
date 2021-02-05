import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: []
})
export class BreadcrumbComponent implements OnDestroy {

  public title: string;
  public subsTitle: Subscription;

  constructor(private router: Router) {
    this.subsTitle = this.getRouteData()
      .subscribe(({ title }) => {
        this.title = title;
        document.title = `AdminPro | ${ title }`;
      });
  }

  ngOnDestroy(): void {
    this.subsTitle.unsubscribe();
  }

  getRouteData(): Observable<any> {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data || { title: '' })
      );
  }

}
