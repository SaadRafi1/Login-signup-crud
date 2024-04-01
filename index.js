var form = document.getElementById("myForm"),
  userName = document.getElementById("name"),
  age = document.getElementById("age"),
  city = document.getElementById("city"),
  email = document.getElementById("email"),
  phone = document.getElementById("phone"),
  post = document.getElementById("post"),
  submitBtn = document.querySelector(".submit"),
  userInfo = document.getElementById("data");
(modal = document.getElementById("userForm")),
  (modalTitlte = document.querySelector("#userForm .modal-title"));

let getData = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : [];
let isEdit = false,
  editId;

showInfo();

function showInfo() {
  document
    .querySelectorAll(".employeeDetails")
    .forEach((info) => info.remove());
  getData.forEach((element, index) => {
    let createElement = `<tr class="employeeDetails">
        <td>${index + 1}</td>
        <td>${element.employeeName}</td>
        <td>${element.employeeAge}</td>
        <td>${element.employeeCity}</td>
        <td>${element.employeeEmail}</td>
        <td>${element.employeePhone}</td>
        <td>${element.employeePost}</td>
        <td>
        <button
          class="btn btn-success" onclick="readInfo('${
            element.employeeName
          }','${element.employeeAge}','${element.employeeCity}','${
      element.employeeEmail
    }','${element.employeePhone}','${element.employeePost}')"
          data-bs-toggle="modal"
          data-bs-target="#readData"
        >
          <i class="bi bi-eye"></i>
        </button>
        <button class="btn btn-primary" onclick="editInfo(${index},'${
      element.employeeName
    }',
        '${element.employeeAge}','${element.employeeCity}',
        '${element.employeeEmail}','${element.employeePhone}','${
      element.employeePost
    }')" 
         data-bs-toggle="modal"
        data-bs-target="#userForm">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button class="btn btn-danger" onclick="deleteInfo(${index})">
          <i class="bi bi-trash"></i>
        </button>
      </td>
        </tr>`;
    userInfo.innerHTML += createElement;
  });
}

function readInfo(name, age, city, email, phone, post) {
  (document.querySelector("#showName").value = name),
    (document.querySelector("#showAge").value = age),
    (document.querySelector("#showCity").value = city),
    (document.querySelector("#showEmail").value = email),
    (document.querySelector("#showPhone").value = phone),
    (document.querySelector("#showPost").value = post);
}

function editInfo(index, name, Age, City, Email, Phone, Post) {
  isEdit = true;
  editId = index;
  userName.value = name;
  age.value = Age;
  city.value = City;
  (email.value = Email), (phone.value = Phone), (post.value = Post);

  submitBtn.innerText = "Update";
  modalTitle.innerText = "Update Form";
}

function deleteInfo(index) {
  if (confirm("Are you sure you want to delete this data?")) {
    getData.splice(index, 1);
    localStorage.setItem("userProfile", JSON.stringify(getData));
    showInfo();
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const information = {
    employeeName: userName.value,
    employeeAge: age.value,
    employeeCity: city.value,
    employeeEmail: email.value,
    employeePhone: phone.value,
    employeePost: post.value,
  };
  if (!isEdit) {
    getData.push(information);
  } else {
    isEdit = false;
    getData[editId] = information;
  }
  localStorage.setItem("userProfile", JSON.stringify(getData));
  submitBtn.innerText = "Submit";
  modalTitlte.innerHTML = "Fill the Form";

  showInfo();
  form.reset();
});
