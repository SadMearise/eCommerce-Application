import { getErrorByCode, type HttpErrorType } from "@commercetools/sdk-client-v2";

function loginErrorHandling () {
  const ErrorType = getErrorByCode(400);
  const error: HttpErrorType = new ErrorType("Oops this is an error");

  console.log(error);

  // error is of type
  // type HttpErrorType = {
  //   name: string;
  //   message: string;
  //   code: number;
  //   status: number;
  //   statusCode: number;
  //   body: Object;
  //   originalRequest: ClientRequest;
  //   headers?: {
  //     [key: string]: string;
  //   };
  // };
}
