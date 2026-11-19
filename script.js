//select the HTML elements that we need
const orderForm =document.getElementById("orderForm")
const customerName =document.getElementById("customerName")
const food =document.getElementById("food")
const orderBtn = document.getElementById("orderBtn")
const welcomeMessage =document.getElementById("welcomeMessage")
const orderDetails =document.getElementById("orderDetails")
const displayName =document.getElementById("displayName")
const displayFood =document.getElementById("displayFood")
const statusMessage =document.getElementById("statusMessage")
const newOrderBtn =document.getElementById("newOrderBtn")

//a function to update the steps
function updateSteps(stepNumber, message) {
    //loop through 5 steps
    for (let i = 1; i <= 5; i++) {
        const step = document.getElementById(`step${i}`)
        step.classList.remove("active", "completed")
    }

    //mark the previous steps as completed
    for (let i = 1; i < stepNumber; i++) {
        const step = document.getElementById(`step${i}`)
        step.classList.add("completed")
    }
//heighlight the current step
    document
    .getElementById(`step${stepNumber}`)
    .classList.add("active")
    statusMessage.textContent = message
}

//Order processing function
function processPayment(callback) {
    updateSteps(2, "processing your payment...")
    setTimeout(() =>{
        console.log("Payment sucessfull!!")
        callback()
    }, 3000)
}

function prepareFood(callback) {
    updateSteps(3, "Our chef is preparing your food")
    setTimeout(() => {
        console.log("Your food is ready")
        callback()
    }, 3000)
}

function readyForDelivery(callback) {
    updateSteps(4, "Your order is ready for delivery")
    setTimeout(() => {
        console.log("Your order is out for delivery")
        callback()
    }, 3000)
}

function deliveryOrder(callback) {
    updateSteps(5, "Your order is out for delivery")
    setTimeout(() => {
        console.log("Your order has been delivered")
        callback()
    }, 3000)
}

//Callback hell

function placeOrder() {
    updateSteps(1, "your prder has been received")
    processPayment(()=> {
        prepareFood(()=> {
            readyForDelivery(()=>{
                deliveryOrder(()=>{
                    statusMessage.textContent = "Your Order has been delivered enoy your meal"
                    newOrderBtn.hidden = false
                    orderBtn.disabled = false

                    console.log("Order process complited!!")
                })
            })
        })
    })
}

orderForm.addEventListener("submit", function(event) { 
    event.preventDefault()
    const name = customerName.value.trim()
    const selectFood = food.value

    //check if user input is empty
    if(!name || !selectFood) {
        return
    }
    displayName.textContent = name
    displayFood.textContent = selectFood

    welcomeMessage.textContent = `Thank you ${name}! Your order is being processed`;
    orderBtn.disabled = true
    newOrderBtn.hidden = true
    placeOrder()

})

newOrderBtn.addEventListener("click", function() {
//reset the form
orderForm.reset()
//reset the progress steps
for(let i=1; i<=5; i++) {
    document.getElementById(`step${i}`).classList.remove("active", "completed")
}
//reset displayed information
displayName.textContent = "-"
displayFood.textContent = "-"
welcomeMessage.textContent = "Your order updates will appear here"
statusMessage.textContent = "No active order"
newOrderBtn.hidden = true

})

