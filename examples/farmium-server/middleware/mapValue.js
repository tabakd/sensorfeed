export default (in_min, in_max, out_min, out_max) => next => res => {
  res.data = (res.data - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  res.data = Math.round(res.data);
  return next(res);
};
