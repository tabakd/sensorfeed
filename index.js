import Board from 'firmata';

export default class SensorFeed {
  constructor(port) {
    this.board = new Board(port);
    this.sensors = [];
  }
  use(sensor) {
    this.sensors.push(sensor);
  }
  analogRead(sensor, cb) {
    let {pin, rate} = sensor;
    let then = Date.now();
    let now = Date.now();
    this.board.analogRead(pin, (data) => {
      now = Date.now()
      if (now - then > rate) {
        then = Date.now();
        cb({data, sensor});
      }
    })
  }
  constructMiddleware(middleware) {
    middleware = middleware.slice().reverse()
    let cb = next => res => next(res);
    middleware.forEach((m) => {
      cb = m(cb)
    })
    return cb
  }
  listen() {
    this.board.on('ready', () => {
      this.sensors.forEach((sensor) => {
        this.analogRead(
          sensor,
          this.constructMiddleware(sensor.middleware))
      })
    })
  }
}
