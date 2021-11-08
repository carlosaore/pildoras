import { useQuery } from "react-query";
import axios from "./axios";
import {useState} from "react";
import Pildora from "./Pildora";




const App = () => {
	const [currentUserId, setCurrentUserId] = useState("6155f408dbfb75b08c2106f1");

	const { isLoading, error, data} = useQuery(
		// query key: an array with a name and a variable used in the endpoint
		["client bookings", currentUserId],
		// note that we are importing an axios instance with base URL so we only need to change the endpoint
		() => axios.get(`/user/bookings/${currentUserId}`),
		{
			enabled: true, // this stops the query from running automatically
		}
	);

	return (
		<div className="App">
			<h1>Pildoras</h1>
			{isLoading
				? <p>Loading...</p>
				: error
					? <p>Error: {error.message}</p>
					: data.data.map(booking => (
						<Pildora key={booking._id} {...booking} />
                    ))
			}
		</div>
	);
}

export default App;