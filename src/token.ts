import { uid } from "uid/secure";
import { createHash } from "crypto";

export const METADATA_TOKEN_KEY = "__METADATA_TOKEN_KEY__";

// TODO: Save InjectionToken to central container
export class InjectionToken {
  private _id: string;
  private _identifier: string | Ctr;
  private _token: string;
  private _boundTarget: Ctr;

  constructor(identifier: string | Ctr) {
    this._id = this._generateId();

    if (typeof identifier === "string") {
      this._token = this._generateToken(this._id, identifier);
    } else if (typeof identifier === "function") {
      this.bindTo(identifier);
      this._token = this._generateToken(this._id, identifier.name);
    }

    return this;
  }

  public get id() {
    return this._id;
  }

  public get identifier() {
    return this._identifier;
  }

  public get token() {
    return this._token;
  }

  private _generateId() {
    return uid(21);
  }

  private _generateToken(id: string, name: string) {
    return createHash("sha256").update(`${id}_${name}`).digest("hex");
  }

  public hasBoundTarget() {
    return !!this._boundTarget;
  }

  public get boundTarget() {
    return this._boundTarget;
  }

  public bindTo(target: Ctr) {
    const currentMetadataKeys = Reflect.getOwnMetadataKeys(target);

    if (currentMetadataKeys.includes(METADATA_TOKEN_KEY)) {
      return this;
    }

    this._boundTarget = target;
    Reflect.defineMetadata(METADATA_TOKEN_KEY, this, target);

    return this;
  }
}

export type ForwardRefFn = () => InjectionToken;
