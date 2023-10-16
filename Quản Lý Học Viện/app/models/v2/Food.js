class Food {
    constructor(maMon, tenMon, loaiMon, giaMon, khuyenMai, tinhTrang, hinhAnh, moTa) {
        this.maMon = maMon
        this.tenMon = tenMon
        this.loaiMon = loaiMon
        this.giaMon = giaMon
        this.khuyenMai = khuyenMai
        this.tinhTrang = tinhTrang
        this.hinhAnh = hinhAnh
        this.moTa = moTa
    }

    mapTinhTrangMonAn = () => {
        // if (this.tinhTrang === '0') return 'Hết'
        // if (this.tinhTrang === '1') return 'Còn'

        return this.tinhTrang === '0' ? 'Hết' : 'Còn'
    }

    mapLoaiMonAn = () => {
        return this.loaiMon === 'loai1' ? 'Chay' : 'Mặn'
    }

    tinhGiaKhuyenMai = () => {
        return this.giaMon * (1 - Number(this.khuyenMai) / 100)
    }
}

export default Food
