#React-UI SDK

## Error Codes

Error code consist of four parts separated by a `-`.

-   The first part refers to the SDK. Example: `JS` refers to this SDK.
-   The second part refers to the code file. Example: `AUTH_CORE` refers to the `authentication-core.ts` file.
-   The third part is the abbreviation of the name of the method/function that threw the error. If there are more than one method/function with the same abbreviation, then a number based on the order of declaration is appended to the abbreviation. Example: `RAT1` refers to the `requestAccessToken` method. There are two methods that can be abbreviated to `RAT` but since `1` has been appended to `RAT`, we know it refers to `requestAccessToken` since it is declared first.
-   The fourth part refers to the type of error and is position. Example: `NE02` refers to a network error and the fact that this is the second error in the method/function. The following error types are available:

    | Error Code | Description   |
    |:-----------|:--------------|
    | `NE`       | Network Error |
    | `HE`       | Http Error    |
    | `IV`       | Invalid       |
    | `NF`       | Not Found     |
    | `TO`       | Timeout       |
    | `SE`       | Server Error  |

## Contribute

Please read [Contributing to the Code Base](http://wso2.github.io/) for details on our code of conduct, and the process for submitting pull requests to us.

### Reporting issues

We encourage you to report issues, improvements, and feature requests creating [Github Issues](https://github.com/asgardeo/asgardeo-auth-js-sdk/issues).

Important: And please be advised that security issues must be reported to security@wso2com, not as GitHub issues, in order to reach the proper audience. We strongly advise following the WSO2 Security Vulnerability Reporting Guidelines when reporting the security issues.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.