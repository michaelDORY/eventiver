class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static badRequest(errors = [], message) {
    return new ApiError(400, message ?? 'Something went wrong', errors)
  }

  static unauthorized() {
    return new ApiError(401, 'User is unauthorized')
  }

  static forbidden() {
    return new ApiError(403, "User doesn't has access")
  }

  static notFound(errors = [], message) {
    return new ApiError(404, message ?? 'Not found', errors)
  }
}

module.exports = ApiError
