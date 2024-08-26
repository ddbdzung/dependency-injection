import "reflect-metadata";

type Ctr = { new (...args: any[]): any };

import { DeliverModule } from "./deliver.module";
import { OfficeModule } from "./office.module";
import { IUserModule } from "./user.module.interface";
import { IDeliverModule } from "./deliver.module.interface";
import { IOfficeModule } from "./office.module.interface";
import { UserModule } from "./user.module";

class DIContainer {
  private _constructor2Instance: Map<Ctr, any> = new Map();

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

  public getDependencyByCtr(ctr: Ctr) {
    return this.construct(ctr);
  }

  public construct<T>(ctr: Ctr): T {
    if (!ctr) {
      throw new Error("ctr not found", ctr);
    }
    console.log("[DEBUG][DzungDang] ctr:", ctr);
    if (this._constructor2Instance.has(ctr)) {
      return this._constructor2Instance.get(ctr);
    }

    const params = Reflect.getMetadata("design:paramtypes", ctr) || [];
    const args = params.map(this.construct);
    const instance = new ctr(...args);
    this._constructor2Instance.set(ctr, instance);
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

// export function Injectable() {
//   return (target: Ctr) => {
//     Reflect.defineMetadata("design:paramtypes", [], target);
//   };
// }
export function Injectable() {
  return (target: Ctr) => {
    Reflect.defineMetadata("design:paramtypes", [], target);
  };
}

// export function Inject() {
//   return (target: any, key: string | symbol | undefined, index: number) => {
//     const paramTypes = Reflect.getMetadata("design:paramtypes", target) || [];
//     console.log("[DEBUG][DzungDang] paramTypes:", paramTypes);
//     const dependencyCtor = paramTypes[index];

//     if (!dependencyCtor) {
//       throw new Error(`No constructor parameter type found at index ${index}`);
//     }

//     // Store the dependency information in the target's metadata
//     if (!target.constructor.injectDependencies) {
//       target.constructor.injectDependencies = [];
//     }
//     target.constructor.injectDependencies[index] = dependencyCtor;
//   };
// }

export { container };
