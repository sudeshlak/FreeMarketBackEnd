import { EventEmitter } from "events";

export const appEvents = new EventEmitter();

export const ORDER_STATUS_CHANGED = 'order.status.changed';