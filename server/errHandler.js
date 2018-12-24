function errHandler(err, req, res, next) {
  console.error(err);
  res.status(404).send(err);
}

module.exports = errHandler;
