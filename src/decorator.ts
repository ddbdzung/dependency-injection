import "reflect-metadata";
import type { ForwardRefFn } from "./token";

import { getCentralizedStorage } from "./initial-module";
import { InjectionToken } from "./token";

export function Injectable(target: Ctr) {
  try {
    const centralizedStorage = getCentralizedStorage();
  } catch (error) {
    throw new Error(error as any);
  }

  return target;
}

export interface IPayloadInjector {
  index: number;
  token: InjectionToken | ForwardRefFn;
  sourceConstructor: Ctr;
  injected: boolean;
}

/**
 * inject decorator to module to class constructor
 * @param target Target class
 * @param key Possible undefined cause it's parameter of constructor
 * @param index Indexing order of parameter in constructor
 */
export function Inject(token: InjectionToken | ForwardRefFn) {
  return (target: any, key: string | undefined, index: number) => {
    const metadataKey = "__INJECT_CLASS_METADATA_KEY__";

    // Define metadata to mark the injected constructor parameter
    const payload: IPayloadInjector = {
      index,
      token,
      sourceConstructor: target,
      injected: false,
    };

    const metadataValue = Reflect.getMetadata(metadataKey, target) || [];
    metadataValue.push(payload);

    Reflect.defineMetadata(metadataKey, metadataValue, target);
  };
}
