import Model, { IModel } from '../src/MVP/Model';
import View, { IView } from '../src/MVP/View';
import Presenter, { IPresenter } from '../src/MVP/Presenter';
import { defaultOptions, IOptions } from '../src/MVP/defaultOptions';
import { IWarnings } from '../src/MVP/validations';

let model: IModel;
let view: IView;
let sliderNode: HTMLDivElement;
let viewOptions: IOptions;
let presenter: IPresenter;


beforeEach( function() {
    sliderNode = document.createElement('div');
    document.body.append(sliderNode);
    model = new Model(defaultOptions);
    viewOptions = Object.assign({}, defaultOptions, model.getOptions());
    view = new View(viewOptions, sliderNode);
    presenter = new Presenter(model, view);
});
afterEach( function() {
    model = null;
    view = null;
    viewOptions = null;
    sliderNode.remove();
    presenter = null;
});

describe('Presenter is created with defaultOptions', () => {
    it('can create', () => {
        expect(presenter).toBeDefined();
    });

    it('stores model and view as privet properites', () => {
        // @ts-ignore
        expect(presenter._view).toBeDefined();
        // @ts-ignore
        expect(presenter._model).toBeDefined();
    });

    it('adds callbacks to view and model, with react on current changes', () => {
        // @ts-ignore
        expect(presenter._model.listeners.length).not.toBeNull();
        // @ts-ignore
        expect(presenter._view.listeners.length).not.toBeNull();
    });
});

describe('Presenter has public methods', () => {
    describe('method update', () => {
        it('changes model and view by new options', () => {
            let newOptions: {min: number, step: number, length: string} = {
                min: -10,
                step: 2,
                length: '20px'
            };

            presenter.update(newOptions);

            // @ts-ignore
            expect(presenter._model._min).toBe(-10);
            // @ts-ignore
            expect(presenter._model._step).toBe(2);
            // @ts-ignore
            expect(presenter._view._length).toBe('20px');
        });

        it('notifies listeners about new data and new warnings', () => {
            let isNotified: Boolean = false;
            let newData: IOptions;
            let newWarnings: IWarnings;
            presenter.subscribe((options: IOptions, warnings: IWarnings) => {
                isNotified = true;
                newData = options;
                newWarnings = warnings;
            });

            let newOptions = {
                min: -10,
                step: 2,
                length: '20px'
            };

            presenter.update(newOptions);

            expect(isNotified).toBeTruthy();
            expect(newData).toBeDefined();
            expect(newWarnings).toBeDefined();
        });
    });

    describe('method getOptions', () => {
        it('returns an object of model and view options', () => {
            let options: IOptions = presenter.getOptions();
            expect(options).toEqual(defaultOptions);
        });
    });

    describe('method getWarnings', () => {
        it('returns an object with last gotten warnings', () => {
            // @ts-ignore
            model._warnings = {warning: 'something'}

            // @ts-ignore
            let warnings: {warning: 'something'} = presenter.getWarnings();
            expect(warnings.warning).toBe('something');
        });
    });
});


