const scrollMeasureOnPx = 1000;
const backToTopBtn = document.querySelector(".btn-back-to-top");

document.addEventListener("scroll", () => {
    if(scrollContainer().scrollTop >= scrollMeasureOnPx){
        backToTopBtn.setAttribute("data-visible", true);
    } else if(scrollContainer().scrollTop < scrollMeasureOnPx){
        backToTopBtn.removeAttribute("data-visible", true);
    }
});

backToTopBtn.addEventListener("click", goToTop);

function goToTop(){
    document.body.scrollIntoView();
}

function scrollContainer(){
    return document.documentElement || document.body;
}
