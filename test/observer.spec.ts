import { Observable, IObservable } from "../src/MVP/Observable"
import defaultOptions from "../src/MVP/defaultOptions";
import { IOptions } from "../src/MVP/options";

let observable: IObservable;
type someMessage = {type: 'SOME_MESSAGE', data: IOptions};
let message: someMessage = {type: 'SOME_MESSAGE', data: defaultOptions};

beforeEach( function() {
    observable = new Observable<someMessage>();
})

describe('Class Observable is used for subscription', () => {
    
    it('can subscribe listeners as callbacks and stores it as array listeners', () => {
        observable.subscribe(function() {});
        // @ts-ignore
        expect(observable.listeners.length).toBe(1);
    });
    it('can notify listeners when anything happened by function notify and send to listeners some data as object', () => {
        let anythingHappened: boolean = false;

        observable.subscribe(function(message: someMessage) {
            if (message.type === 'SOME_MESSAGE') {
                anythingHappened = true;
            }
        });
        observable.notify(message);

        expect(anythingHappened).toBeTruthy();
    });
});