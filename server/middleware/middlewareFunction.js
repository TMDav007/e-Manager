const errorStatus = (statusCode, errorMessage, res) => {
  res.status(statusCode).send({ error: errorMessage });
};

const checkField = (requestBody, requestAttribute, res) => {
  const undefinedOrEmpty = '' || undefined;
  if (requestBody === undefinedOrEmpty) {
    return errorStatus(400, `${requestAttribute} is required`, res);
  } else if (requestBody.length < 5) {
    return errorStatus(400, `${requestAttribute} is too short`, res);
  }
};

export default { errorStatus, checkField };
