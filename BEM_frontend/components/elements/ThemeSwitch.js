'use client'
// ThemeSwitch.js
import { useEffect } from "react";

export default function ThemeSwitch() {
    useEffect(() => {
        // Check localStorage for the saved theme or default to dark
        const savedTheme = localStorage.getItem("theme") || "is_dark";
        document.body.classList.remove("is_light", "is_dark");
        document.body.classList.add(savedTheme);
        updateImageSource(savedTheme);

        // Save the theme to localStorage if not already set
        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", "is_dark");
        }
    }, []);

    const updateImageSource = (currentTheme) => {
        const logoHeader = document.getElementById("logo_header");
        const imgMode = document.getElementById("img-mode");
        const workImages = document.querySelectorAll(".work-image");

        if (logoHeader) {
            logoHeader.src = "/assets/images/logo/logo_dark.png";
        }

        if (imgMode) {
            imgMode.src = "/assets/images/icon/sun.png";
        }

        workImages.forEach(image => {
            const imageId = image.id.split("-")[1];
            image.src = `/assets/images/svg/work-${imageId}.svg`;
        });
    };

    // No toggle needed since we're always in dark mode
    // return (
    //     <a className="mode-switch">
    //         <img id="img-mode" src="/assets/images/icon/sun.png" alt="Dark Mode" />
    //     </a>
    // );
}
