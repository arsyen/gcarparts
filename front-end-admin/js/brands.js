function fill_BrandsTable() {
    $.get("/api/car-brands", function (data, status, xhr) {
        if (status == 'success') {
            var tblBrands = $("#tblBrands");
            $(data).each(function () {

                var option = $(generateBrandsRow(this._id,this.name));
                tblBrands.append(option);
            });
        }
    });
}

function generateBrandsRow(id, name){
    let str = `<tr>
    <td>${name}</td>
    <td></td>
    </tr>`;

    return str;
}

function addNewBrand() {
    let name = $("#txtNewBrandName").val();

    if(!name)
    {
        alert("Նշեք անունը");
    }

    console.log("posting");
    $.post(
        "/api/car-brands",
        { name:name },
        function (data) {
            console.log("sdsadsad");
            var tblBrands = $("#tblBrands");

            var option = $(generateBrandsRow(null,name));
            tblBrands.append(option);
            hideNewBrandModal();

        }, "json");
}

function openNewBrandModal() {
    $("#myModal").modal('show');
}
function hideNewBrandModal() {
    $("#myModal").modal('hide');
}

fill_BrandsTable();