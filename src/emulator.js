"use strict";

let emulator = null;

function log(message) {
    const status = document.getElementById("status");
    const screenText = document.getElementById("screenText");

    console.log("[WebFusion]", message);

    if (status) {
        status.textContent = message;
    }

    if (screenText) {
        screenText.textContent = message;
    }
}

function startEmulator() {

    const screen =
        document.getElementById("screen_container");

    const screenText =
        document.getElementById("screenText");

    if (emulator) {
        log("🟢 VM is already running");
        return;
    }

    log("1/5 🔍 Checking v86...");

    if (typeof V86 === "undefined") {

        log("❌ V86 is NOT loaded!");

        console.error(
            "V86 library is missing."
        );

        return;
    }

    log("2/5 ✅ V86 loaded!");

    log("3/5 🧠 Creating virtual machine...");

    try {

        emulator = new V86({

            wasm_path:
                "vendor/v86/v86.wasm",

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

            cdrom: {
                url:
                    "vendor/v86/images/linux.iso"
            },

            autostart: true
        });

        log("4/5 🚀 VM created!");

        emulator.add_listener(
            "emulator-ready",
            function () {

                console.log(
                    "[WebFusion] Emulator ready!"
                );

                log(
                    "5/5 🟢 VM READY — booting OS..."
                );
            }
        );

        emulator.add_listener(
            "emulator-started",
            function () {

                console.log(
                    "[WebFusion] Emulator started!"
                );

                log(
                    "🟢 CPU STARTED — booting..."
                );
            }
        );

        emulator.add_listener(
            "emulator-stopped",
            function () {

                console.log(
                    "[WebFusion] Emulator stopped."
                );

                log(
                    "🟡 VM stopped."
                );
            }
        );

    } catch (error) {

        console.error(
            "[WebFusion] VM ERROR:",
            error
        );

        emulator = null;

        log(
            "❌ VM ERROR: " +
            error.message
        );
    }
}


function startAndroid() {

    console.log(
        "[WebFusion] Android clicked"
    );

    startEmulator();
}


function startWindows() {

    console.log(
        "[WebFusion] Windows clicked"
    );

    startEmulator();
}
