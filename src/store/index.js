import { defineStore } from "pinia";

export const useWsStore = defineStore("wsstore", {
	state: () => {
		return {
			ws: null,
			connected: false,
			dagNodes: null,
			gotInitial: false,
		};
	},
	actions: {
		setWs(ws) {
			this.ws = ws;
		},
		setConnected(bool) {
			this.connected = bool;
		},
		setDagNodes(dagNodes) {
			this.dagNodes = dagNodes;
		},
		setDagNodesInput(params, nodeIndex) {
			this.dagNodes[nodeIndex].input_params = {
				...this.dagNodes[nodeIndex],
				...params,
			};
		},
		setDageNodesOutput(output, nodeIndex) {
			this.dagNodes[nodeIndex].output_params = output;
		},
		setGotInitial(bool) {
			this.gotInitial = bool;
		},
	},
});
