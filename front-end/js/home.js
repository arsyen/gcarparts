
function fill_DDBrand() {
    $.get("/api/car-brands", function (data, status, xhr) {
        if (status == 'success') {
            var ddlBrands = $("#ddBrands");
            $(data).each(function () {
                let html = `
                <a class="dropdown-item" href="../catalog?bid=${this._id}">${this.name}</a>
                <div class="dropdown-divider"></div>
                `;

                var element = $(html);
                ddlBrands.append(element);
            });
        }
    });
}
fill_DDBrand();

function searchBySerial() {
    let sn = $("#txtSerial").val();
    if (sn)
        window.location = `../catalog?sn=${sn}`;
}