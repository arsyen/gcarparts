const PartImage = require('../../mongoose-models/PartImage');
const mongo = require('mongodb');

const getImageById = async (req, res) => {
    try {
        let imageId = req.params.imageId;
        let image = await PartImage.findOne({ _id: new mongo.ObjectID(imageId) });

        if (image) {
            res.contentType(image.img.contentType);
            return res.send(image.img.data);
        }
        else {
            return res.status(404).send({});
        }
    }
    catch (ex) {
        console.log(ex);
        return res.status(500).send({});
    }
};

module.exports = getImageById;
