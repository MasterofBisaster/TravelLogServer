import TripCtrl from "../controllers/trip";
import POICtrl from "../controllers/poi";
module.exports = function(router, jwtAuth, isOwner, isAdminOrOwner) {
  const tripCtrl = new TripCtrl();
  const poiCtrl = new POICtrl();
  /**
   *
   *
   * @swagger
   * components:
   *   schemas:
   *     AbstractTrip:
   *       type: object
   *       properties:
   *         name:
   *           type: string
   *           description: The name of the trip.
   *           example: Tahiti
   *         description:
   *           type: string
   *           description: Details of the trip.
   *           example: BobMcDonald@travellog.com
   *         begin:
   *           type: date
   *           description: Start date of the trip.
   *           example:
   *         end:
   *           type: date
   *           description: End date of the trip.
   *           example:
   *         createdAt:
   *           type: date
   *           description: Creation date of the trip.
   *           example:
   *         creator:
   *           type: string
   *           description: The creator of the trip.
   *           example:
   *         pois:
   *           type: string
   *           description: The user's provider.
   *           example:
   *     NewUser:
   *       allOf:
   *         - $ref: '#/components/schemas/AbstractUser'
   *         - type: object
   *           properties:
   *             password:
   *               type: string
   *               description: The user's password.
   *               example: verysecret
   *     DBUser:
   *       allOf:
   *         - $ref: '#/components/schemas/AbstractUser'
   *         - $ref: '#/components/schemas/DBObject'
   *
   */

  /**
   * @swagger
   * /trips:
   *   post:
   *     summary: Add an trip to TravelLog.
   *     description:  Add an trip to TravelLog.
   *     tags:
   *       - Trips
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewTrip'
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: The created Trip.
   *         content:
   *           application/json:
   *             schema:
   *                 $ref: '#/components/schemas/DBTrip'
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips').post(jwtAuth, tripCtrl.setCreator, tripCtrl.insert, tripCtrl.show); //1
  /**
   * @swagger
   * /trips:
   *   get:
   *     summary: Retrieve a paginated list of TravelLog trips.
   *     description: Retrieve a paginated list of trips from TravelLog.
   *     tags:
   *       - Trips
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: A list of trips.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/DBTrip'
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips').get(jwtAuth, tripCtrl.paginate); //2
  /**
   * @swagger
   * /trips/mine:
   *   get:
   *     summary: Retrieve my list of TravelLog trips.
   *     description: Retrieve my list of trips from TravelLog.
   *     tags:
   *       - Trips
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: A list of my trips.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/DBTrip'
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips/mine').get(jwtAuth, tripCtrl.getOwnList); //3
  /**
   * @swagger
   * /trips/count:
   *   get:
   *     summary: Retrieve amount of TravelLog trips.
   *     description: Retrieve amount of trips from TravelLog.
   *     tags:
   *       - Trips
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: Amount of trips.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/DBTrip'
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips/count').get(jwtAuth, tripCtrl.count); //4
  /**
   * @swagger
   * /trips/{id}/addPOI:
   *   post:
   *     summary: Add a POI to a trip to TravelLog.
   *     description:  Add a POI to a trip to TravelLog.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: String ID of the POI to add.
   *         schema:
   *           type: string
   *     tags:
   *       - Trips
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewTrip'
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: The trip with a newly added POI.
   *         content:
   *           application/json:
   *             schema:
   *                 $ref: '#/components/schemas/DBTrip'
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips/:tripId/addPOI').post(jwtAuth, isOwner, poiCtrl.setCreatorAndLocType, poiCtrl.insert, tripCtrl.addPoi, tripCtrl.show); //5
  /**
   * @swagger
   * /trips/{id}:
   *   put:
   *     summary: Update a trip.
   *     description: Update a trip.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: String ID of the trip to update.
   *         schema:
   *           type: string
   *     tags:
   *       - Trips
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: An updated trip.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/DBTrip'
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips/:tripId').put(jwtAuth, isOwner, tripCtrl.setCreator, tripCtrl.update, tripCtrl.show); //6
  /**
   * @swagger
   * /trips/{id}:
   *   get:
   *     summary: Show details of trip.
   *     description: Show details of trip.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: String ID of the trip to show.
   *         schema:
   *           type: string
   *     tags:
   *       - Trips
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: Detailed trip.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/DBTrip'
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips/:tripId').get(jwtAuth, tripCtrl.show); //7
  /**
   * @swagger
   * /trips/{tripId}/{poiId}:
   *   delete:
   *     summary: Delete a POI from a Trip.
   *     description:  Delete a POI from a Trip.
   *     parameters:
   *       - in: path
   *         name: tripId
   *         required: true
   *         description: String ID of the trip to update.
   *         schema:
   *           type: string
   *       - in: path
   *         name: poiId
   *         required: true
   *         description: String ID of the POI to delete.
   *         schema:
   *           type: string
   *     tags:
   *       - Trips
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: POI successfully deleted
   *       500:
   *         description: POI not found
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips/:tripId/:poiId').delete(jwtAuth, isOwner, tripCtrl.removePoi,  tripCtrl.show); //8
  /**
   * @swagger
   * /trips/{tripId}:
   *   delete:
   *     summary: Delete  a Trip.
   *     description:  Delete a Trip.
   *     parameters:
   *       - in: path
   *         name: tripId
   *         required: true
   *         description: String ID of the trip to delete.
   *         schema:
   *           type: string
   *     tags:
   *       - Trips
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: Trip successfully deleted
   *       500:
   *         description: Trip not found
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips/:tripId').delete(jwtAuth, isAdminOrOwner, poiCtrl.removeTripPois, tripCtrl.delete); //9


  router.param('tripId', tripCtrl.load); //10
  router.param('poiId', poiCtrl.load);
}


