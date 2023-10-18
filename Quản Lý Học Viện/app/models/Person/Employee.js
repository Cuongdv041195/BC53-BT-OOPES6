import Person from './Person.js'

class Employee extends Person {
    constructor(maDT, hoTen, diaChi, email, loaiDT, soNgayLamViec, luongMotNgay) {
        super(maDT, hoTen, diaChi, email, loaiDT);
        this.soNgayLamViec = soNgayLamViec;
        this.luongMotNgay = luongMotNgay;
      }
      tinhLuong = () => {
        return Number(this.soNgayLamViec * this.luongMotNgay)
      }
  }
  export default Employee