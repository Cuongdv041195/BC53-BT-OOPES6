class Person {
    constructor(maDT, hoTen, diaChi, email, loaiDT) {
        this.maDT = maDT
        this.hoTen = hoTen
        this.diaChi = diaChi
        this.email = email
        this.loaiDT = loaiDT
        // this.hinhAnh = hinhAnh
        // this.moTa = moTa
    }

    // mapTinhTrangMonAn = () => {
    //     // if (this.tinhTrang === '0') return 'Hết'
    //     // if (this.tinhTrang === '1') return 'Còn'

    //     return this.tinhTrang === '0' ? 'Hết' : 'Còn'
    // }

    // mapLoaiMonAn = () => {
    //     return this.loaiMon === 'loai1' ? 'Chay' : 'Mặn'
    // }

    // tinhGiaKhuyenMai = () => {
    //     return this.giaMon * (1 - Number(this.khuyenMai) / 100)
    // }
}

export default Person

