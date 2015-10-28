export default socket => next => res => {
  const {data} = res;
  let msg = {};
  msg[res.sensor.name] = data;
  socket.emit('data', msg);
  return next(res);
};
