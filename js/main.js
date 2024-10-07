// Hàm kiểm tra số nguyên tố
function isSoNguyenTo(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Hàm xử lý mảng
function xuLyMang(mang) {
    const tong = mang.reduce((tich, num) => tich + num, 0);
    const soLuongChan = mang.filter(num => num % 2 === 0).length;
    const soLuongLe = mang.length - soLuongChan;

    const tanSuat = {};
    mang.forEach(num => {
        tanSuat[num] = (tanSuat[num] || 0) + 1;
    });
    const phanTuXuatHienNhieuNhat = Object.keys(tanSuat).reduce((a, b) => tanSuat[a] > tanSuat[b] ? a : b);
    const soLuongSoNguyenTo = mang.filter(isSoNguyenTo).length;

    return {
        tong,
        laTongChan: tong % 2 === 0,
        soLuongChan,
        soLuongLe,
        tangDan: [...mang].sort((a, b) => a - b),
        giamDan: [...mang].sort((a, b) => b - a),
        phanTuXuatHienNhieuNhat: Number(phanTuXuatHienNhieuNhat),
        soLuongXuatHien: tanSuat[phanTuXuatHienNhieuNhat],
        soLuongSoNguyenTo
    };
}

// Xử lý sự kiện khi nhấn nút
document.getElementById('xuLyMang').addEventListener('click', () => {
    const input = document.getElementById('mangInput').value;
    const mang = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num)).slice(0, 10);

    if (mang.length < 10) {
        alert("Vui lòng nhập đủ 10 số nguyên.");
        return;
    }

    const ketQua = xuLyMang(mang);

    const divKetQua = document.getElementById('ketQua');
    divKetQua.innerHTML = `
        <strong>Mảng:</strong> ${mang.join(', ')}<br>
        <strong>Tổng các phần tử:</strong> ${ketQua.tong} (${ketQua.laTongChan ? "Chẵn" : "Lẻ"})<br>
        <strong>Số lượng số chẵn:</strong> ${ketQua.soLuongChan}<br>
        <strong>Số lượng số lẻ:</strong> ${ketQua.soLuongLe}<br>
        <strong>Sắp xếp tăng dần:</strong> ${ketQua.tangDan.join(', ')}<br>
        <strong>Sắp xếp giảm dần:</strong> ${ketQua.giamDan.join(', ')}<br>
        <strong>Phần tử xuất hiện nhiều nhất:</strong> ${ketQua.phanTuXuatHienNhieuNhat} (xuất hiện ${ketQua.soLuongXuatHien} lần)<br>
        <strong>Số nguyên tố trong mảng:</strong> ${ketQua.soLuongSoNguyenTo}
    `;
});
