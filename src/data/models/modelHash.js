import AgencyModel from './agency';
import CalendarDateModel from './calendar_dates';
import CalendarModel from './calendar';
import RouteModel from './routes';
import ShapeModel from './shapes';
import StopTimeModel from './stop_times';
import StopModel from './stops';
import TripModel from './trips';

const modelHash = {};
modelHash['agency.txt'] = AgencyModel;
modelHash['calendar_dates.txt'] = CalendarDateModel;
modelHash['calendar.txt'] = CalendarModel;
modelHash['routes.txt'] = RouteModel;
modelHash['shapes.txt'] = ShapeModel;
modelHash['stops.txt'] = StopModel;
modelHash['stop_times.txt'] = StopTimeModel;
modelHash['trips.txt'] = TripModel;

export default modelHash;
