class UserInfo {
  constructor() {
    this.form = document.getElementById("myForm");
    this.userName = document.getElementById("name");
    this.age = document.getElementById("age");
    this.city = document.getElementById("city");
    this.email = document.getElementById("email");
    this.phone = document.getElementById("phone");
    this.post = document.getElementById("post");
    this.submitBtn = document.querySelector(".submit");
    this.userInfo = document.getElementById("data");
    this.modal = document.getElementById("userForm");
    this.modalTitle = document.querySelector("#userForm .modal-title");

    this.getData = localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile"))
      : [];
    this.isEdit = false;
    this.editId = null;

    this.showInfo();
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }
/* This function is creating table dynamically and behaviour of 3 buttons are defined edit 
update and delete the buttons are responsible for getting their behaviours from read info
edit info and handle submit */
  showInfo() {
    this.userInfo.innerHTML = "";
    this.getData.forEach((element, index) => {
      const createElement = `<tr class="employeeDetails">
        <td>${index + 1}</td>
        <td>${element.employeeName}</td>
        <td>${element.employeeAge}</td>
        <td>${element.employeeCity}</td>
        <td>${element.employeeEmail}</td>
        <td>${element.employeePhone}</td>
        <td>${element.employeePost}</td>
        <td>
          <button class="btn btn-success" onclick="userInfo.readInfo('${
            element.employeeName
          }', '${element.employeeAge}', '${element.employeeCity}', '${
        element.employeeEmail
      }', '${element.employeePhone}', '${
        element.employeePost
      }')" data-bs-toggle="modal" data-bs-target="#readData">
            <i class="bi bi-eye"></i>
          </button>
          <button class="btn btn-primary" onclick="userInfo.editInfo(${index}, '${
        element.employeeName
      }', '${element.employeeAge}', '${element.employeeCity}', '${
        element.employeeEmail
      }', '${element.employeePhone}', '${
        element.employeePost
      }')" data-bs-toggle="modal" data-bs-target="#userForm">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn btn-danger" onclick="userInfo.deleteInfo(${index})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>`;
      this.userInfo.innerHTML += createElement;
    });
  }
/* Read info function is responsible for showing data when clicked on eye icon 
it is taking values and show casing data in the show info function where basically the button is defiing 
it's behviour*/
  readInfo(name, age, city, email, phone, post) {
    document.querySelector("#showName").value = name;
    document.querySelector("#showAge").value = age;
    document.querySelector("#showCity").value = city;
    document.querySelector("#showEmail").value = email;
    document.querySelector("#showPhone").value = phone;
    document.querySelector("#showPost").value = post;
  }
/* This function is responsible for making any edits made to the form if a particular row needs its 
information to be updated firstly it checks if it is in edit state then by taking values and it moves to 
show info function where the button is definng its behaviour */
  editInfo(index, name, Age, City, Email, Phone, Post) {
    this.isEdit = true;
    this.editId = index;
    this.userName.value = name;
    this.age.value = Age;
    this.city.value = City;
    this.email.value = Email;
    this.phone.value = Phone;
    this.post.value = Post;

    this.submitBtn.innerText = "Update";
    this.modalTitle.innerText = "Update Form";
  }

  deleteInfo(index) {
    if (confirm("Are you sure you want to delete this data?")) {
      this.getData.splice(index, 1);
      localStorage.setItem("userProfile", JSON.stringify(this.getData));
      this.showInfo();
    }
  }

  /*  This function is actually storing data into local storage with the check condition of 
   if the form is in edit mode or not further more the table is being created dynamically 
   where the show info function comes is the data from this handle submit button is stored in local 
   storage then show info function takes that data and creates a row dynamically*/
  handleSubmit(e) {
    e.preventDefault();
    const information = {
      employeeName: this.userName.value,
      employeeAge: this.age.value,
      employeeCity: this.city.value,
      employeeEmail: this.email.value,
      employeePhone: this.phone.value,
      employeePost: this.post.value,
    };
    if (!this.isEdit) {
      this.getData.push(information);
    } else {
      this.isEdit = false;
      this.getData[this.editId] = information;
    }
    localStorage.setItem("userProfile", JSON.stringify(this.getData));
    this.submitBtn.innerText = "Submit";
    this.modalTitle.innerHTML = "Fill the Form";

    this.showInfo();
    this.form.reset();
  }
}

const userInfo = new UserInfo();
