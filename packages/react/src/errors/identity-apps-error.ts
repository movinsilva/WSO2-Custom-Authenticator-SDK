/**
 * Base error class for sdk.
 */
class IdentityAppsError {
  public code: number | string;

  public description: string;

  public message: string;

  public traceId: number | string;

  /**
     * Constructor.
     * @param {string} message - Message for the error.
     * @param {number | string} code - Error status code.
     * @param {string} description - Description of the error.
     * @param {number | string} traceId - Trace ID of the error.
     */
  // eslint-disable-next-line max-len
  constructor(code: number | string, description: string, message?: string, traceId?: number | string) {
    this.code = code;
    this.description = description;
    this.message = message || '';
    this.traceId = traceId || '';
  }

  public getErrorCode(): string | number {
    return this.code;
  }

  public getErrorDescription(): string {
    return this.description;
  }

  public getErrorMessage(): string {
    return this.message;
  }

  public getErrorTraceId(): string | number {
    return this.traceId;
  }
}
