# sensorfeed
Pipe firmata analog pin data through middleware.


## SensorFeed
`let board = new SensorFeed(<serial port>)`

- `board.use(sensor)`
Register new sensor.
```js
  sensor = {
    name: <sensor name>,
    pin: <arduino pin>,
    rate: <rate of capture>,
    middleware: [...<middleware>]
  }
```

- `board.listen()`
Begin listening to sensor data.


## Middleware
```js
  const logger = next => res => {
    console.log(res);
    return next(res);
  }
```
