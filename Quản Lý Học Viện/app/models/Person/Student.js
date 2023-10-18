import Person from './Person.js'

class Student extends Person {
    constructor(maDT, hoTen, diaChi, email, loaiDT, diemToan, diemLy, diemHoa) {
      super(maDT, hoTen, diaChi, email, loaiDT);
      this.diemToan = diemToan;
      this.diemLy = diemLy;
      this.diemHoa = diemHoa;
    }
    tinhDiemTrungBinh = () => {
      return Number(+this.diemToan + +this.diemLy + +this.diemHoa) / 3;
    }  
  }
export default Student