const kiemTraRong = (value, idErr, message) => {
    if (value.trim() === "") {
      document.querySelector(idErr).innerHTML = message;
      document.querySelector(idErr).style.display = "block";
      return false;
    } else {
      document.querySelector(idErr).innerHTML = "";
      return true;
    }
  }
 const kiemTraDoiTuong = (value, idErr, message) => {
    var option = ["Student", "Employee", "Customer"]
    if (option.includes(value)){
      document.querySelector(idErr).innerHTML = ""
      return true;
    }else{
      document.querySelector(idErr).innerHTML = message;
      document.querySelector(idErr).style.display = "block";
      return false;
    }
  }

  const kiemTraTrung = (id, listPerson, idErr, message) => {
    let viTri = listPerson.findIndex(function (nv) {
      return nv.maDT == id;
    });
    // console.log("vị trí", viTri);
  
    if (viTri != -1) {
      document.querySelector(idErr).innerHTML = message;
      document.querySelector(idErr).style.display = "block";
      return false;
    } else {
      document.querySelector(idErr).innerHTML = "";
      return true;
    }
  }

  const kiemTraEmail = (value, idErr, message) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
    var isEmail = re.test(value);
    if (isEmail) {
      document.querySelector(idErr).innerHTML = "";
      return true;
    } else {
      document.querySelector(idErr).innerHTML = message;
      document.querySelector(idErr).style.display = "block";
      return false;
    }
  }

  const checkNumber = (value, idErr, message) => {
    const re = /^[0-9]+$/;
  
    var isString = re.test(value);
    if (isString) {
      document.querySelector(idErr).innerHTML = "";
      return true;
    } else {
      document.querySelector(idErr).style.display = "block";
      document.querySelector(idErr).innerHTML = message;
      return false;
    }
  }