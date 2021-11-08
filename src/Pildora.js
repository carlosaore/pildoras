import { useQueries } from "react-query";
import axios from "./axios";

const Pildora = (props) => {

	// Beware: make sure that the queryKeys match other you already
	// have in the app to allow React Query to work share the same cache instead of
	// querying the server for the same data again.
	const data = useQueries([
		{ queryKey: ['center', props.center], queryFn: () => axios.get(`center/id/${props.center}`) },
		{ queryKey: ['employee', props.employee], queryFn: () => axios.get(`/employee/${props.employee}`) },
		{ queryKey: ['center bookings', props.center], queryFn: () => axios.get(`center/services/${props.center}`) },
	])

	console.log("props", props);

	console.log("center info", data[0].data?.data);

	console.log("employee info", data[1].data?.data);

	// props.service is an id and we don't have an endpoint to get the service with that, so we fetch all the services
	// and then we filter the one that matches the id
	// The result is still an array of one element so we need to get the first element
	console.log("service info", data[2].data?.data.filter(booking => booking._id === props.service)[0]) ;

	// Writing data.data.data etc. may be annoying, but try to refrain from re-saving that in a state just
	// to have a shorter name. It will make the app slower and more error prone because it will need to recalculate
	// on every render and recreate the state
	return (
		<section className="pildora">
			<p>{`Dia: ${new Date(props.startTime)}`}</p>
			<p>{`Center: ${data[0].data?.data?.name}`}</p>
			<p>{`Employee: ${data[1].data?.data || "Error: This employee id was not found in the DB"}`}</p>
			<p>{`Service: ${data[2].data?.data.filter(booking => booking._id === props.service)[0].name}`}</p>
		</section>
	)
};

export default Pildora;