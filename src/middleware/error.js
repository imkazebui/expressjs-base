export const errorHandler = (error, request, response, next) => {
  const status = error.statusCode || error.status || 500;

  response.status(status).send(error);
};
