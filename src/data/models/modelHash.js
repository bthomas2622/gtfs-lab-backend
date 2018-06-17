import AgencyModel from './agency';
import CalendarDateModel from './calendar_dates';
import CalendarModel from './calendar';
import RouteModel from './routes';
import ShapeModel from './shapes';
import StopTimeModel from './stop_times';
import StopModel from './stops';
import TripModel from './trips';

const modelHash = {};
modelHash['agency.txt'] = { model: AgencyModel, docName: 'agencies' };
modelHash['calendar_dates.txt'] = { model: CalendarDateModel, docName: 'calendardates' };
modelHash['calendar.txt'] = { model: CalendarModel, docName: 'calendars' };
modelHash['routes.txt'] = { model: RouteModel, docName: 'routes' };
modelHash['shapes.txt'] = { model: ShapeModel, docName: 'shapes' };
modelHash['stops.txt'] = { model: StopModel, docName: 'stops' };
modelHash['stop_times.txt'] = { model: StopTimeModel, docName: 'stoptimes' };
modelHash['trips.txt'] = { model: TripModel, docName: 'trips' };

export default modelHash;
