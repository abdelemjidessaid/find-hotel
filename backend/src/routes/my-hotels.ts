import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel from '../models/hotel';
import { HotelType } from '../shared/types';
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

/**
 * Function that uploads image files to the cloudinary.
 * @param imageFiles array of image files.
 * @returns array of the uploaded image urls.
 */
async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString('base64');
    let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);

    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

/**
 * POST api/my-hotels
 */
router.post(
  '/',
  verifyToken,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Hotel type is required'),
    body('pricePerNight')
      .notEmpty()
      .isNumeric()
      .withMessage('Price per night is required and must be a number'),
    body('facilities')
      .notEmpty()
      .isArray()
      .withMessage('Facilities are required'),
  ],
  upload.array('imageFiles', 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // upload the images to the cloudnary
      const imageUrls = await uploadImages(imageFiles);
      // update the image array
      newHotel.imageUrls = imageUrls;
      // update the last update variable
      newHotel.lastUpdated = new Date();
      // update the user id
      newHotel.userId = req.userId;
      // save the hotel to the database
      const hotel = new Hotel(newHotel);
      await hotel.save();

      // return the success response
      return res.status(201).send(hotel);
    } catch (error) {
      console.log('Error while creating hotel:', error);
      res
        .status(500)
        .json({ message: 'Something went wrong while creating new hotel!' });
    }
  }
);

/**
 * GET api/my-hotels
 */
router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    // fetch the hotels of the current user
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels' });
  }
});

/**
 * GET api/:id
 */
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  // extract the from request
  const id = req.params.id.toString();

  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });

    res.json(hotel);
  } catch (error) {
    // handle the error
    res.status(500).json({ message: 'Error fetching hotels!' });
  }
});

/**
 * Function that updates the hotel
 */
router.put(
  '/:hotelId',
  verifyToken,
  upload.array('imageFiles'),
  async (req: Request, res: Response) => {
    try {
      // update the hotel
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];

      await hotel.save();
      res.status(201).json(hotel);
    } catch (error) {
      res.status(500).json({ message: 'Somthing went wrong!' });
    }
  }
);

export default router;
