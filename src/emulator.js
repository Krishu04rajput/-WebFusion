"use strict";

let emulator = null;

function loadV86() {

    return new Promise((resolve, reject) => {

        if (window.V86) {
            resolve();
            return;
        }

        const script = document.createElement("script");

        script.src = "vendor/v86/build/libv86.js";

        script.onload = () => {
            console.log("🔥 v86 loaded from WebFusion!");
            resolve();
        };

        script.onerror = () => {
            reject(
                new Error("v86 engine could not be loaded.")
            );
        };

        document.head.appendChild(script);
    });
}


async function startEmulator() {

    const screen = document.getElementById("screen_container");
    const screenText = document.getElementById("screenText");
    const status = document.getElementById("status");

    screenText.textContent = "⚙️ Loading v86...";
    screenText.style.display = "block";

    status.textContent = "Loading virtual machine...";

    try {

        await loadV86();

        screenText.style.display = "none";

        status.textContent = "🧠 Starting virtual CPU...";

        emulator = new V86({

            wasm_path:
                "vendor/v86/build/v86.wasm",

            memory_size:
                32 * 1024 * 1024,

            vga_memory_size:
                2 * 1024 * 1024,

            screen_container:
                screen,

            bios: {
                url:
                    "vendor/v86/bios/seabios.bin"
            },

            vga_bios: {
                url:
                    "vendor/v86/bios/vgabios.bin"
            },

            autostart: true
        });

        status.textContent =
            "🟢 Virtual machine started!";

        console.log(
            "🚀 WebFusion virtual machine is running!"
        );

    } catch (error) {

        console.error(
            "WebFusion emulator error:",
            error
        );

        screenText.style.display = "block";

        screenText.textContent =
            "❌ Emulator failed to start.";

        status.textContent =
            error.message;
    }
}


async function startAndroid() {

    await startEmulator();

}


async function startWindows() {

    await startEmulator();

}
