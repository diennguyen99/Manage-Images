var fs = require('fs');
const express = require('express');
const { v4: uuidv4 } = require('uuid')
const cors = require('cors');

const { cloudinary } = require('./utils/cloudinary');

const app = express();
const PORT = 9000;

var imageList;

const data = fs.readFileSync(`${__dirname}/../data.json`, 'utf-8');
imageList = JSON.parse(data).sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.get('/api/images', (req, res) => res.send(imageList));

app.post('/api/upload', async (req, res) => {
    try {
        const {name, base64Image} = req.body;

        const imageUrl = await cloudinary.uploader.upload(base64Image, {
            folder: 'TMDT'
        });

        imageList.push({
            id: uuidv4(),
            name,
            imageUrl: imageUrl.secure_url,
            publicId: imageUrl.public_id,
            createdAt: imageUrl.created_at
        })

        fs.writeFileSync(`${__dirname}/../data.json`, JSON.stringify(imageList));

        res.status(201).json({ msg: 'Upload Image Success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Fail!' })
    }
})

app.delete('/api/images/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const objImgDelete = imageList.find(obj => obj.id === id);

        if (objImgDelete === undefined){
            return res.status(404).json({ msg: 'Not Image' });
        }

        await cloudinary.uploader.destroy(objImgDelete.publicId, {
            resource_type: "image"
        });

        imageList = imageList.filter((obj) => {
            return obj.id !== id
        })

        fs.writeFileSync(`${__dirname}/../data.json`, JSON.stringify(imageList));

        res.status(204).json({ msg: 'Delete Image Success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Fail!' })
    }
})

app.listen(PORT, () => console.log(`[app]: http://localhost:${PORT}`))