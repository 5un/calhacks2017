
exports.handler = (req, res) => {
  res.status(400).send({ message: 'Method not allowed!' });
}