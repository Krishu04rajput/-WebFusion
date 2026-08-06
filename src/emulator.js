"use strict";

let emulator = null;

function startEmulator() {
    const screenContainer =
        document.getElementById("screen_container");

    const screenText =
        document.getElementById("screenText");

    const status =
        document.getElementById("status");

    // Prevent starting multiple VMs
    if (emulator) {
        status.textContent = "🟢 WebFusion VM is already running.";
        return;
    }

    console.log("🚀 Starting WebFusion VM...");

    screenText.textContent =
        "⚙️ Loading virtual machine...";

    screenText.style.display = "block";

    status.textContent =
        "🧠 Starting v86...";

    try {

        emulator = new V86({

            // WebAssembly CPU engine
            wasm_path:
                "vendor/v86/v86.wasm",

            // Virtual RAM
            memory_size:
                32 * 1024 * 1024,

            // Virtual graphics memory
            vga_memory_size:
                2 * 1024 * 1024,

            // Virtual display
            screen_container:
                screenContainer,

            // BIOS
            bios: {
                url:
                    "vendor/v86/bios/seabios.bin"
            },

            // VGA BIOS
            vga_bios: {
                url:
                    "vendor/v86/bios/vgabios.bin"
            },

            // First test operating system
            cdrom: {
                url:
                    "vendor/v86/images/linux.iso"
            },

            // Start automatically
            autostart: true
        });

        console.log("✅ V86 object created!");

        status.textContent =
            "🟢 Virtual machine started!";

        screenText.textContent =
            "🐧 Booting Linux...";

        // Tell us when the emulator is ready
        emulator.add_listener(
            "emulator-ready",
            function () {

                console.log(
                    "🟢 WebFusion emulator is ready!"
                );

                status.textContent =
                    "🟢 VM running";
            }
        );

    } catch (error) {

        console.error(
            "❌ WebFusion emulator error:",
            error
        );

        emulator = null;

        screenText.style.display = "block";

        screenText.textContent =
            "❌ Emulator failed.";

        status.textContent =
            "Error: " + error.message;
    }
}


// Android button
function startAndroid() {

    console.log(
        "🤖 Android button clicked"
    );

    startEmulator();
}


// Windows button
function startWindows() {

    console.log(
        "🪟 Windows button clicked"
    );

    startEmulator();
}
