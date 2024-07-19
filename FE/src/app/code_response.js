import CodeMessage from "./code_message";

class CodeResponse {
  constructor(result, errorCode, payload = {}) {
    if (!result || !errorCode || !payload) {
      const missingParameters = [];

      if (!result) missingParameters.push("result");
      if (!errorCode) missingParameters.push("errorCode");
      if (!payload) missingParameters.push("payload");

      const errorMessage = `The following parameter(s) are missing: ${missingParameters.join(
        ", "
      )}`;
      throw new Error(errorMessage);
    }

    this.result = result;
    this.errorCode = errorCode;
    this.message = this.getErrorMessage(errorCode);
    this.payload = payload;
  }

  getErrorMessage(errorCode) {
    const errorType = CodeMessage.find((error) => error.code === errorCode);
    const errorMessage = errorType ? errorType.message : null;
    if (errorMessage) return errorMessage;
    else return "잘못된 오류 코드입니다.";
  }
}

export default CodeResponse;
