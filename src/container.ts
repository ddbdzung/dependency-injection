import "reflect-metadata";

const INJECT_CLASS_METADATA_KEY = "__INJECT_CLASS_METADATA_KEY__";

function isNotClassConstructor(variable) {
  // Check if the variable is a function
  if (typeof variable !== "function") {
    return true;
  }

  // Try to instantiate the function with `new`
  try {
    Reflect.construct(String, [], variable);
  } catch (e) {
    // If instantiation fails, it's not a class constructor
    return true;
  }

  // If it passes both checks, it is a class constructor
  return false;
}

type Ctr = new (...args: any[]) => any;

import { DeliverModule } from "./deliver.module";
import { OfficeModule } from "./office.module";
import { IUserModule } from "./user.module.interface";
import { IDeliverModule } from "./deliver.module.interface";
import { IOfficeModule } from "./office.module.interface";
import { UserModule } from "./user.module";

class DIContainer {
  private _constructor2Instance: Map<string, any> = new Map();

  private static _instance: DIContainer;

  public static getInstance(): DIContainer {
    if (!DIContainer._instance) {
      DIContainer._instance = new DIContainer();
    }

    return DIContainer._instance;
  }

  private constructor() {
    // Prevent new instance
  }

  public getDependencyByCtr<T>(ctrName: string): T {
    return this._constructor2Instance.get(ctrName);
  }

  public construct<T>(ctr: Ctr): T {
    if (this._constructor2Instance.has(ctr.name)) {
      return this._constructor2Instance.get(ctr.name);
    }

    // Load the constructor's param types
    const params = Reflect.getMetadata("design:paramtypes", ctr) || [];
    const injectedMetadataIndexList = (
      Reflect.getMetadata("__INJECT_CLASS_METADATA_KEY__", ctr) || []
    ).map((i) => i.index);

    // Inject the dependencies
    const args = params.map((param: any, paramIndex: number) => {
      console.log("[DEBUG][DzungDang] param:", param, paramIndex, ctr.name);
      if (!injectedMetadataIndexList.includes(paramIndex)) {
        console.log("[DEBUG][DzungDang] param is not injected:", param);
        return param;
      }

      return this.construct(param);
    });

    const instance = new ctr(...args);
    this._constructor2Instance.set(ctr.name, instance);
    return instance;
  }

  public get constructor2Instance() {
    return this._constructor2Instance;
  }
}

const container = DIContainer.getInstance();
container.construct<IUserModule>(UserModule);
container.construct<IDeliverModule>(DeliverModule);
container.construct<IOfficeModule>(OfficeModule);

export function Injectable(target: Ctr, ...args: any[]) {
  return target;
}

export interface IPayload {
  index: number;
  classConstructor: Ctr;
}

/**
 * inject decorator to module to class constructor
 * @param target Target class
 * @param key Possible undefined cause it's parameter of constructor
 * @param index Indexing order of parameter in constructor
 */
export function Inject(target: any, key: string, index: number) {
  const metadataKey = "__INJECT_CLASS_METADATA_KEY__";
  // Define metadata to mark the injected constructor parameter
  const payload: IPayload = {
    index,
    sourceConstructor: target,
  };

  const firstObj = Reflect.getMetadata("design:paramtypes", target)[0];
  console.log("[DEBUG][DzungDang] firstObj:", firstObj);

  const metadataValue = Reflect.getMetadata(metadataKey, target) || [];
  metadataValue.push(payload);

  Reflect.defineMetadata(metadataKey, metadataValue, target);
}

export { container };
