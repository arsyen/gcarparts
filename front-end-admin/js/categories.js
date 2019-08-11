function fill_CategoriesTable() {
    $.get("/api/part-categories", function (data, status, xhr) {
        if (status == 'success') {
            var tblBrands = $("#tblCategories");
            $(data).each(function () {

                var option = $(generateCategoriesRow(this._id,this.name));
                tblBrands.append(option);
            });
        }
    });
}

function generateCategoriesRow(id, name){
    let str = `<tr>
    <td>${name}</td>
    <td></td>
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

            var option = $(generateCategoriesRow(null,name));
            tblBrands.append(option);
            hideNewCategoryModal();

        }, "json");
}

function openNewCategoryModal() {
    $("#myModal").modal('show');
}
function hideNewCategoryModal() {
    $("#myModal").modal('hide');
}

fill_CategoriesTable();