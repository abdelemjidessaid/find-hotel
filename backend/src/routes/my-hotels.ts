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
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString('base64');
        let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);

        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises);
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

export default router;
