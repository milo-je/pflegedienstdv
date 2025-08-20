function handleClickEvent(e) {
    var element = document.getElementById(e);

    element.scrollIntoView({behavior: "smooth"});
}

function emailValidate() {
    const email = document.getElementById('email');

    if(email.value !== "") {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
            return true;
        } else {
            return false;
        }
    }
}

const form = document.getElementById('submit-form');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const successImg = document.getElementById('successLogo');
const errorImg = document.getElementById('errorLogo');

const btn = document.getElementById('form-btn');

btn.innerHTML = 'Nachricht senden';

span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

async function handleSubmit(event) {
    event.preventDefault();
    btn.innerHTML = '<i id="icon-loading" class="fa fa-spinner fa-spin"></i>'
    btn.disabled = true;
    const status = document.getElementById('my-form-status');
    const data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept' : 'application/json'
        }
    }).then(response => {
        if(response.ok) {
            modal.style.display = "block";
            successImg.style.display = "inline-block"
            status.innerHTML = "Vielen Dank für Ihre Einsendung!";
            form.reset()
            btn.innerHTML = 'Nachricht senden';
            btn.disabled = false;
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    modal.style.display = "block";
                    errorImg.style.display = "inline-block"
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    btn.innerHTML = 'Nachricht senden';
                    btn.disabled = false;
                } else {
                    modal.style.display = "block";
                    errorImg.style.display = "inline-block"
                    status.innerHTML = "Oops! Beim Absenden Ihres Formulars ist ein Problem aufgetreten.";
                    btn.innerHTML = 'Nachricht senden';
                    btn.disabled = false;
                }
            })
        }
    }).catch(error => {
      status.innerHTML = "Oops! Beim Absenden Ihres Formulars ist ein Problem aufgetreten."
    });
}
form.addEventListener("submit", handleSubmit)
