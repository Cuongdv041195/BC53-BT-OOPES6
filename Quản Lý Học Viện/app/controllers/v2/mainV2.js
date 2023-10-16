// console.log('TEST')
import Food from '../../models/v2/Food.js'

const getElement = (selector) => document.querySelector(selector)

// Lấy danh sách món ăn từ API
const getFoodList = () => {
    const promise = axios({
        method: 'GET',
        url: 'https://61af96ff3e2aba0017c49453.mockapi.io/foods',
    })

    promise
        // get data thành công
        .then((result) => {
            console.log(result.data)
            renderTable(result.data)
        })
        // get data thất bại
        .catch((err) => {
            console.log(err)
        })
        // Luôn luôn chạy dù thành công, thất bại
        .finally(() => {
            console.log('finally')
        })
}
getFoodList()

// show data get từ API ra UI
const renderTable = (foodList) => {
    let htmlContent = ''
    foodList.forEach((food) => {
        htmlContent += `
            <tr>
                <td>${food.maMon}</td>
                <td>${food.tenMon}</td>
                <td>${food.loaiMon}</td>
                <td>${food.giaMon}</td>
                <td>${food.khuyenMai}</td>
                <td>${food.giaMon * (1 - Number(food.khuyenMai) / 100) || ''}</td>
                <td>${food.tinhTrang}</td>
                <td>
                    <button 
                        class='btn btn-success' 
                        data-toggle="modal" 
                        data-target="#exampleModal" 
                        id='btnEdit'
                        onclick="editFood(${food.id})"
                    >
                        Edit
                    </button>
                    <button 
                        class='btn btn-danger ml-3' 
                        onclick="deleteFood(${food.id})"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `
    })

    getElement('#tbodyFood').innerHTML = htmlContent
}

const layThongTinMonAn = () => {
    const elements = document.querySelectorAll(
        '#foodForm input, #foodForm select, #foodForm textarea'
    )
    let food = {}

    elements.forEach((ele, index) => {
        //destructuring
        const { value, name } = ele
        food[name] = value
    })

    // destructuring food
    const { maMon, tenMon, loaiMon, hinhAnh, giaMon, khuyenMai, moTa, tinhTrang } = food
    return new Food(maMon, tenMon, loaiMon, giaMon, khuyenMai, tinhTrang, hinhAnh, moTa)
}

// ẩn btn cập nhật
getElement('#btnThem').onclick = () => {
    // ẩn btn cập nhật
    getElement('#btnCapNhat').style.display = 'none'

    // hiển thị lại btn thêm món
    getElement('#btnThemMon').style.display = 'inline-block'
}

getElement('#btnThemMon').onclick = () => {
    // Lấy thông tin món từ user nhập trên form
    const food = layThongTinMonAn()
    console.log('food: ', food)

    // call API thêm mới món ăn
    const promise = axios({
        method: 'POST',
        url: 'https://61af96ff3e2aba0017c49453.mockapi.io/foods',
        data: {
            // spread operator
            ...food,
            loaiMon: food.mapLoaiMonAn(),
            tinhTrang: food.mapTinhTrangMonAn(),
        },
    })

    promise
        .then(() => {
            // call API lấy lại danh sách món ăn mới sau khi thêm thành công
            getFoodList()

            // đóng modal thêm món ăn
            getElement('#btnClose').click()
        })
        .catch((err) => {
            console.log(err)
        })
}

window.editFood = (id) => {
    // ẩn btn thêm món
    getElement('#btnThemMon').style.display = 'none'
    //hiện thị btn cập nhật
    getElement('#btnCapNhat').style.display = 'inline-block'

    // call API lấy thông tin món ăn qua id
    const promise = axios({
        method: 'GET',
        url: `https://61af96ff3e2aba0017c49453.mockapi.io/foods/${id}`,
    })

    promise.then((result) => {
        // đưa food id vào trong button cập nhật
        getElement('#btnCapNhat').setAttribute('data-id', result.data.id)

        // parse thông tin món ăn
        const parse = (food) => {
            return {
                ...food,
                loaiMon: food.loaiMon === 'Chay' ? 'loai1' : 'loai2',
                tinhTrang: food.tinhTrang === 'Còn' ? '1' : '0',
            }
        }

        console.log(result.data)

        const food = parse(result.data)
        // hiển thị thông tin món ăn lên modal
        getElement('#foodID').value = food.maMon
        getElement('#tenMon').value = food.tenMon
        getElement('#loai').value = food.loaiMon
        getElement('#giaMon').value = food.giaMon
        getElement('#khuyenMai').value = food.khuyenMai
        getElement('#tinhTrang').value = food.tinhTrang
        getElement('#hinhMon').value = food.hinhAnh
        getElement('#moTa').value = food.moTa
    })
}

// cập nhật món ăn
getElement('#btnCapNhat').onclick = () => {
    // lấy thông tin món ăn sau edit
    const food = layThongTinMonAn()

    // lấy id của món ăn muốn cập nhật
    const id = getElement('#btnCapNhat').getAttribute('data-id')

    // call API cập nhật món ăn
    const promise = axios({
        method: 'PUT',
        url: `https://61af96ff3e2aba0017c49453.mockapi.io/foods/${id}`,
        data: {
            ...food,
            loaiMon: food.mapLoaiMonAn(),
            tinhTrang: food.mapTinhTrangMonAn(),
        },
    })

    promise
        .then(() => {
            // lấy lại danh sách món ăn sau khi cập nhật thành công
            getFoodList()

            // đóng modal sau khi cập nhật thành công
            getElement('#btnClose').click()
        })
        .catch((err) => {})
}

window.deleteFood = (id) => {
    // call API xóa món ăn
    const promise = axios({
        method: 'DELETE',
        url: `https://61af96ff3e2aba0017c49453.mockapi.io/foods/${id}`,
    })

    promise
        .then(() => {
            // gọi lại api lấy danh sách món ăn
            getFoodList()
        })
        .catch((err) => {
            console.log(err)
        })
}
