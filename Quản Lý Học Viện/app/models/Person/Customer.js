import Person from './Person.js'

class Customer extends Person {
    constructor(maDT, hoTen, diaChi, email, loaiDT, tenCongTy, triGiaHoaDon, danhGia) {
        super(maDT, hoTen, diaChi, email, loaiDT);
        this.tenCongTy = tenCongTy;
        this.triGiaHoaDon = triGiaHoaDon;
        this.danhGia = danhGia;
      }
  }
  export default Customer