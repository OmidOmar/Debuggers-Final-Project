import { useEffect, useState } from "react";

const EventsTable = ({ event }) => {
	const [events, setEvents] = useState(null);

	const token = localStorage.getItem("Token");


	useEffect(() => {
		fetch("/api/events")
			.then((res) => res.json())
			.then((data) => setEvents(data));
	}, []);

	const handleUpdate = (e) =>{
		const eventId = e.target.name;
		fetch(`/api/events/${eventId}`)
			.then((res) => res.json())
			.then((data) => event(data));
			handleSearch();
		};

	const handleSearch = (value) => {
		const url = !value
			? "/api/events"
			: `/api/events/search/${value}`;
		fetch(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setEvents(data));
	};
	return (
		<div>
			<div>
				<input
					type="text"
					onInput={(e) => handleSearch(e.target.value)}
					placeholder="Search...."
				/>
			</div>
			<table className="table">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Event ID#</th>
						<th scope="col">Title</th>
						<th scope="col">Description</th>
						<th scope="col">Edit</th>
						<th scope="col">Delete</th>
					</tr>
				</thead>
				<tbody>
					{events?.map((e, k) => {
						return (
							<tr key={k}>
								<th scope="row" key={k}>
									{e.id}
								</th>
								<td>{e.title}</td>
								<td>{e.description}</td>
								<td>
									<button
										name={e.id}
										onClick={handleUpdate}
										className="btn btn-warning"
									>
										Edit
									</button>
								</td>
								<td>
									<button name={e.id} className="btn btn-danger">
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default EventsTable;
