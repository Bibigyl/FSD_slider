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


export { IOptions, IModelOptions, IViewOptions };
