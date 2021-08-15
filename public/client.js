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

        socket.on("login_yes", (username) => {
            console.log("Youve logged in with " + username);
        })
    }

    function new_chat(message) {
        document.getElementById("chat").value += "\n" + message;
        document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
    }

    function log_in() {
        if (!localStorage.getItem('gspace_login')) {
            localStorage.setItem('gspace_login', socket.id);
            socket.emit('login', socket.id);
        } else {
            var password = localStorage.getItem('gspace_login');
            socket.emit('login', password);
        }
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
        });
        var loginbutton = document.getElementById("login");
        loginbutton.addEventListener("click", function (e) {
            log_in();
        });
        bind();
    }

    window.addEventListener("load", init, false);

})();
