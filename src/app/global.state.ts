import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GlobalState {

  private _data = new Subject<Object>();
  private _dataStream$ = this._data.asObservable();

  private _allDatas = new Map<String, Map<string, Object>>();

  private _subscriptions: Map<string, Map<string, Function>> = new Map<string, Map<string, Function>>();

  constructor() {
    this._dataStream$.subscribe((data) => this._onEvent(data));
  }

  notifyDataChanged(event, value) {
    let current = this._data[event];
    this._allDatas.set(event, value);
    if (current !== value) {
      this._data[event] = value;
     // console.log('value', value);
      this._data.next({
        event: event,
        data: this._data[event]
      });
    }
  }

  subscribe(eventKey: string, functionKey: string, callback: Function) {
    let subscribers = this._subscriptions.get(eventKey) || new Map();
    subscribers.set(functionKey, callback);
    this._subscriptions.set(eventKey, subscribers);
  }

  unsubscribe(eventKey: string, functionKey: string) {
    let functs = this._subscriptions.get(eventKey);
    functs.delete(functionKey);
    this._subscriptions.set(eventKey, functs);
  }

  //DXC-2247 - solution intermédiaire
  forceGet(key: string) {
    return this._allDatas.get(key);
  }

  _onEvent(data: any) {
    let subscribers = this._subscriptions.get(data['event']) || [];
    var funcs = subscribers.values();
    let callback = funcs.next();
    while (!callback.done) {
      callback.value.call(null, data['data']);
      callback = funcs.next();
    }
  }
}
