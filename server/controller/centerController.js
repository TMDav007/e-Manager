
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Model from './../models';
import messageStatus from './../middleware/middlewareFunction';

const { Center } = Model;

/**
 *  it is a class that control all center methods
 */
class centerController {
/**
 * it create a new center
 * @param {string} req
 * @param {string} res
 * @returns {object} a new center
 */
  static addCenter(req, res) {
    Center.findOne({ where: { centerName: req.body.centerName } })
      .then((center) => {
        if (center) {
          return messageStatus(409, 'center name already existing', res);
        }
        Center.create({
          centerName: req.body.centerName,
          price: req.body.price,
          location: req.body.location,
          image: req.body.image,
        })
          .then((centerCreated) => {
            if (!centerCreated) {
              return messageStatus(500, 'server error. center not created', res);
            }
            return res.status(200).send({ message: 'center created', center });
          }).catch(() => res.status(400).send());
      });
  }

  /**
 * it get a center
 * @param {string} req
 * @param {string} res
 * @returns {object} a center
 */
  static getCenter(req, res) {
    jwt.verify(req.headers['x-access-token'], 'secretKey');
    return Center.findById(req.params.id)
      .then((center) => {
        if (!center) {
          return messageStatus(404, 'center not found', res);
        }
        return res.status(200).json({ message: 'success', center });
      });
  }


  /**
 * it GET all centers
 * @param {string} req
 * @param {string} res
 * @returns {object} a center
 */
  static getAllCenter(req, res) {
    jwt.verify(req.headers['x-access-token'], 'secretKey');
    return Center.findAll()
      .then((centers) => {
        if (!centers) {
          return messageStatus(500, 'unable to get all center, try again', res);
        }
        return res.status(200).send({ message: 'success', centers });
      });
  }

  /**
   * it Update a center
   * @param {string} req
   * @param {string} res
   * @returns {object} PUT(update) center
   */
  static updateCenter(req, res) {
    Center.findOne({ where: { centerName: req.params.centerName } })
      .then((center) => {
        if (!center) {
          return messageStatus(404, 'center not found', res);
        }
        Center.update({
          centerName: req.body.centerName || center.centerName,
          price: req.body.price || center.price,
          location: req.body.location || center.location,
          image: req.body.image || center.image,
        }, {
          where: {
            centerName: req.params.centerName,
          },
        }).then((updatedCenter) => {
          if (!updatedCenter) {
            return messageStatus(500, 'center could not be updated, try again', res);
          }
          return res.status(200).json({ message: 'success' });
        });
      });
  }

  /**
 * it DELETE all a center
 * @param {string} req
 * @param {string} res
 * @returns {object} delete a center
 */
  static removeCenter(req, res) {
    Center.findOne({ where: { centerName: req.params.centerName } })
      .then((centers) => {
        if (!centers) {
          return messageStatus(404, 'center not found', res);
        }
        Center.destroy({
          where: {
            centerName: req.params.centerName,
          }
        })
          .then((deletedcenters) => {
            if (!deletedcenters) {
              return messageStatus(500, 'center unable to delete, try again', res);
            }
            return res.status(200).json({ message: 'center deleted' });
          });
      });
  }
}


export default centerController;
