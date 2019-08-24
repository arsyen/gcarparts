function fill_DDBrand() {
    $.get("/api/car-brands", function (data, status, xhr) {
        if (status == 'success') {
            var ddlBrands = $("#ddlBrands");
            $(data).each(function () {
                var option = $("<option />");
                option.html(this.name);
                option.val(this._id);
                ddlBrands.append(option);
            });
        }
    });
}

function openNewModelModal() {
    $("#myModal").modal('show');
}
function hideNewModelModal() {
    $("#myModal").modal('hide');
}

function fill_ModelsTable() {
    $.get("/api/car-models", function (data, status, xhr) {
        if (status == 'success') {
            var tblBrands = $("#tblModels");
            $(data).each(function () {

                var option = $(generateModelsRow(this._id,this.name, this.brandName));
                tblBrands.append(option);
            });
        }
    });
}

function generateModelsRow(id, name,brandName){
    let str = `<tr>

    <td>${brandName}</td>
    <td>${name}</td>
    </tr>`;

    return str;
}

function addNewModel() {
    let name = $("#txtNewModelName").val();
    let brandId = $("#ddlBrands").val();

    if(!name || !brandId)
    {
        alert("Նշեք անունը և մակնիշը");
        return;
    }
    
    console.log("posting");
    $.post(
        "/api/car-models",
        { 
            name:name,
            brandId:brandId
        },
        function (data) {
            console.log("sdsadsad");
            var tblBrands = $("#tblModels");

            var option = $(generateModelsRow(null,name));
            tblBrands.append(option);
            hideNewModelModal();

        }, "json");
}

fill_DDBrand();
fill_ModelsTable();