import modelHash from '../data/models/modelHash';
import AgencyKeyMapper from '../util/AgencyKeyMapper.json';

const transportTypeController = async (req, res) => {
  const { agency } = req.query;
  const MongoModel = modelHash['routes.txt'].model;
  const transportMapping = {
    0: 'Tram, Streetcar, Light rail',
    1: 'Subway, Metro',
    2: 'Rail',
    3: 'Bus',
    4: 'Ferry',
    5: 'Cable car',
    6: 'Gondala, Suspended cable car',
    7: 'Funicular',
  };
  MongoModel.find({ agency_key: AgencyKeyMapper[agency.toLowerCase()] }, (err, docs) => {
    if (err) {
      console.error(err);
      res.status(500).send('DB Error');
    } else {
      const numberOfRoutes = docs.length;
      const transportTypes = {};
      docs.forEach((doc) => {
        const docData = doc._doc;
        if (Object.prototype.hasOwnProperty.call(docData, 'route_type')) {
          if (Object.prototype.hasOwnProperty.call(transportTypes, doc.route_type)) {
            const currentCount = transportTypes[doc.route_type];
            transportTypes[doc.route_type] = currentCount + 1;
          } else {
            transportTypes[doc.route_type] = 0;
          }
        }
      });
      const mostPopularTransport = { count: 0, transport: 0 };
      Object.keys(transportTypes).forEach((transport) => {
        if (transportTypes[transport] > mostPopularTransport.count) {
          mostPopularTransport.transport = transport;
          mostPopularTransport.count = transportTypes[transport];
        }
      });
      res.status(200).send({
        agency,
        transportType: transportMapping[mostPopularTransport.transport],
        percentage: Math.round((mostPopularTransport.count / numberOfRoutes) * 100) / 100,
      });
    }
  });
};

export default transportTypeController;
