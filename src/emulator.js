"use strict";

let emulator = null;

function loadV86() {
    return new Promise((resolve, reject) => {

        // Don't load it twice
        if (window.V86) {
            resolve();
            return;
        }

        const script = document.createElement("script");

        script.src =
            "https://raw.githubusercontent.com/copy/v86/master/build/libv86.js";

        script.onload = () => {
            console.log("🔥 v86 loaded!");
            resolve();
        };

        script.onerror = () => {
            reject(new Error("Could not load v86."));
        };

        document.head.appendChild(script);
    });
}


async function startEmulator() {

    const screen = document.getElementById("screen_container");
    const screenText = document.getElementById("screenText");
    const status = document.getElementById("status");

    screenText.textContent = "⚙️ Loading emulator...";
    status.textContent = "Loading v86...";

    try {

        await loadV86();

        screenText.style.display = "none";

        status.textContent = "🧠 Starting virtual machine...";

        emulator = new V86({

            wasm_path:
                "https://raw.githubusercontent.com/copy/v86/master/build/v86.wasm",

            memory_size:
                64 * 1024 * 1024,

            vga_memory_size:
                2 * 1024 * 1024,

            screen_container:
                screen,

            bios: {
                url:
                    "https://raw.githubusercontent.com/copy/v86/master/bios/seabios.bin"
            },

            vga_bios: {
                url:
                    "https://raw.githubusercontent.com/copy/v86/master/bios/vgabios.bin"
            },

            autostart: true

        });

        status.textContent =
            "🟢 Virtual machine started — waiting for boot media.";

        console.log("🚀 WebFusion VM started!");

    } catch (error) {

        console.error(error);

        screenText.style.display = "block";

        screenText.textContent =
            "❌ Emulator failed to load.";

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
