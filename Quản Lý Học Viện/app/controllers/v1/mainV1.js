// console.log('Hello World')
import Food from '../../models/v1/Food.js'

const getElement = (selector) => {
    return document.querySelector(selector)
}

const layThongTinMonAn = () => {
    // C1: ES5
    // const maMon = getElement('#foodID').value
    // const tenMon = getElement('#tenMon').value
    // const loaiMon = getElement('#loai').value
    // const giaMon = getElement('#giaMon').value
    // const khuyenMai = getElement('#khuyenMai').value
    // const tinhTrang = getElement('#tinhTrang').value
    // const hinhAnh = getElement('#hinhMon').value
    // const moTa = getElement('#moTa').value

    //  tạo 1 đối tượng food từ lớp đối tượng Food
    //  const food = new Food(maMon, tenMon, loaiMon, giaMon, khuyenMai, tinhTrang, hinhAnh, moTa)
    //  console.log('food: ', food)
    //  return food

    // C2:
    // debugger
    const elements = document.querySelectorAll(
        '#foodForm input, #foodForm select, #foodForm textarea'
    )
    let food = {}

    elements.forEach((ele, index) => {
        console.log(ele.value, ele.name)
        //destructuring
        const { value, name } = ele
        food[name] = value
    })

    console.log('food: ', food)
    // console.log('elements: ', elements)
    // destructuring food
    const { maMon, tenMon, loaiMon, hinhAnh, giaMon, khuyenMai, moTa, tinhTrang } = food

    return new Food(maMon, tenMon, loaiMon, giaMon, khuyenMai, tinhTrang, hinhAnh, moTa)
}

getElement('#btnThemMon').onclick = () => {
    const food = layThongTinMonAn()

    getElement('#imgMonAn').src = food.hinhAnh
    getElement('#spMa').innerHTML = food.maMon
    getElement('#spTenMon').innerHTML = food.tenMon
    getElement('#spLoaiMon').innerHTML = food.mapLoaiMonAn()
    getElement('#spGia').innerHTML = food.giaMon
    getElement('#spKM').innerHTML = food.khuyenMai
    getElement('#spGiaKM').innerHTML = food.tinhGiaKhuyenMai()
    getElement('#spTT').innerHTML = food.mapTinhTrangMonAn()
    getElement('#pMoTa').innerHTML = food.moTa
}
