class CentralizedStorage {
  private static instance: CentralizedStorage;
  private map: Map<string, any> = new Map();

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): CentralizedStorage {
    if (!CentralizedStorage.instance) {
      CentralizedStorage.instance = new CentralizedStorage();
    }
    return CentralizedStorage.instance;
  }

  public set(key: string, value: any): void {
    this.map.set(key, value);
  }

  public get(key: string): any | undefined {
    return this.map.get(key);
  }

  public getMap(): Map<string, any> {
    return this.map;
  }
}

export function getCentralizedStorage(): CentralizedStorage {
  return CentralizedStorage.getInstance();
}
