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

            fill_DDModel();
        }
    });
}

function openNewPartModal() {
    $("#myModal").modal('show');
}
function hideNewPartModal() {
    $("#myModal").modal('hide');
}

function fill_PartsTable() {
    $.get("/api/car-parts", function (data, status, xhr) {
        if (status == 'success') {
            var tblBrands = $("#tblParts");
            $(data).each(function () {

                var option = $(generatePartsRow(this));
                tblBrands.append(option);
            });
        }
    });
}

function generatePartsRow(record){
    let str = `<tr>

    <td>${record.name}</td>
    <td>${record.brand}</td>
    <td>${record.carBrand} ${record.carModel}</td>
    <td>${record.category}</td>
    <td>${record.description}</td>
    <td>${record.price}</td>
    <td>${record.inStock ? "✓":"✗"}</td>
    </tr>`;

    return str;
}

function addNewPart() {
    let name = $("#txtName").val();
    let brandId = $("#ddlBrands").val();
    let brandModelId = $("#ddlCarModels").val();
    let categoryId = $("#ddlCategories").val();
    let description = $("#txtDescription").val();
    let price = $("#txtPrice").val();
    let inStock =  document.getElementById('chkInStock').checked;
    let partBrand = $("#txtPartBrand").val();
    

    if(!name || !brandId)
    {
        alert("Նշեք անունը և մակնիշը");
        return;
    }
    
    console.log("posting");
    let data=      { 
        name:name,
        carBrandId:brandId,
        carModelId:brandModelId,
        categoryId:categoryId,
        description:description,
        price:price,
        inStock:inStock,
        brand:partBrand
    };
    console.log(data);
    $.post(
        "/api/car-parts",
        data,
        function (data) {
            var tblBrands = $("#tblParts");

            var option = $(generatePartsRow(null,name));
            tblBrands.append(option);
            hideNewPartModal();

        }, "json");
}

function fill_DDCategory() {
    $.get("/api/part-categories", function (data, status, xhr) {
        if (status == 'success') {
            var ddlCategory = $("#ddlCategories");
            $(data).each(function () {
                var option = $("<option />");
                option.html(this.name);
                option.val(this._id);
                ddlCategory.append(option);
            });
        }
    });
}

function fill_DDModel() {
    let brandId = $("#ddlBrands").val();
    let url  = "/api/car-models/"+brandId;
    $.get(url, function (data, status, xhr) {
        if (status == 'success') {
            var ddlModel = $("#ddlCarModels");
            ddlModel.empty();
            $(data).each(function () {
                var option = $("<option />");
                option.html(this.name);
                option.val(this._id);
                ddlModel.append(option);
            });
        }
    });
}

fill_DDBrand();
fill_DDCategory();
fill_PartsTable();