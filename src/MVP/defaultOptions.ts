import { IModelOptions } from './Model';
import { IViewOptions } from './View';

interface IOptions extends IModelOptions, IViewOptions {}

const defaultOptions: IOptions = {
  begin: 0,
  end: 10,
  range: false,
  min: 0,
  max: 10,
  step: 1,
  reverse: false,
  customValues: null,

  length: '300px',
  vertical: false,
  tooltip: true,
  scale: true,
};

export { IOptions };
export { defaultOptions };
