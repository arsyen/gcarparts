var Brands;
function fill_BrandsTable() {
    $.get("/api/car-brands", function (data, status, xhr) {
        if (status == 'success') {
            var tblBrands = $("#tblBrands");
            let i=0;
            Brands=data;
            $(data).each(function () {
                i++;
                var option = $(generateBrandsRow(this._id,this.name,i));
                tblBrands.append(option);
            });
        }
    });
}

function openNewBrandModal() {
    $("#myModal").modal('show');
}
function hideNewBrandModal() {
    $("#myModal").modal('hide');
}
function openDeleteModal(id) {
    $("#hdnDeleteId").val(id);
    $("#deleteModal").modal('show');
}
function closeDeleteModal() {
    $("#hdnDeleteId").val("");
    $("#deleteModal").modal('hide');
}
function openEditModal(id) {
    var brand = Brands.find(function(element) {
        return element._id === id;
    });

    $("#txtEditBrandName").val(brand.name);
    $("#hdnEditId").val(id);
    $("#editModal").modal('show');
}
function closeEditModal() {
    $("#hdnEditId").val("");
    $("#editModal").modal('hide');
}

function generateBrandsRow(id, name, i){
    let str = `<tr id='${"tr_"+id}'>
    <th scope="col">${i}</th>
    <td>${name}</td>
    <td>
            <button class="btn btn-outline-primary" onClick="openEditModal('${id}')">Փոփոխել</button>
            <button class="btn btn-secondary" onClick="openDeleteModal('${id}')">Ջնջել</button>
    </td>
    </tr>`;

    return str;
}

function addNewBrand() {
    let name = $("#txtNewBrandName").val();

    if(!name)
    {
        alert("Նշեք անունը");
    }

    $.post(
        "/api/car-brands",
        { name:name },
        function (data) {
            console.log("sdsadsad");
            var tblBrands = $("#tblBrands");

            var option = $(generateBrandsRow(data._id,name, ""));
            tblBrands.append(option);
            hideNewBrandModal();
        });
}

function updateBrand() {
    let name = $("#txtEditBrandName").val();
    let modelId = $("#hdnEditId").val();

    if(!name)
    {
        alert("Նշեք անունը և մակնիշը");
        return;
    }
    
    $.ajax({
        url: "/api/car-brands/"+modelId,
        type: 'PUT',
        contentType: "application/json",
        data: JSON.stringify( { 
            name:name
        }),
        success: function(result) {
            closeEditModal();
        }
    });
}

function deleteBrand() {
    let brandId = $("#hdnDeleteId").val();

    $.ajax({
        url: "/api/car-brands/"+brandId,
        type: 'DELETE',
        success: function(result) {
            $("#tr_"+brandId).remove();            
            closeDeleteModal();
        }
    });
}

fill_BrandsTable();