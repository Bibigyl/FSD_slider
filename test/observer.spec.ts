import { Observable, IObservable } from "../src/MVP/Observable"
import defaultOptions from "../src/MVP/defaultOptions";
import { IOptions } from "../src/MVP/options";
import { IWarnings } from "../src/MVP/warnings";

let observable: IObservable;
let observablePresenter: IObservable;
type someMessage = {type: 'SOME_MESSAGE'};
let message: someMessage = {type: 'SOME_MESSAGE'};

beforeEach( function() {
    observable = new Observable<someMessage, undefined>();
    observablePresenter = new Observable<IOptions, IWarnings>();
})

describe('Class Observable is used for subscription in Model and View', () => {
    
    it('can subscribe listeners as callbacks and stores it as array listeners', () => {
        observable.subscribe(function() {});
        // @ts-ignore
        expect(observable.listeners.length).toBe(1);
    });
    it('can notify listeners when anything happened by function notify and send to listeners special message', () => {
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

describe('Class Observable is used for subscription in Presenter', () => {
    
    it('can subscribe listeners as callbacks and stores it as array listeners', () => {
        observablePresenter.subscribe(function() {});
        // @ts-ignore
        expect(observablePresenter.listeners.length).toBe(1);
    });
    it('can notify listeners when anything happened by function notify and send to listeners objects of options and warnings', () => {
        let presenterNotified: boolean = false;
        let gottenOptions: {} = {};

        observablePresenter.subscribe(function(options: IOptions, warnings: IWarnings) {
            presenterNotified = true;
            gottenOptions = options;
        });
        observablePresenter.notify(defaultOptions, {});

        expect(presenterNotified).toBeTruthy();
        expect(gottenOptions).toEqual(defaultOptions);
    });
});