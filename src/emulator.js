"use strict";

let emulator = null;

function startEmulator() {

    const screen = document.getElementById("screen_container");
    const screenText = document.getElementById("screenText");
    const status = document.getElementById("status");

    screenText.textContent = "🧠 Starting virtual machine...";
    screenText.style.display = "block";

    status.textContent = "Loading WebFusion emulator...";

    try {

        emulator = new V86({

            wasm_path: "vendor/v86/v86.wasm",

            memory_size: 32 * 1024 * 1024,

            vga_memory_size: 2 * 1024 * 1024,

            screen_container: screen,

            bios: {
                url: "vendor/v86/bios/seabios.bin"
            },

            vga_bios: {
                url: "vendor/v86/bios/vgabios.bin"
            },

            autostart: true

        });

        screenText.style.display = "none";

        status.textContent =
            "🟢 Virtual machine started!";

        console.log("🔥 WebFusion VM started!");

    } catch (error) {

        console.error(error);

        screenText.style.display = "block";

        screenText.textContent =
            "❌ Emulator failed to start.";

        status.textContent =
            error.message;
    }
}


function startAndroid() {
    startEmulator();
}


function startWindows() {
    startEmulator();
}
