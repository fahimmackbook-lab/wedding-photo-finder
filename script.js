/* =========================================
   WEDDING PHOTO FINDER
   VANILLA JAVASCRIPT
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}


/* Close mobile navigation after clicking a link */

const navigationLinks = document.querySelectorAll(
    ".nav-links a"
);

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });

});


/* =========================================
   GUEST SELFIE UPLOAD
========================================= */

const guestUploadButton =
    document.getElementById("guestUploadButton");

const guestUploadInput =
    document.getElementById("guestUploadInput");


if (guestUploadButton && guestUploadInput) {

    guestUploadButton.addEventListener("click", () => {
        guestUploadInput.click();
    });

    guestUploadInput.addEventListener("change", (event) => {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        alert(
            "Selfie selected successfully! " +
            "In the future, this photo will be used for face matching."
        );

        window.location.hash = "selfie";

    });

}


/* =========================================
   SELFIE PAGE
========================================= */

const takeSelfieButton =
    document.getElementById("takeSelfieButton");

const selfieUploadButton =
    document.getElementById("selfieUploadButton");

const selfieUploadInput =
    document.getElementById("selfieUploadInput");

const continueButton =
    document.getElementById("continueButton");

const selfiePreview =
    document.getElementById("selfiePreview");

const cameraPreview =
    document.getElementById("cameraPreview");

const cameraPlaceholder =
    document.getElementById("cameraPlaceholder");


/* =========================================
   CAMERA
========================================= */

let cameraStream = null;


async function startCamera() {

    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {

        alert(
            "Camera access is not available in this browser context. " +
            "Please use Upload Photo for this prototype."
        );

        return;
    }

    try {

        cameraStream =
            await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "user"
                },
                audio: false
            });

        cameraPreview.srcObject = cameraStream;

        cameraPreview.style.display = "block";

        cameraPlaceholder.style.display = "none";

    } catch (error) {

        console.log("Camera access unavailable:", error);

        alert(
            "Camera permission was not available. " +
            "You can upload a selfie instead."
        );

    }

}


/* =========================================
   TAKE SELFIE
========================================= */

if (takeSelfieButton) {

    takeSelfieButton.addEventListener(
        "click",
        startCamera
    );

}


/* =========================================
   SELFIE UPLOAD
========================================= */

if (selfieUploadButton && selfieUploadInput) {

    selfieUploadButton.addEventListener("click", () => {

        selfieUploadInput.click();

    });


    selfieUploadInput.addEventListener(
        "change",
        (event) => {

            const file = event.target.files[0];

            if (!file) {
                return;
            }

            displaySelfiePreview(file);

        }
    );

}


/* =========================================
   DISPLAY SELFIE PREVIEW
========================================= */

function displaySelfiePreview(file) {

    const imageURL =
        URL.createObjectURL(file);

    selfiePreview.innerHTML = `
        <div class="preview-message">
            <p>
                Your selfie is ready.
            </p>
        </div>

        <img
            src="${imageURL}"
            alt="Selected selfie"
        >
    `;

}


/* =========================================
   CONTINUE TO GALLERY
========================================= */

if (continueButton) {

    continueButton.addEventListener(
        "click",
        () => {

            /*
                Face recognition is intentionally NOT
                implemented in this prototype.

                We simply simulate the matching process.
            */

            alert(
                "Prototype mode: face recognition is not implemented yet. " +
                "Opening sample wedding photos."
            );

            window.location.hash = "gallery";

        }
    );

}


/* =========================================
   PHOTO MODAL
========================================= */

const modal =
    document.getElementById("photoModal");

const modalImage =
    document.getElementById("modalImage");

const modalClose =
    document.getElementById("modalClose");

const modalBackdrop =
    document.querySelector(".modal-backdrop");

const viewButtons =
    document.querySelectorAll(".view-photo");


viewButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const card =
            button.closest(".photo-card");

        const image =
            card.querySelector("img");

        modalImage.src = image.src;

        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

    });

});


function closeModal() {

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    modalImage.src = "";

}


if (modalClose) {
    modalClose.addEventListener(
        "click",
        closeModal
    );
}


if (modalBackdrop) {
    modalBackdrop.addEventListener(
        "click",
        closeModal
    );
}


/* Escape key closes modal */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {
            closeModal();
        }

    }
);


/* =========================================
   DOWNLOAD BUTTON
========================================= */

const downloadButtons =
    document.querySelectorAll(".download-photo");


downloadButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const card =
            button.closest(".photo-card");

        const image =
            card.querySelector("img");

        const link =
            document.createElement("a");

        link.href = image.src;

        link.download =
            "wedding-photo.jpg";

        /*
            Some browsers may open the remote image
            instead of downloading it because the image
            is hosted on another domain.

            Real downloads will be implemented later
            when our own photo storage is connected.
        */

        link.target = "_blank";

        link.click();

    });

});


/* =========================================
   PHOTOGRAPHER BUTTONS
========================================= */

const uploadPhotosButton =
    document.getElementById("uploadPhotosButton");

const manageWeddingButton =
    document.getElementById("manageWeddingButton");


if (uploadPhotosButton) {

    uploadPhotosButton.addEventListener(
        "click",
        () => {

            alert(
                "Photo upload will be implemented in the backend version."
            );

        }
    );

}


if (manageWeddingButton) {

    manageWeddingButton.addEventListener(
        "click",
        () => {

            window.location.hash = "dashboard";

        }
    );

}


/* =========================================
   QR CODE
========================================= */

const copyGuestLink =
    document.getElementById("copyGuestLink");


if (copyGuestLink) {

    copyGuestLink.addEventListener(
        "click",
        async () => {

            const guestLink =
                window.location.href.split("#")[0]
                + "#guest";

            try {

                await navigator.clipboard.writeText(
                    guestLink
                );

                alert(
                    "Guest link copied successfully!"
                );

            } catch (error) {

                alert(
                    "Guest link: " + guestLink
                );

            }

        }
    );

}


/* =========================================
   DASHBOARD BUTTONS
========================================= */

const dashboardButtons =
    document.querySelectorAll(
        ".dashboard-card .btn"
    );


dashboardButtons.forEach((button) => {

    const buttonText =
        button.textContent.trim();

    if (
        buttonText === "Select Photos" ||
        buttonText === "Settings"
    ) {

        button.addEventListener(
            "click",
            () => {

                alert(
                    buttonText +
                    " will be implemented later."
                );

            }
        );

    }

});


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        console.log(
            "Wedding Photo Finder loaded successfully."
        );

        console.log(
            "Frontend prototype only — no backend or face recognition."
        );

    }
);