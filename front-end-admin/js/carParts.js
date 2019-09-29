var Brands;
function fill_DDBrand() {
    $.get("/api/car-brands", function (data, status, xhr) {
        if (status == 'success') {
            Brands = data;
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
    $("#txtName").val("");
    $("#ddlBrands").val("");
    $("#ddlCarModels").val("");
    $("#ddlCategories").val("");
    $("#txtPartSerial").val("");
    $("#txtPrice").val("");
    $("#txtPartBrand").val("");
    $("#txtPartYears").val("");
    $("#inputImg").val("");
    $("#imgPreview").prop("src", "");
    $("#myModal").modal('show');
    $("#hdnEditId").val("");
    $("#hdnFileName").val("");
    $("#hdnFileContentType").val("");

    $("#btnAddPart").show();
    $("#btnEditPart").hide();
}
function hideNewPartModal() {
    $("#myModal").modal('hide');
}

function openEditPartModal(id) {
    $("#hdnEditId").val(id);

    var part = Parts.find(function (element) {
        return element._id === id;
    });

    $("#txtNewPartName").val(part.name);
    $("#txtPartYears").val(part.years.join(','));
    $("#ddlBrands").val(part.carBrandId);
    $("#ddlCarModels").val(part.carModelId);
    $("#ddlCategories").val(part.categoryId);
    $("#txtDescription").val(part.description);
    $("#txtPrice").val(part.price);
    $("#chkInStock").prop('checked', part.inStock);
    $("#txtPartBrand").val(part.brand);
    $("#txtPartSerial").val(part.serial);
    $("#hdnFileName").val("");
    $("#hdnFileContentType").val("");
    $("#imgPreview").prop('src', `../api/assets/images/${part.image}`);
    fill_DDModel();
    $("#btnAddPart").hide();
    $("#btnEditPart").show();
    $("#myModal").modal('show');
}
function hideEditPartModal() {
    $("#hdnEditId").val("");
    $("#editModal").modal('hide');
}

function openDeleteModal(id) {
    $("#hdnDeleteId").val(id);
    $("#deleteModal").modal('show');
}
function closeDeleteModal() {
    $("#hdnDeleteId").val("");
    $("#deleteModal").modal('hide');
}


function openImageModal(imageId) {
    $("#imgModalPreview").prop('src', `../api/assets/images/${imageId}`);
    $("#imageModal").modal('show');
}



function fill_PartsTable() {
    $.get("/api/car-parts", function (data, status, xhr) {
        if (status == 'success') {
            Parts = data;
            var tblBrands = $("#tblParts");
            let i = 0;
            $(data).each(function () {
                i++;
                var option = $(generatePartsRow(this, i));
                tblBrands.append(option);
            });
        }
    });
}

function generatePartsRow(record, i) {
    let str = `<tr id=${'tr_' + record._id}>
    <th scope="row">${i}</th>
    <td>${record.name}</td>
    <td>${record.brand}</td>
    <td>${record.carBrand} ${record.carModel}</td>
    <td>${record.category}</td>
    <td>${record.years.join(',')}</td>
    <td>${record.price}</td>
    <td>${record.inStock ? "✓" : "✗"}</td>
    <td>
        ${
        record.image ? `<button class="btn btn-outline-primary" onClick="openImageModal('${record.image}')">🖼</button>` : ""
        }
    </td>
    <td>
        <button class="btn btn-outline-primary" onClick="openEditPartModal('${record._id}')">Փոփոխել</button>
        <button class="btn btn-secondary" onClick="openDeleteModal('${record._id}')">Ջնջել</button> 
    </td>
    
    </tr>`;

    return str;
}

function addNewPart() {
    let name = $("#txtNewPartName").val();
    let brandId = $("#ddlBrands").val();
    let brandModelId = $("#ddlCarModels").val();
    let categoryId = $("#ddlCategories").val();
    let serial = $("#txtPartSerial").val();
    let price = $("#txtPrice").val();
    let inStock = document.getElementById('chkInStock').checked;
    let partBrand = $("#txtPartBrand").val();
    let years = $("#txtPartYears").val();
    let fileName = $("#hdnFileName").val();
    let imageContentType = $("#hdnFileContentType").val();
    // if (!name || !brandId) {
    //     alert("Նշեք անունը և մակնիշը");
    //     return;
    // }


    let newData = {
        name: name,
        carBrandId: brandId,
        carModelId: brandModelId,
        categoryId: categoryId,
        price: price,
        inStock: inStock,
        brand: partBrand,
        years: years,
        serial: serial,
        fileName: fileName,
        imageContentType: imageContentType
    };
    console.log(newData);
    $.post(
        "/api/car-parts",
        newData,
        function (data) {
            var tblBrands = $("#tblParts");

            var option = $(generatePartsRow(data, ""));
            tblBrands.append(option);
            hideNewPartModal();
        });
}

function updatePart() {
    let partId = $("#hdnEditId").val();
    let name = $("#txtNewPartName").val();
    let brandId = $("#ddlBrands").val();
    let brandModelId = $("#ddlCarModels").val();
    let categoryId = $("#ddlCategories").val();
    let serial = $("#txtPartSerial").val();
    let price = $("#txtPrice").val();
    let inStock = document.getElementById('chkInStock').checked;
    let partBrand = $("#txtPartBrand").val();
    let years = $("#txtPartYears").val();
    let fileName = $("#hdnFileName").val();
    let imageContentType = $("#hdnFileContentType").val();
    // if (!name || !brandId) {
    //     alert("Նշեք անունը և մակնիշը");
    //     return;
    // }


    let newData = {
        name: name,
        carBrandId: brandId,
        carModelId: brandModelId,
        categoryId: categoryId,
        price: price,
        inStock: inStock,
        brand: partBrand,
        years: years,
        serial: serial,
        fileName: fileName,
        imageContentType: imageContentType
    };

    $.ajax({
        url: "/api/car-parts/"+partId,
        type: 'PUT',
        contentType: "application/json",
        data: JSON.stringify(newData),
        success: function (data) {
            hideNewPartModal();
        }
    });
}

function deletePart() {
    let partId = $("#hdnDeleteId").val();

    $.ajax({
        url: "/api/car-parts/" + partId,
        type: 'DELETE',
        success: function (result) {
            $("#tr_" + partId).remove();
            closeDeleteModal();
        }
    });
}


function uploadImage() {
    var fd = new FormData;
    fd.append('file', $("#inputImg").prop('files')[0]);

    $.ajax({
        url: '/api/upload',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            $("#hdnFileName").val(data.fileName);
            $("#hdnFileContentType").val(data.contentType);
            $("#imgPreview").prop("src", data.path);
        }
    });
}

var Categories;
function fill_DDCategory() {
    $.get("/api/part-categories", function (data, status, xhr) {
        if (status == 'success') {
            Categories = data;
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

var Models;
function fill_DDModel() {
    let brandId = $("#ddlBrands").val();
    let url = "/api/car-models/" + brandId;
    $.get(url, function (data, status, xhr) {
        if (status == 'success') {
            Models = data;
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