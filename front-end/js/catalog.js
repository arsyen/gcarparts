function fill_DDBrand() {
    $.get("/api/car-brands", function (data, status, xhr) {
        if (status == 'success') {
            var ddlBrands = $("#ddBrands");
            $(data).each(function () {
                var option = $("<option />");
                option.html(this.name);
                option.val(this._id);
                ddlBrands.append(option);
            });
        }
    });
}

function fill_DDCategories() {
    $.get("/api/part-categories", function (data, status, xhr) {
        if (status == 'success') {
            var ddlBrands = $("#ddCategories");
            $(data).each(function () {
                var option = $("<option />");
                option.html(this.name);
                option.val(this._id);
                ddlBrands.append(option);
            });
        }
    });
}

function fill_DDYears() {
    let currentYear = new Date().getUTCFullYear();
    let ddYearStart = $("#ddYearStart");
    let ddYearEnd = $("#ddYearEnd");
    for (let i = 1970; i < currentYear; i++) {
        var option1 = $("<option />");
        option1.html(i);
        option1.val(i);
        ddYearStart.append(option1);
    }
}

function brandSelected(element, event) {
    let selectedBrand = event.target.value;
    if (selectedBrand && selectedBrand != 'all') {
        $.get("/api/car-models/" + selectedBrand, function (data, status, xhr) {
            if (status == 'success') {
                var ddModels = $("#ddModels");
                ddModels.empty();
                //Add empty values
                var option = $("<option />");
                option.html("Բոլորը");
                option.val("all");
                ddModels.append(option);

                $(data).each(function () {
                    var option = $("<option />");
                    option.html(this.name);
                    option.val(this._id);
                    ddModels.append(option);
                });
            }
        });
    }
    else {
        var ddModels = $("#ddModels");
        ddModels.empty();
        var option = $("<option />");
        option.html("Բոլորը");
        option.val("all");
        ddModels.append(option);
    }
}

function ValueForDDLDefault(val) {
    if (val == 'all')
        return '';
    else
        return val
}

function searchParts() {

    var modelId = ValueForDDLDefault($("#ddModels").val());
    var brandId = ValueForDDLDefault($("#ddBrands").val());
    var year = ValueForDDLDefault($("#ddYearStart").val());
    var categoryId = ValueForDDLDefault($("#ddCategories").val());

    let query = `/api/car-parts?a=0&cbid=${brandId}&cid=${categoryId}&mid=${modelId}&year=${year}`;

    $.get(query, function (data, status, xhr) {
        if (status == 'success') {
            var list = $("#partsListRow");
            list.empty();
            $(data).each(function () {

                let itemTemplate = `<div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="./front-end/gear.png"
                        alt="">
            
                    <div class="card-body">
                        <p class="card-text">${this.brand} ${this.name}</p>
                        <p class="card-text">${this.carBrand} ${this.carModel}</p>
                        <p class="card-text">${this.description}</p>
                        <p class="card-text">${this.years}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">${(this.inStock ? "Առկա է" : "Առկա չէ")}</small>
                            <small class="text-muted">Գինը՝ ${this.price} դրամ</small>
                        </div>
                    </div>
                </div>
            </div>`;


                var option = $(itemTemplate);
                list.append(option);
            });
        }
    });

}

fill_DDBrand();
fill_DDCategories();
fill_DDYears();