module.exports = {
  parseNodeId: hash => {
    const ascii = new Buffer(hash, 'base64').toString('ascii');
    const parts = ascii.split(':');
    if (parts.length !== 2) throw new Error('invalid node id');
    const [type, id] = parts;
    return { type, id };
  },
  generateNodeId: ({id, type}) => {
    return new Buffer(`${type}:${id}`, 'ascii').toString('base64');
  }
}