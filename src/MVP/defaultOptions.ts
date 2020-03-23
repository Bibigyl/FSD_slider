interface IModelOptions {
  begin: number;
  end: number;
  range: boolean;
  min: number;
  max: number;
  step: number;
  customValues: string[] | null;
  reverse: boolean;
}

interface IViewOptions {
  length: string;
  vertical: boolean;
  tooltip: boolean;
  scale: boolean;
}

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

export { IOptions, IModelOptions, IViewOptions };
export { defaultOptions };
