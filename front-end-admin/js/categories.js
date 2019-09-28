var Categories;
function fill_CategoriesTable() {
    $.get("/api/part-categories", function (data, status, xhr) {
        if (status == 'success') {
            Categories=data;
            let i=0;
            var tblBrands = $("#tblCategories");
            $(data).each(function () {
                i++;
                var option = $(generateCategoriesRow(this._id,this.name,i));
                tblBrands.append(option);
            });
        }
    });
}

function openNewCategoryModal() {
    $("#myModal").modal('show');
}
function hideNewCategoryModal() {
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
    var category = Categories.find(function(element) {
        return element._id === id;
    });

    $("#txtEditCategoryName").val(category.name);
    $("#hdnEditId").val(id);
    $("#editModal").modal('show');
}
function closeEditModal() {
    $("#hdnEditId").val("");
    $("#editModal").modal('hide');
}

function generateCategoriesRow(id, name, i){
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

function addNewCategory() {
    let name = $("#txtNewCategoryName").val();

    if(!name)
    {
        alert("Նշեք անունը");
        return;
    }
    
    console.log("posting");
    $.post(
        "/api/part-categories",
        { name:name },
        function (data) {
            console.log("sdsadsad");
            var tblBrands = $("#tblCategories");

            var option = $(generateCategoriesRow(data._id,name,""));
            tblBrands.append(option);
            hideNewCategoryModal();

        }, "json");
}

function updateCategory() {
    let name = $("#txtEditCategoryName").val();
    let categoryId = $("#hdnEditId").val();

    if(!name)
    {
        alert("Նշեք անունը և մակնիշը");
        return;
    }
    
    $.ajax({
        url: "/api/part-categories/"+categoryId,
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

function deleteCategory() {
    let categoryId = $("#hdnDeleteId").val();

    $.ajax({
        url: "/api/part-categories/"+categoryId,
        type: 'DELETE',
        success: function(result) {
            $("#tr_"+categoryId).remove();            
            closeDeleteModal();
        }
    });
}

fill_CategoriesTable();