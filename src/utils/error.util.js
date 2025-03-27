/****
 ** Global error handler function that logs errors and handles different types of Sequelize errors.
 **
 ** @param {Error} error - The error object to be handled
 ** @param {Object} req - The request object
 ** @param {Object} res - The response object
 ** @param {Function} next - The next middleware function
 ** @return {Object} - The response object with appropriate error handling
 **/
export const globalErrorHandler = (error, req, res, next) => {
  // console.log(req.body);
  console.error(
    chalk.red(
      `Error ${error.stack ? `Stack--> ${error.stack} \n` : ``}${
        error.message ? `Message --> ${error.message}` : ``
      }`
    )
  );

  if (error.code === "ETIMEDOUT") {
    return res.status(504).json({
      status: false,
      message: "Server request timeout",
      details:
        "The request took too long to respond. Please check your network or try again later.",
    });
  }

  if (error.code === "ECONNRESET") {
    return res.status(504).json({
      status: false,
      message: "Connection reset by server",
      details: "The server closed the connection unexpectedly.",
    });
  }

  if (error.code === "EPIPE") {
    return res.status(504).json({
      status: false,
      message: "Broken connection",
      details:
        "The connection was interrupted before the response was completed.",
    });
  }

  if (error.httpStatus && error.message) {
    return res
      .status(error.httpStatus)
      .json({ status: false, message: error.message });
  }

  if (typeof error === "string") next(error);

  return res.status(500).json({
    status: false,
    message: "Internal Server Error",
    details: error.message || undefined // Expose details only in development
  });
};
