import { IOCDefault } from "./interface";

export const NAME = "onoffcanvas";
export const EVENT_KEY = `.${NAME}`;

export const EventName = {
  SHOW: `show${EVENT_KEY}`,
  HIDE: `hide${EVENT_KEY}`
};

export const ClassName = {
  SHOW: "is-open"
};

export const Selector = {
  DATA_TOGGLE: '[data-toggle="onoffcanvas"]'
};

export const OcDefault: IOCDefault = {
  hideByEsc: false
};
