 const fs = require("fs");

 const fileUploadHandler = async (req, res) => {

    let extension = req.file.originalname.substr(req.file.originalname.lastIndexOf('.'));
    let nameWithExtension=`${req.file.filename}${extension}`;
    fs.renameSync(`./uploads/${req.file.filename}`,`./uploads/${nameWithExtension}`);

    return res.status(200).send({
        path:"../uploads/"+nameWithExtension,
        fileName:nameWithExtension,
        contentType:req.file.mimetype
    });
};

module.exports = fileUploadHandler;