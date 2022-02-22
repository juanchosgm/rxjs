import { Observable, Observer } from 'rxjs'

const observer: Observer<any> = {
    next: value => console.log('next', value),
    error: err => console.warn('error', err),
    complete: () => console.info('Completed')
};

// const obs$ = Observable.create();
const obs$ = new Observable<string>(subscriber => {
    subscriber.next('Hola');
    subscriber.next('Mundo');
    // Making an error
    // const a = undefined;
    // a.name = 'My';
    subscriber.complete();
    subscriber.next('Hola');
    subscriber.next('Mundo');

});

// obs$.subscribe(
//     next => console.log('next', next),
//     error => console.warn('error', error),
//     () => console.info('Completed')
// );
obs$.subscribe(observer);