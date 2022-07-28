const btn_main = document.querySelectorAll(".main-btn");

btn_main.forEach((item) => {
    item.addEventListener("click", () => {
        item.style.transform = "scale(1.03)";
        setTimeout(() => item.style.transform = null, 150);
    })
})