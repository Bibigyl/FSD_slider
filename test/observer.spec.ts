import { Observable, IObservable, ObservablePresenter } from "../src/MVP/Observer"
import { IOptions, defaultOptions } from "../src/MVP/defaultOptions";
import { IWarnings } from "../src/MVP/validations";

let observable: IObservable;
let observablePresenter: IObservable;
type someMessage = {type: 'SOME_MESSAGE'};
let message: someMessage = {type: 'SOME_MESSAGE'};

beforeEach( function() {
    observable = new Observable<someMessage>();
    observablePresenter = new ObservablePresenter();
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

describe('Class ObservablePresenter is used for subscription in Presenter for outer listeners', () => {
    
    it('can subscribe listeners as callbacks and stores it as array listeners', () => {
        observablePresenter.subscribe(function() {});
        // @ts-ignore
        expect(observablePresenter.listeners.length).toBe(1);
    });
    it('can notify listeners when anything happened by function notify and send to listeners objects of options and warnings', () => {
        let anythingHappened: boolean = false;
        let gottenOptions: IOptions;

        observablePresenter.subscribe(function(options: IOptions, warnings: IWarnings) {
            anythingHappened = true;
            gottenOptions = options;
        });
        observablePresenter.notify(defaultOptions, {});

        expect(anythingHappened).toBeTruthy();
        expect(gottenOptions).toEqual(defaultOptions);
    });
});