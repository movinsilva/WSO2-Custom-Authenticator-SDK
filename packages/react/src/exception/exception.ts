class AsgardeoAuthException {
  public name: string;

  public code: string | undefined;

  public message: string;

  public constructor(code: string, name: string, message: string) {
    this.message = message;
    this.name = name;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default AsgardeoAuthException;
