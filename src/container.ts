import "reflect-metadata";

const INJECT_CLASS_METADATA_KEY = "__INJECT_CLASS_METADATA_KEY__";

export type Ctr<T = any> = new (...args: any[]) => T;

import { DeliverModule } from "./deliver.module";
import { OfficeModule } from "./office.module";
import { IUserModule } from "./user.module.interface";
import { IDeliverModule } from "./deliver.module.interface";
import { IOfficeModule } from "./office.module.interface";
import { UserModule } from "./user.module";
import { InjectionToken } from "./token";

class DIContainer {
  private _constructor2Instance: Map<InjectionToken["token"], any> = new Map();
  private _tokenMap: Map<InjectionToken["token"], Ctr<any>> = new Map();

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

  public getDependencyByToken<T>(injectionToken: InjectionToken): T {
    return this._constructor2Instance.get(injectionToken.token);
  }

  public bindToClass<T>(token: InjectionToken, ctr: Ctr): this {
    this._tokenMap.set(token.token, ctr);
    return this;
  }

  public get tokenMap() {
    return this._tokenMap;
  }

  public getConstructorByToken(token: InjectionToken): Ctr {
    if (this._tokenMap.has(token.token)) {
      return this._tokenMap.get(token.token) as Ctr;
    }

    throw new Error(`Token ${String(token.token)} not bound`);
  }

  public construct<T>(ctr: Ctr, injectionToken: InjectionToken): T {
    if (this._constructor2Instance.has(injectionToken.token)) {
      return this._constructor2Instance.get(injectionToken.token);
    }

    // Load the constructor's param types
    const params = Reflect.getMetadata("design:paramtypes", ctr) || [];

    const injectedMetadataList =
      (Reflect.getMetadata(
        "__INJECT_CLASS_METADATA_KEY__",
        ctr
      ) as IPayload[]) || [];

    const injectedMetadataKeybyIndex = injectedMetadataList.reduce(
      (acc, cur) => {
        acc.set(cur.index, cur);

        return acc;
      },
      new Map<number, IPayload>()
    );

    // Inject the dependencies
    const args = params.map((param: unknown, paramIndex: number) => {
      console.log("[DEBUG][DzungDang] param:", param, paramIndex, ctr.name);

      if (!injectedMetadataKeybyIndex.has(paramIndex)) {
        console.log("[DEBUG][DzungDang] param is not injected:", param);

        // TODO: Handle case when param is not injected and is type of Class

        console.log("[DEBUG][DzungDang] ---param:", param?.name);
        return param;
      }

      const injectionToken = (
        injectedMetadataKeybyIndex.get(paramIndex) as IPayload
      ).token;

      const ctrByToken = this.getConstructorByToken(injectionToken);

      return this.construct<T>(ctrByToken, injectionToken);
    });

    const instance = new ctr(...args);
    this._constructor2Instance.set(injectionToken.token, instance);
    return instance;
  }

  public get constructor2Instance() {
    return this._constructor2Instance;
  }
}

const container = DIContainer.getInstance();
console.log("[DEBUG][DzungDang] me fukin in here:");
const userModuleToken = new InjectionToken("UserModule");
const deliverModuleToken = new InjectionToken("DeliverModule");
const officeModuleToken = new InjectionToken("OfficeModule");
container.bindToClass(userModuleToken, UserModule);
container.bindToClass(deliverModuleToken, DeliverModule);
container.bindToClass(officeModuleToken, OfficeModule);
console.log("[DEBUG][DzungDang] and u suck with DI Container here:", container);
container.construct<IUserModule>(UserModule, userModuleToken);
container.construct<IDeliverModule>(DeliverModule, deliverModuleToken);
container.construct<IOfficeModule>(OfficeModule, officeModuleToken);

export function Injectable(target: Ctr, ...args: any[]) {
  return target;
}

export interface IPayload {
  index: number;
  token: InjectionToken;
  sourceConstructor: Ctr;
}

/**
 * inject decorator to module to class constructor
 * @param target Target class
 * @param key Possible undefined cause it's parameter of constructor
 * @param index Indexing order of parameter in constructor
 */
export function Inject(token: InjectionToken) {
  return (target: any, key: string | undefined, index: number) => {
    const metadataKey = "__INJECT_CLASS_METADATA_KEY__";
    // Define metadata to mark the injected constructor parameter
    const payload: IPayload = {
      index,
      token,
      sourceConstructor: target,
    };

    const metadataValue = Reflect.getMetadata(metadataKey, target) || [];
    metadataValue.push(payload);

    Reflect.defineMetadata(metadataKey, metadataValue, target);
  };
}

export { container };
