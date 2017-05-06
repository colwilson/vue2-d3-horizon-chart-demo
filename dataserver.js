const Server = require('socket.io')
// const faker = require('faker');
// const bogan = require('boganipsum');

const io = new Server()

function iso() {
  var d = new Date();
  var n = d.toISOString();
  return n;
}

let last = {
  dt: Date.now(),
  value: 100.0,
  change: 0.0
}

let randomChange = () => {
  let mx = 5.0
  let mn = -mx
  return (Math.random() * (mx - mn) + mn)
}

io.on('connection', function (socket) {
  let interval = 100 // millisecs
  setInterval(() => {
    let delta = (last.change ^ .7) + randomChange()
    let data = {
      dt: Date.now(),
      change: delta,
      value: last.value += delta
    }
    last = data
    process.stdout.write(".");
    socket.emit('prices', data);
  }, interval)
})

io.listen(9999)
