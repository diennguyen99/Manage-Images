const cloudinary = require('cloudinary').v2;

cloudinary.config({
    api_key: '836328979593922',
    api_secret: '2u-ouZfuapJWqCw_WRSELznRiGo',
    cloud_name: 'oosd-group04'
});

module.exports = { cloudinary };