var Brands;
function fill_DDBrand() {
    $.get("/api/car-brands", function (data, status, xhr) {
        if (status == 'success') {
            Brands=data;
            var ddlBrands = $("#ddlBrands");
            var ddlEditBrands = $("#ddlEditBrands");
            $(data).each(function () {
                var option = $("<option />");
                option.html(this.name);
                option.val(this._id);
                ddlBrands.append(option);

                //Fill edit modal
                var option = $("<option />");
                option.html(this.name);
                option.val(this._id);
                ddlEditBrands.append(option);
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
function openDeleteModal(id) {
    $("#hdnDeleteId").val(id);
    $("#deleteModal").modal('show');
}
function closeDeleteModal() {
    $("#hdnDeleteId").val("");
    $("#deleteModal").modal('hide');
}
function openEditModal(id) {
    var model = Models.find(function(element) {
        return element._id === id;
    });

    
    $("#ddlEditBrands").val(model.brandId);
    $("#txtEditModelName").val(model.name);
    $("#hdnEditId").val(id);
    $("#editModal").modal('show');
}
function closeEditModal() {
    $("#hdnEditId").val("");
    $("#editModal").modal('hide');
}


var Models;
function fill_ModelsTable() {
    $.get("/api/car-models", function (data, status, xhr) {
        if (status == 'success') {
            Models=data;
            var tblBrands = $("#tblModels");
            let i=0;
            $(data).each(function () {
                i++;
                var option = $(generateModelsRow(this._id,this.name, this.brandName,i));
                tblBrands.append(option);
            });
        }
    });
}

function generateModelsRow(id, name,brandName,i){
    let str = `<tr id='${"tr_"+id}'>
    <th scope="col">${i}</th>
    <td>${brandName}</td>
    <td>${name}</td>
    <td>
        <button class="btn btn-outline-primary" onClick="openEditModal('${id}')">Փոփոխել</button>
        <button class="btn btn-secondary" onClick="openDeleteModal('${id}')">Ջնջել</button>
    </td>
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
    
    $.post(
        "/api/car-models",
        { 
            name:name,
            brandId:brandId
        },
        function (data) {
            var tblBrands = $("#tblModels");

            var option = $(generateModelsRow(data._id, data.name, data.brandName, ""));
            tblBrands.append(option);
            hideNewModelModal();

        });
}

function updateModel() {
    let name = $("#txtEditModelName").val();
    let brandId = $("#ddlEditBrands").val();
    let modelId = $("#hdnEditId ").val();

    if(!name || !brandId)
    {
        alert("Նշեք անունը և մակնիշը");
        return;
    }
    
    console.log("updating");
    console.log({ 
        name:name,
        brandId:brandId
    });
    $.ajax({
        url: "/api/car-models/"+modelId,
        type: 'PUT',
        contentType: "application/json",
        data: JSON.stringify( { 
            name:name,
            brandId:brandId
        }),
        success: function(result) {
            closeEditModal();
        }
    });
}

function deleteModel() {
    let modelId = $("#hdnDeleteId").val();

    $.ajax({
        url: "/api/car-models/"+modelId,
        type: 'DELETE',
        success: function(result) {
            $("#tr_"+modelId).remove();            
            closeDeleteModal();
        }
    });
}


fill_DDBrand();
fill_ModelsTable();