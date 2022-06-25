<script setup>
import { reactive, watchEffect, watch, computed } from "vue";
import { updateParam } from "../connection";
import { useWsStore } from "../store";

import Table from "../components/Table.vue";
import { faker } from "@faker-js/faker";

import { genNumberWithRange } from "../utils";

const wsStore = useWsStore();

const initialSettings = computed(() => {
	if (wsStore.gotInitial && wsStore.dagNodes[0].input_params) {
		return {
			numTrades: wsStore.dagNodes[0].input_params.NumTrades,
			valDate: wsStore.dagNodes[0].input_params.ValDate,
			print_comments: wsStore.dagNodes[0].input_params.print_comments,
		};
	} else {
		return {
			numTrades: 0,
			valDate: 0,
			print_comments: 0,
		};
	}
});

const settings = reactive({
	numTrades: 0,
	valDate: 0,
	print_comments: 0,
});

watch([initialSettings], () => {
	console.log(true);

	settings.numTrades = initialSettings.value.numTrades;
	settings.valDate = initialSettings.value.valDate;
	settings.print_comments = initialSettings.value.print_comments;
});

const tableSchema = computed(() => {
	if (wsStore.gotInitial && wsStore.dagNodes[0].output_params.Trades) {
		const columnCount = wsStore.dagNodes[0].output_params.Trades.length;

		const columns = [];

		wsStore.dagNodes[0].output_params.Trades.forEach((trade) => {
			Object.keys(trade).forEach((key) => {
				const itemIndex = columns.findIndex(
					(i) => i.columnName === key
				);

				if (itemIndex === -1) {
					columns.push({
						columnName: key,
						values: [trade[key]],
					});
				} else {
					columns[itemIndex].values = [
						...columns[itemIndex].values,
						trade[key],
					];
				}
			});
		});

		return JSON.stringify({
			columns,
		});
	} else {
		return JSON.stringify({
			columns: [],
		});
	}
});

const onSubmit = (e, key) => {
	if (e.code === "Enter" && typeof settings[key] === "number") {
		let convertedKey;

		if (key === "numTrades") {
			convertedKey = "NumTrades";
		} else if (key === "valDate") {
			convertedKey = "ValDate";
		} else {
			convertedKey = key;
		}
		updateParam(0, convertedKey, settings[key]);
	}
};
</script>

<template>
	<div class="portfolio">
		<div class="portfolio__settings settings">
			<h2 class="settings__heading">Portfolio Settings</h2>
			<p class="settings__alert">
				Json vuer is not being used, because there some error with
				implementing the package with vue. We may need to choose another
				library.
			</p>

			<div class="settings__inner">
				<div class="settings__form">
					<label for="numtrades" class="settings__label">
						NumTrades
					</label>
					<input
						v-model="settings.numTrades"
						type="number"
						id="numtrades"
						@keydown="(e) => onSubmit(e, 'numTrades')"
					/>
				</div>
				<div class="settings__form">
					<label for="valdate" class="settings__label">
						ValDate
					</label>
					<input
						v-model="settings.valDate"
						type="number"
						id="valdate"
						@keydown="(e) => onSubmit(e, 'valDate')"
					/>
				</div>
				<div class="settings__form">
					<label for="print_comments" class="settings__label">
						print_comments
					</label>
					<input
						v-model="settings.print_comments"
						type="number"
						id="print_comments"
						@keydown="(e) => onSubmit(e, 'print_comments')"
					/>
				</div>
			</div>
		</div>
		<div class="portfolio__divider" />

		<Table :schema="tableSchema" />
	</div>
</template>

<style lang="scss">
.settings__heading {
	margin-bottom: 1.5rem;
}

.settings__alert {
	margin-bottom: 1rem;
}

.settings__inner {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.settings__form {
	display: flex;
	gap: 1rem;
	align-items: center;
}

.portfolio__divider {
	margin: 4rem 0;
	height: 0.05rem;
	background: #222;
}
</style>
