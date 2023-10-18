// console.log('TEST')
import Customer from "../models/Person/Customer.js";
import Employee from "../models/Person/Employee.js";
import Person from "../models/Person/Person.js";
import Student from "../models/Person/Student.js";
const getElement = (selector) => document.querySelector(selector);
let listPerson;

// Lấy danh sách đối tượng từ API
const getPersonList = () => {
  const promise = axios({
    method: "GET",
    url: "https://65113dfe829fa0248e3fb9c1.mockapi.io/QLHV",
  });

  promise
    // get data thành công
    .then((result) => {
      // console.log(result.data);
      listPerson = result.data;
      renderTable(result.data);
    })
    // get data thất bại
    .catch((err) => {
      console.log(err);
    })
    // Luôn luôn chạy dù thành công, thất bại
    .finally(() => {
      console.log("finally");
    });
};
getPersonList();

// show data get từ API ra UI
const renderTable = (personList) => {
  let htmlContent = "";
  personList.forEach((person) => {
    htmlContent += `
            <tr class="Filter ${person.loaiDT}">
                <td>${person.maDT}</td>
                <td class="hoten">${person.hoTen}</td>
                <td>${person.diaChi}</td>
                <td>${person.email}</td>
                <td>${person.loaiDT}</td>
                <td>
                    <button 
                        class='btn btn-success' 
                        data-toggle="modal" 
                        data-target="#exampleModal" 
                        id='btnEdit'
                        onclick="editPerson(${person.id})"
                    >
                        Edit
                    </button>
                    <button 
                        class='btn btn-danger ml-3' 
                        onclick="deletePerson(${person.id})"
                    >
                        Delete
                    </button>
                    <button data-toggle="modal" data-target="#exampleModal" onclick="showDetail(${person.id})" class="btn btn-info">Detail</button>
                </td>
            </tr>
        `;
  });

  getElement("#tbodyPerson").innerHTML = htmlContent;
};

const resetForm = () => {
  getElement("#maDT").value = "";
  getElement("#maDT").disabled = false;
  getElement("#hoTen").value = "";
  getElement("#diaChi").value = "";
  getElement("#email").value = "";
  getElement("#occupation").value = "all";
  getElement("#occupation").disabled = false;
  getElement("#diemToan").value = "";
  getElement("#diemLy").value = "";
  getElement("#diemHoa").value = "";
  getElement("#soNgayLamViec").value = "";
  getElement("#luongMotNgay").value = "";
  getElement("#tenCongTy").value = "";
  getElement("#triGiaHoaDon").value = "";
  getElement("#danhGia").value = "";
};

const layThongTinDoiTuong = () => {
  const elements = document.querySelectorAll(
    "#personForm input, #personForm select, #personForm select option, #personForm textarea"
  );
  let person = {};

  elements.forEach((ele, index) => {
    //destructuring
    const { value, name } = ele;
    person[name] = value;
  });

  // destructuring person
  const {
    maDT,
    hoTen,
    diaChi,
    email,
    loaiDT,
    diemToan,
    diemLy,
    diemHoa,
    soNgayLamViec,
    luongMotNgay,
    tenCongTy,
    triGiaHoaDon,
    danhGia,
  } = person;
  const selectElement = getElement("#occupation");
  if (selectElement.value === "Student") {
    return new Student(
      maDT,
      hoTen,
      diaChi,
      email,
      loaiDT,
      diemToan,
      diemLy,
      diemHoa
    );
  } else if (selectElement.value === "Employee") {
    return new Employee(
      maDT,
      hoTen,
      diaChi,
      email,
      loaiDT,
      soNgayLamViec,
      luongMotNgay
    );
  } else if (selectElement.value === "Customer") {
    return new Customer(
      maDT,
      hoTen,
      diaChi,
      email,
      loaiDT,
      tenCongTy,
      triGiaHoaDon,
      danhGia
    );
  } else {
    return new Person(maDT, hoTen, diaChi, email, loaiDT);
  }
};

// ẩn btn cập nhật
getElement("#btnThem").onclick = () => {
  // ẩn btn cập nhật
  getElement("#btnCapNhat").hidden = true;
  resetForm();
  //reset validation
  let nodeList = document.querySelectorAll(".invalid-feedback");
  nodeList.forEach((param) => {
    param.style.display = "none";
  });
  //reset select
  getElement("#studentDetails").hidden = true;
  getElement("#employeeDetails").hidden = true;
  getElement("#customerDetails").hidden = true;
  // Ẩn phương thức của đối tượng
  getElement("#txtLuongThang").hidden = true;
  getElement("#txtDiemTB").hidden = true;
  // hiển thị lại btn thêm đối tượng
  getElement("#btnThemDoiTuong").hidden = false;
};

getElement("#btnThemDoiTuong").onclick = () => {
  // Lấy thông tin đối tượng từ user nhập trên form
  const person = layThongTinDoiTuong();
  
  //Kiểm tra mã đối tượng
  let valid =
    kiemTraRong(
      person.maDT,
      "#invalidID",
      "Mã Đối Tượng Không Được Để Trống!"
    ) &&
    kiemTraTrung(
      person.maDT,
      listPerson,
      "#invalidID",
      "Mã Đối Tượng Đã Tồn Tại"
    );
  // Kiểm Tra Họ Tên
  valid &= kiemTraRong(
    person.hoTen,
    "#invalidTen",
    "Họ Tên Đối Tượng Không Được Để Trống!"
  );
  // Kiểm Tra Địa Chỉ
  valid &= kiemTraRong(
    person.diaChi,
    "#invalidDiaChi",
    "Địa Chỉ Đối Tượng Không Được Để Trống!"
  );
  //Kiểm Tra Email
  valid &=
    kiemTraRong(
      person.email,
      "#invalidEmail",
      "Email Đối Tượng Không Được Để Trống!"
    ) && kiemTraEmail(person.email, "#invalidEmail", "Sai Định Dạng Email!");
  // Kiểm tra Lớp Đối Tượng
  valid &= kiemTraDoiTuong(
    person.loaiDT,
    "#invalidLoaiDT",
    "Chọn Một Đối Tượng!"
  );
  if (person.loaiDT === "Student") {
    valid &=
      kiemTraRong(
        person.diemToan,
        "#invalidDiemToan",
        "Điểm Không Được Để Trống!"
      ) && checkNumber(person.diemToan, "#invalidDiemToan", "Chỉ Nhập Số!");
    valid &=
      kiemTraRong(
        person.diemLy,
        "#invalidDiemLy",
        "Điểm Không Được Để Trống!"
      ) && checkNumber(person.diemLy, "#invalidDiemLy", "Chỉ Nhập Số!");
    valid &=
      kiemTraRong(
        person.diemHoa,
        "#invalidDiemHoa",
        "Điểm Không Được Để Trống!"
      ) && checkNumber(person.diemHoa, "#invalidDiemHoa", "Chỉ Nhập Số!");
  } else if (person.loaiDT === "Employee") {
    valid &=
      kiemTraRong(
        person.soNgayLamViec,
        "#invalidGiaSoNgayLamViec",
        "Không Được Để Trống!"
      ) &&
      checkNumber(
        person.soNgayLamViec,
        "#invalidGiaSoNgayLamViec",
        "Chỉ Nhập Số!"
      );
    valid &=
      kiemTraRong(
        person.luongMotNgay,
        "#invalidLuongMotNgay",
        "Không Được Để Trống!"
      ) &&
      checkNumber(person.luongMotNgay, "#invalidLuongMotNgay", "Chỉ Nhập Số!");
  } else if (person.loaiDT === "Customer") {
    valid &= kiemTraRong(
      person.tenCongTy,
      "#invalidTenCongTy",
      "Không Được Để Trống!"
    );
    valid &= kiemTraRong(
      person.triGiaHoaDon,
      "#invalidTriGiaHoaDon",
      "Không Được Để Trống!"
    );
    valid &= kiemTraRong(
      person.danhGia,
      "#invalidDanhGia",
      "Không Được Để Trống!"
    );
  }

  if (valid) {
    // call API thêm mới đối tượng
    const promise = axios({
      method: "POST",
      url: "https://65113dfe829fa0248e3fb9c1.mockapi.io/QLHV",
      data: {
        // spread operator
        ...person,
      },
    });

    promise
      .then(() => {
        // call API lấy lại danh sách đối tượng mới sau khi thêm thành công

        getPersonList();

        // đóng modal thêm đối tượng
        getElement("#btnClose").click();
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

window.editPerson = (id) => {
  // ẩn btn thêm đối tượng
  getElement("#btnThemDoiTuong").hidden = true;
  //hiện thị btn cập nhật
  getElement("#btnCapNhat").hidden = false;
  // Ẩn phương thức đối tượng
  getElement("#txtLuongThang").hidden = true;
  getElement("#txtDiemTB").hidden = true;
  // call API lấy thông tin đối tượng qua id
  const promise = axios({
    method: "GET",
    url: `https://65113dfe829fa0248e3fb9c1.mockapi.io/QLHV/${id}`,
  });

  promise.then((result) => {
    // đưa  id vào trong button cập nhật
    getElement("#btnCapNhat").setAttribute("data-id", result.data.id);

    // parse thông tin đối tượng
    const parse = (person) => {
      return {
        ...person,
      };
    };

    // console.log(result.data);
    //reset validation
    let nodeList = document.querySelectorAll(".invalid-feedback");
    nodeList.forEach((param) => {
      param.style.display = "none";
    });

    const person = parse(result.data);
    // hiển thị thông tin đối tượng lên modal
    getElement("#maDT").value = person.maDT;
    getElement("#maDT").disabled = true;
    getElement("#hoTen").value = person.hoTen;
    getElement("#diaChi").value = person.diaChi;
    getElement("#email").value = person.email;
    getElement("#occupation").value = person.loaiDT;
    getElement("#occupation").disabled = false;
    if (person.loaiDT === "Student") {
      getElement("#studentDetails").hidden = false;
      getElement("#employeeDetails").hidden = true;
      getElement("#customerDetails").hidden = true;
    } else if (person.loaiDT === "Employee") {
      getElement("#studentDetails").hidden = true;
      getElement("#employeeDetails").hidden = false;
      getElement("#customerDetails").hidden = true;
    } else if (person.loaiDT === "Customer") {
      getElement("#studentDetails").hidden = true;
      getElement("#employeeDetails").hidden = true;
      getElement("#customerDetails").hidden = false;
    }
    getElement("#diemToan").value = person.diemToan;
    getElement("#diemLy").value = person.diemLy;
    getElement("#diemHoa").value = person.diemHoa;
    getElement("#soNgayLamViec").value = person.soNgayLamViec;
    getElement("#luongMotNgay").value = person.luongMotNgay;
    getElement("#tenCongTy").value = person.tenCongTy;
    getElement("#triGiaHoaDon").value = person.triGiaHoaDon;
    getElement("#danhGia").value = person.danhGia;
  });
};

// cập nhật đối tượng
getElement("#btnCapNhat").onclick = () => {
  // lấy thông tin đối tượng sau edit
  const person = layThongTinDoiTuong();

  // lấy id của đối tượng muốn cập nhật
  const id = getElement("#btnCapNhat").getAttribute("data-id");
  //Kiểm tra mã đối tượng
  let valid = kiemTraRong(
    person.maDT,
    "#invalidID",
    "Mã Đối Tượng Không Được Để Trống!"
  );
  // Kiểm Tra Họ Tên
  valid &= kiemTraRong(
    person.hoTen,
    "#invalidTen",
    "Họ Tên Đối Tượng Không Được Để Trống!"
  );
  // Kiểm Tra Địa Chỉ
  valid &= kiemTraRong(
    person.diaChi,
    "#invalidDiaChi",
    "Địa Chỉ Đối Tượng Không Được Để Trống!"
  );
  //Kiểm Tra Email
  valid &=
    kiemTraRong(
      person.email,
      "#invalidEmail",
      "Email Đối Tượng Không Được Để Trống!"
    ) && kiemTraEmail(person.email, "#invalidEmail", "Sai Định Dạng Email!");
  // Kiểm tra Lớp Đối Tượng
  valid &= kiemTraDoiTuong(
    person.loaiDT,
    "#invalidLoaiDT",
    "Chọn Một Đối Tượng!"
  );
  if (person.loaiDT === "Student") {
    valid &=
      kiemTraRong(
        person.diemToan,
        "#invalidDiemToan",
        "Điểm Không Được Để Trống!"
      ) && checkNumber(person.diemToan, "#invalidDiemToan", "Chỉ Nhập Số!");
    valid &=
      kiemTraRong(
        person.diemLy,
        "#invalidDiemLy",
        "Điểm Không Được Để Trống!"
      ) && checkNumber(person.diemLy, "#invalidDiemLy", "Chỉ Nhập Số!");
    valid &=
      kiemTraRong(
        person.diemHoa,
        "#invalidDiemHoa",
        "Điểm Không Được Để Trống!"
      ) && checkNumber(person.diemHoa, "#invalidDiemHoa", "Chỉ Nhập Số!");
  } else if (person.loaiDT === "Employee") {
    valid &=
      kiemTraRong(
        person.soNgayLamViec,
        "#invalidGiaSoNgayLamViec",
        "Không Được Để Trống!"
      ) &&
      checkNumber(
        person.soNgayLamViec,
        "#invalidGiaSoNgayLamViec",
        "Chỉ Nhập Số!"
      );
    valid &=
      kiemTraRong(
        person.luongMotNgay,
        "#invalidLuongMotNgay",
        "Không Được Để Trống!"
      ) &&
      checkNumber(person.luongMotNgay, "#invalidLuongMotNgay", "Chỉ Nhập Số!");
  } else if (person.loaiDT === "Customer") {
    valid &= kiemTraRong(
      person.tenCongTy,
      "#invalidTenCongTy",
      "Không Được Để Trống!"
    );
    valid &= kiemTraRong(
      person.triGiaHoaDon,
      "#invalidTriGiaHoaDon",
      "Không Được Để Trống!"
    );
    valid &= kiemTraRong(
      person.danhGia,
      "#invalidDanhGia",
      "Không Được Để Trống!"
    );
  }
  if (valid) {
    // call API cập nhật đối tượng
    const promise = axios({
      method: "PUT",
      url: `https://65113dfe829fa0248e3fb9c1.mockapi.io/QLHV/${id}`,
      data: {
        ...person,
      },
    });

    promise
      .then(() => {
        // lấy lại danh sách đối tượng sau khi cập nhật thành công
        resetForm();
        getPersonList();

        // đóng modal sau khi cập nhật thành công
        getElement("#btnClose").click();
      })
      .catch((err) => {});
  }
};

window.showDetail = (id) => {
  getElement("#btnThemDoiTuong").hidden = true;
  getElement("#btnCapNhat").hidden = true;

  const promise = axios({
    method: "GET",
    url: `https://65113dfe829fa0248e3fb9c1.mockapi.io/QLHV/${id}`,
  });

  promise
    .then((res) => {
      let listPersonDetail;
      listPersonDetail = res.data;
      getElement("#occupation").disabled = true;
      if (listPersonDetail.loaiDT === "Student") {
        const student = new Student(
          listPersonDetail.maDT,
          listPersonDetail.hoTen,
          listPersonDetail.diaChi,
          listPersonDetail.email,
          listPersonDetail.loaiDT,
          listPersonDetail.diemToan,
          listPersonDetail.diemLy,
          listPersonDetail.diemHoa
        );

        getElement("#maDT").value = student.maDT;
        getElement("#hoTen").value = student.hoTen;
        getElement("#diaChi").value = student.diaChi;
        getElement("#email").value = student.email;
        getElement("#occupation").value = student.loaiDT;
        getElement("#diemToan").value = student.diemToan;
        getElement("#diemLy").value = student.diemLy;
        getElement("#diemHoa").value = student.diemHoa;
        getElement("#studentDetails").hidden = false;
        getElement("#employeeDetails").hidden = true;
        getElement("#customerDetails").hidden = true;
        getElement("#txtDiemTB").hidden = false;
        getElement("#txtLuongThang").hidden = true;
        getElement("#diemTB").value = student.tinhDiemTrungBinh();
      } else if (listPersonDetail.loaiDT === "Employee") {
        const employee = new Employee(
          listPersonDetail.maDT,
          listPersonDetail.hoTen,
          listPersonDetail.diaChi,
          listPersonDetail.email,
          listPersonDetail.loaiDT,
          listPersonDetail.soNgayLamViec,
          listPersonDetail.luongMotNgay
        );
        getElement("#maDT").value = employee.maDT;
        getElement("#hoTen").value = employee.hoTen;
        getElement("#diaChi").value = employee.diaChi;
        getElement("#email").value = employee.email;
        getElement("#occupation").value = employee.loaiDT;
        getElement("#soNgayLamViec").value = employee.soNgayLamViec;
        getElement("#luongMotNgay").value = employee.luongMotNgay;
        getElement("#studentDetails").hidden = true;
        getElement("#employeeDetails").hidden = false;
        getElement("#customerDetails").hidden = true;
        getElement("#txtLuongThang").hidden = false;
        getElement("#txtDiemTB").hidden = true;
        getElement("#luongThang").value = employee.tinhLuong().toLocaleString();
      } else if (listPersonDetail.loaiDT === "Customer") {
        const customer = new Customer(
          listPersonDetail.maDT,
          listPersonDetail.hoTen,
          listPersonDetail.diaChi,
          listPersonDetail.email,
          listPersonDetail.loaiDT,
          listPersonDetail.tenCongTy,
          listPersonDetail.triGiaHoaDon,
          listPersonDetail.danhGia
        );
        getElement("#maDT").value = customer.maDT;
        getElement("#hoTen").value = customer.hoTen;
        getElement("#diaChi").value = customer.diaChi;
        getElement("#email").value = customer.email;
        getElement("#occupation").value = customer.loaiDT;
        getElement("#tenCongTy").value = customer.tenCongTy;
        getElement("#triGiaHoaDon").value = customer.triGiaHoaDon;
        getElement("#danhGia").value = customer.danhGia;
        getElement("#studentDetails").hidden = true;
        getElement("#employeeDetails").hidden = true;
        getElement("#customerDetails").hidden = false;
        getElement("#txtLuongThang").hidden = true;
        getElement("#txtDiemTB").hidden = true;
      }
      //reset validation
      let nodeList = document.querySelectorAll(".invalid-feedback");
      nodeList.forEach((param) => {
        param.style.display = "none";
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

window.deletePerson = (id) => {
  // call API xóa đối tượng
  const promise = axios({
    method: "DELETE",
    url: `https://65113dfe829fa0248e3fb9c1.mockapi.io/QLHV/${id}`,
  });

  promise
    .then(() => {
      // gọi lại api lấy danh sách đối tượng
      resetForm();
      getPersonList();
    })
    .catch((err) => {
      console.log(err);
    });
};

window.showDetails = () => {
  const selectElement = document.getElementById("occupation");
  const studentDetails = document.getElementById("studentDetails");
  const employeeDetails = document.getElementById("employeeDetails");
  const customerDetails = getElement("#customerDetails");
  if (selectElement.value === "Student") {
    studentDetails.hidden = false;
    employeeDetails.hidden = true;
    customerDetails.hidden = true;
  } else if (selectElement.value === "Employee") {
    studentDetails.hidden = true;
    employeeDetails.hidden = false;
    customerDetails.hidden = true;
  } else if (selectElement.value === "Customer") {
    studentDetails.hidden = true;
    employeeDetails.hidden = true;
    customerDetails.hidden = false;
  } else {
    studentDetails.hidden = true;
    employeeDetails.hidden = true;
    customerDetails.hidden = true;
  }
};

// Phân Loại từng Đối TƯợng
window.displayProducts = () => {
  var selectElement = document.getElementById("selLoai");
  var selectedValue = selectElement.value;

  // Lấy danh sách tất cả các sản phẩm
  var personList = document.getElementsByClassName("Filter");

  // Hiển thị hoặc ẩn danh sách sản phẩm theo loại đã chọn
  for (var i = 0; i < personList.length; i++) {
    var person = personList[i];

    if (selectedValue === "all") {
      person.style.display = "table-row"; // Hiển thị tất cả sản phẩm
    } else if (person.classList.contains(selectedValue)) {
      person.style.display = "table-row"; // Hiển thị sản phẩm theo loại đã chọn
    } else {
      person.style.display = "none"; // Ẩn sản phẩm không thuộc loại đã chọn
    }
  }
};

// Sort theo Họ Tên
window.sortTable = () => {
  var table = document
    .getElementById("myTable")
    .getElementsByTagName("tbody")[0];
  var rows = Array.from(table.rows);
  // Sắp xếp mảng theo trường họ tên
  rows.sort((a, b) => {
    const nameA = a.querySelector(".hoten").textContent;
    const nameB = b.querySelector(".hoten").textContent;
    var sortOption = document.getElementById("sorting").value;
    if (sortOption === "ascending") {
      return nameB.localeCompare(nameA);
    } else if (sortOption == "descending") {
      return nameA.localeCompare(nameB);
    }
  });

  // Xóa các dòng hiện tại trong bảng
  rows.forEach((row) => row.parentNode.removeChild(row));

  // Thêm lại các dòng đã được sắp xếp vào bảng
  rows.forEach((row) => document.querySelector("table tbody").appendChild(row));
};
