"use strict";

(function () {

    let socket //Socket.IO client
    /**
     * Binde Socket.IO and button events
     */
    function bind() {
        socket.on("connect", () => {
            console.log("connected")
        });

        socket.on("disconnect", () => {
            console.log("disconnected")
        });

        socket.on("error", () => {
            console.log("error")
        });

        socket.on("chat", (message) => {
            new_chat(message);
        });
    }

    function new_chat(message) {
        document.getElementById("chat").value += "\n" + message;
        document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
    }

    /**
     * Client module init
     */
    function init() {
        socket = io({ upgrade: false, transports: ["websocket"] });
        var send = document.getElementById("send");
        send.addEventListener("click", function (e) {
            socket.emit("send", socket.id, document.getElementById("msgbar").value);
            document.getElementById("msgbar").value = '';
        })
        bind();
    }

    window.addEventListener("load", init, false);

})();
