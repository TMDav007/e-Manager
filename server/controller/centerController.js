
import center from './../model/centerModel';
import controlFunction from './controllerFunctions';

/**
 *  it is a class that control all center methods
 */
class centerController {
/**
 * it GET all centers
 * @param {string} req
 * @param {string} res
 * @returns {object} all centers
 */
  static getAllCenters(req, res) {
    return controlFunction.getAll(center, req, res);
  }

  /**
 * it ADD a center
 * @param {string} req
 * @param {string} res
 * @returns {object} add a center
 */
  static addCenter(req, res) {
    // check if the id is not existing
    controlFunction.add(center, req, res);
  }

  /**
 * it PUT a center
 * @param {string} req
 * @param {string} res
 * @returns {object} update(put) centers
 */
  static updateCenter(req, res) {
    controlFunction.update(center, req, res);
  }

  /**
 * it DELETE all a center
 * @param {string} req
 * @param {string} res
 * @returns {object} delete a center
 */
  static removeCenter(req, res) {
    controlFunction.remove(center, req, res);
  }

  /**
 * it GET a center
 * @param {string} req
 * @param {string} res
 * @returns {object} a center
 */
  static getCenter(req, res) {
    controlFunction.getOne(center, req, res);
  }
}


export default centerController;
