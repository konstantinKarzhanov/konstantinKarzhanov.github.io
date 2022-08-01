const btn_main = document.querySelectorAll(".main-btn");

const modals = document.querySelector(".modals");
const callRequestForm = modals.querySelector(".modals__call-request");
const orderForm = modals.querySelector(".modals__order");

btn_main.forEach((item) => {
    item.addEventListener("click", () => {
        item.style.transform = "scale(1.03)";
        setTimeout(() => item.style.transform = null, 150);
        
        if(item.classList.contains("call-request-btn")){
            callRequestForm.showModal();

            closeModal(callRequestForm);

        } else if(item.classList.contains("buy-btn")){
            orderForm.showModal();

            closeModal(orderForm);
        } 
    })
})

function closeModal(formName){
    const closeButton = formName.querySelector(".btn-close-modal");

    closeButton.addEventListener("click", () => {
        formName.close();
    })
}