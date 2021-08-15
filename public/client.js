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

        socket.on("name_yes", (username) => {
            console.log("Your name has been changed to " + username);
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

    function send(message) {
        socket.emit("send", message);
    }

    function name_change() {
        let password = localStorage.getItem('gspace_login');
        let new_name = prompt("Enter your name");
        socket.emit('name', new_name, password);
    }

    /**
     * Client module init
     */
    function init() {
        socket = io({ upgrade: false, transports: ["websocket"] });
        document.getElementById("send").addEventListener("click", function (e) {
            send(document.getElementById('msgbar').value);
            document.getElementById("msgbar").value = '';
        });
        var loginbutton = document.getElementById("login");
        loginbutton.addEventListener("click", function (e) {
            log_in();
            loginbutton.setAttribute('disabled', 'disabled');
            document.getElementById('name').removeAttribute('disabled');
        });

        document.getElementById('name').addEventListener('click', function (e) {
            name_change();
        })
        bind();
    }

    window.addEventListener("load", init, false);

})();
