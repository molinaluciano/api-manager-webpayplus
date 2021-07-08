function responseData(data) {
  if (data instanceof Error) {
    return {
      code: 500,
      error: {
        name: data.name,
        message: data.message,
      },
    };
  }
  if (!data || (data instanceof Array && data.length === 0)) {
    return {
      code: 404,
      data: null,
    };
  }
  return {
    code: 200,
    data,
  };
}

module.exports = {
  responseData,
};
