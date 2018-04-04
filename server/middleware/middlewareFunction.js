const errorStatus = (statusCode, errorMessage, res) => {
  res.status(statusCode).send({ error: errorMessage });
};

export default errorStatus;
