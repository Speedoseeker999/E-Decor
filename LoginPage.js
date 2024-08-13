document.addEventListener("DOMContentLoaded", function() {
    const hoverLink = document.getElementById("hover-link");
    const hoverPrompt = document.getElementById("hover-prompt");

    hoverLink.addEventListener("mouseover", function() {
        hoverPrompt.style.opacity = "1";
        hoverPrompt.style.visibility = "visible";
        hoverPrompt.style.transform = "translateX(-50%) translateY(-10px)";
    });

    hoverLink.addEventListener("mouseout", function() {
        hoverPrompt.style.opacity = "0";
        hoverPrompt.style.visibility = "hidden";
        hoverPrompt.style.transform = "translateX(-50%) translateY(0)";
    });
});