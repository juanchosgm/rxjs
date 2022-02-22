import { Observable, Observer } from 'rxjs'

const observer: Observer<any> = {
    next: value => console.log('next', value),
    error: err => console.warn('error', err),
    complete: () => console.info('Completed')
};

const intervalos$ = new Observable<number>(subscriber => {
    let counter = 0;
    const interval = setInterval(() => {
        counter++;
        subscriber.next(counter);
        console.log(counter);
    }, 5000);
    // Callback to execute when the observable is unsubscribed
    return () => {
        clearInterval(interval);
        console.log('Interval destroyed');
    }
});

const subscription = intervalos$.subscribe(observer);
const subscription2 = intervalos$.subscribe(observer);
const subscription3 = intervalos$.subscribe(observer);
subscription.add(subscription2)
subscription.add(subscription3);
setTimeout(() => {
    subscription.unsubscribe();
    // subscription2.unsubscribe();
    // subscription3.unsubscribe();
    console.log('Completed');
}, 10000);