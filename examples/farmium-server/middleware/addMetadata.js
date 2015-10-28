export default data => next => res => {
  res.meta = data;
  return next(res);
};
