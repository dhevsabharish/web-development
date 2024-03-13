const inputs = document.querySelectorAll("input");

const patterns = {
  mobile: /^\d{10}$/,
  username: /^[\da-z]{5,12}$/i,
  password: /^[\w@-]{8,12}$/,
  slug: /^[a-z\d-]{8,20}$/,
  email: /^([a-z\d-\.]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
};

function validate(field, regex) {
  if(regex.test(field.value)) {
    field.className = 'valid';
  } else {
    field.className = 'invalid';
  }
}

inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    validate(e.target, patterns[e.target.attributes.name.value]); //must be same as the name of the name attribute
  });
});

