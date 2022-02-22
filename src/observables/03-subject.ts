import { Observable, Observer, Subject } from 'rxjs'

const observer: Observer<any> = {
    next: value => console.log('next', value),
    error: err => console.warn('error', err),
    complete: () => console.info('Completed')
};

const intervalo$ = new Observable<number>(subscriber => {
    const interval = setInterval(() => {
        subscriber.next(Math.random())
    }, 1000);
    return () => {
        clearInterval(interval);
        console.log('Interval destroyed');
    }
});

// const subscription1 = intervalo$.subscribe({
//     next: value => console.log('sub1', value)
// });
// const subscription2 = intervalo$.subscribe({
//     next: value => console.log('sub2', value)
// });
const subject$ = new Subject();
const subscription = intervalo$.subscribe(subject$);

const subscription1 = subject$.subscribe(observer);
const subscription2 = subject$.subscribe(observer);

setTimeout(() => {
    subject$.next(10);
    subject$.complete();
    subscription.unsubscribe();
}, 3500)