var port = 843;

var io = require('socket.io')( port );

io.on('connection', function (socket) {
  socket.on('woot_send', function(op){
    socket.broadcast.emit('woot_receive', op);
    if( op.type == 'cursor-create' && Object.keys(socket.nsp.sockets).length == 1 )
      socket.emit('woot_receive', {type: 'contents-init', contents: "Sample initial content that might be coming from permanent storage..."});
  });
  socket.on('woot_save', function(contents){
    console.log(contents);
  });
});
