import { useWsStore } from "../store";
import { CONNECTION_URL } from "../constants";
import { convertData } from "../utils";

export const useConnection = () => {
	const wsStore = useWsStore();

	const on_error = () => {
		alert(
			"Can not connect to WebSocket. Make sure the server is running and the uri is valid."
		);
	};

	const on_open = () => {
		wsStore.setConnected(true);
	};

	const on_close = () => {
		wsStore.setWs(null);
		wsStore.setConnected(false);
	};

	const on_message = (message) => {
		processMessage(message);
	};

	if (wsStore.connected) {
		return;
	}

	try {
		const ws = new WebSocket(CONNECTION_URL);

		ws.onerror = on_error;
		ws.onclose = on_close;
		ws.onmessage = on_message;
		ws.onopen = on_open;

		wsStore.setWs(ws);
	} catch (e) {
		alert(e);
	}
};

export const updateParam = (nodeIndex, key, value) => {
	const wsStore = useWsStore();

	if (!wsStore.connected) {
		return;
	} else {
		console.log(true);
		wsStore.ws.send(
			JSON.stringify({
				type: "param_update",
				node_ind: nodeIndex,
				key,
				value: String(value),
			})
		);
	}
};

const processMessage = (message) => {
	const wsStore = useWsStore();

	if (!wsStore.gotInitial) {
		try {
			const data = convertData(message);

			wsStore.ws.send(
				JSON.stringify({
					type: "got_message",
				})
			);

			wsStore.setDagNodes(data.dag_nodes);
			wsStore.setGotInitial(true);
		} catch (e) {
			alert("Can not parse dag nodes");
		}
	} else {
		const data = convertData(message);

		if (data.type === "completed") {
			wsStore.setDageNodesOutput(data.results, data.node_ind);
		}
	}
};
