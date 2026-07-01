let editIndex = -1;
let students = JSON.parse(localStorage.getItem("students")) || [];
displayStudents();

function addStudent() {

    let studentId = document.getElementById("studentId").value.trim();
    let studentName = document.getElementById("studentName").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobileNumber = document.getElementById("mobileNumber").value.trim();
    let gender = document.getElementById("gender").value;
    let dob = document.getElementById("dob").value;
    let course = document.getElementById("course").value;
    let address = document.getElementById("address").value.trim();

    document.getElementById("studentIdError").innerHTML = "";
    document.getElementById("studentNameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("mobileNumberError").innerHTML = "";
    document.getElementById("genderError").innerHTML = "";
    document.getElementById("dobError").innerHTML = "";
    document.getElementById("courseError").innerHTML = "";
    document.getElementById("addressError").innerHTML = "";

    let valid = true;

    let idPattern = /^STU\d{3}$/;

    if (studentId == "") {
        document.getElementById("studentIdError").innerHTML = "Student ID is required";
        valid = false;
    }
    else if (!idPattern.test(studentId)) {
        document.getElementById("studentIdError").innerHTML = "Format should be STU001";
        valid = false;
    }
    else if (
        students.some((student, index) =>
            student.id == studentId && index != editIndex
        )
    ) {
        document.getElementById("studentIdError").innerHTML = "Student ID already exists";
        valid = false;
    }
    let namePattern = /^[A-Za-z ]+$/;

    if (studentName == "") {
        document.getElementById("studentNameError").innerHTML = "Student Name is required";
        valid = false;
    }
    else if (studentName.length < 3) {
        document.getElementById("studentNameError").innerHTML = "Minimum 3 characters";
        valid = false;
    }
    else if (!namePattern.test(studentName)) {
        document.getElementById("studentNameError").innerHTML = "Alphabets only";
        valid = false;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email == "") {
        document.getElementById("emailError").innerHTML = "Email is required";
        valid = false;
    }
    else if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerHTML = "Enter valid email";
        valid = false;
    }


    let mobileNumberPattern = /^[0-9]{10}$/;

    if (mobileNumber == "") {
        document.getElementById("mobileNumberError").innerHTML = "Mobile number is required";
        valid = false;
    }
    else if (!mobileNumberPattern.test(mobileNumber)) {
        document.getElementById("mobileNumberError").innerHTML = "Enter 10 digit mobile number";
        valid = false;
    }


    if (gender == "") {
        document.getElementById("genderError").innerHTML = "Select gender";
        valid = false;
    }


    if (dob == "") {
        document.getElementById("dobError").innerHTML = "Date of Birth is required";
        valid = false;
    }
    else {
        let birthDate = new Date(dob);
        let today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        let month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            document.getElementById("dobError").innerHTML = "Age must be above 18";
            valid = false;
        }
    }

    if (course == "") {
        document.getElementById("courseError").innerHTML = "Select course";
        valid = false;
    }


    if (address == "") {
        document.getElementById("addressError").innerHTML = "Address is required";
        valid = false;
    }
    else if (address.length < 10) {
        document.getElementById("addressError").innerHTML = "Minimum 10 characters";
        valid = false;
    }

    if (!valid) {
        return;
    }

    let student = {
        id: studentId,
        name: studentName,
        email: email,
        mobile: mobileNumber,
        gender: gender,
        dob: dob,
        course: course,
        address: address
    };

    if (editIndex == -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
    }
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();

    alert("Student Added Successfully");

    document.getElementById("studentForm").reset();
}
function displayStudents() {

    let tableBody = document.getElementById("studentTableBody");

    tableBody.innerHTML = "";

    for (let i = 0; i < students.length; i++) {

        tableBody.innerHTML += `
            <tr>
                <td>${students[i].id}</td>
                <td>${students[i].name}</td>
                <td>${students[i].email}</td>
                <td>${students[i].course}</td>
                <td>${students[i].mobile}</td>
                <td>
                  <button class="btn btn-warning btn-sm"
                   onclick="editStudent(${i})">
                   Edit
                  </button>

                  <button class="btn btn-danger btn-sm"
                   onclick="deleteStudent(${i})">
                   Delete
                  </button>
                </td>
            </tr>
        `;
    }
}
function searchStudent() {

    let search = document.getElementById("search").value.toLowerCase();

    let tableBody = document.getElementById("studentTableBody");

    tableBody.innerHTML = "";

    for (let i = 0; i < students.length; i++) {

        if (
            students[i].id.toLowerCase().includes(search) ||
            students[i].name.toLowerCase().includes(search) ||
            students[i].email.toLowerCase().includes(search)
        ) {

            tableBody.innerHTML += `
                <tr>
                    <td>${students[i].id}</td>
                    <td>${students[i].name}</td>
                    <td>${students[i].email}</td>
                    <td>${students[i].course}</td>
                    <td>${students[i].mobile}</td>
                    <td>
                        <button class="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            `;
        }

    }

}
function editStudent(index) {

    editIndex = index;

    document.getElementById("studentId").value = students[index].id;
    document.getElementById("studentName").value = students[index].name;
    document.getElementById("email").value = students[index].email;
    document.getElementById("mobileNumber").value = students[index].mobile;
    document.getElementById("gender").value = students[index].gender;
    document.getElementById("dob").value = students[index].dob;
    document.getElementById("course").value = students[index].course;
    document.getElementById("address").value = students[index].address;
}
function deleteStudent(index) {

    let confirmDelete = confirm("Are you sure you want to delete this student?");

    if (confirmDelete) {

        students.splice(index, 1);

        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();

        alert("Student Deleted Successfully");
    }

}
function logout() {
    window.location.href = "index.html";
}
let admin = {
    name: "Rudresh Gowda",
    email: "rudresh@gmail.com",
    profile: "images/profile.png"
};

localStorage.setItem("admin", JSON.stringify(admin));