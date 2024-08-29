import { uid } from "uid/secure";

import type { IUserModule } from "./user.module.interface";
import type { IDeliverModule } from "./deliver.module.interface";
import type { IOfficeModule } from "./office.module.interface";

import { DeliverModule } from "./deliver.module";
import { OfficeModule } from "./office.module";
import { UserModule } from "./user.module";
import { InjectionToken } from "./token";
import { getCentralizedStorage } from "./initial-module";
import {
  IPayloadInjector,
  IPayloadInjectorWithoutForwardRef,
} from "./decorator";

export const INJECT_CLASS_METADATA_KEY = "__INJECT_CLASS_METADATA_KEY__";
export const CONSTRUCTOR_PARAM_METADATA_KEY = "design:paramtypes";

class DIContainer {
  private _constructor2Instance: Map<InjectionToken["token"], any> = new Map();

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

  public construct<T>(ctr: Ctr, injectionToken: InjectionToken): T {
    // Check if the instance is already created, return it
    if (this._constructor2Instance.has(injectionToken.token)) {
      return this._constructor2Instance.get(injectionToken.token);
    }

    // Load the constructor's param types
    const params =
      Reflect.getMetadata(CONSTRUCTOR_PARAM_METADATA_KEY, ctr) || [];

    // Load injected metadata list (including forwardRef token and plain token)
    const injectedMetadataList =
      (Reflect.getMetadata(
        INJECT_CLASS_METADATA_KEY,
        ctr
      ) as IPayloadInjector[]) || [];

    const injectedMetadataDict = injectedMetadataList.reduce((acc, cur) => {
      acc.set(cur.index, cur);

      return acc;
    }, new Map<number, IPayloadInjector>());

    // Inject the dependencies
    const args = params.map((param: unknown, paramIndex: number) => {
      // If the param is not injected, return it
      if (!injectedMetadataDict.has(paramIndex)) {
        return param;
      }

      const injector = injectedMetadataDict.get(paramIndex) as IPayloadInjector;
      const { token, injected } = injector;
      if (!token) {
        throw new Error(
          `Injection token is not found for ${paramIndex} in ${ctr.name}`
        );
      }

      // If param is a class and already injected, return the instance
      if (injected) {
        return this.getDependencyByToken(token as InjectionToken);
      }

      const tokenOfInjector = token instanceof InjectionToken ? token : token();

      injector.injected = true;
      injector.token = tokenOfInjector;

      // COnvert from Map to Array of Object
      const newMetadataValue = Array.from(injectedMetadataDict.values());

      Reflect.defineMetadata(
        "__INJECT_CLASS_METADATA_KEY__",
        newMetadataValue,
        ctr
      );

      const ctrByToken = tokenOfInjector.boundTarget;
      return this.construct<T>(ctrByToken, tokenOfInjector);
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

export { container };
