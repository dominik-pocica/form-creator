let socket = new WebSocket("ws://localhost:8080");

document.getElementById('send').addEventListener('click', () => {
    socket.send('shvrthcrt')
})