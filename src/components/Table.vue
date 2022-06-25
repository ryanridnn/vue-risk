<script setup>
import { computed, toRef } from "vue";

import { defineProps } from "vue";

const props = defineProps({
	schema: String,
});

const jsonSchema = toRef(props, "schema");

const schema = computed(() => JSON.parse(jsonSchema.value));
const maxColumn = computed(() => {
	if (schema.value.columns.length === 0) {
		return 0;
	} else {
		return schema.value.columns.reduce((i, j, loop) => {
			if (i.values.length > j.values.length) {
				return i;
			} else {
				return j;
			}
		}).values.length;
	}
});
</script>

<template>
	<table>
		<tr>
			<th v-for="column in schema.columns" :key="column.columnName">
				{{ column.columnName }}
			</th>
		</tr>
		<tr v-for="(num, index) in Array.from({ length: maxColumn }).fill()">
			<td v-for="column in schema.columns" :key="column.values[index]">
				{{ column.values[index] }}
			</td>
		</tr>
	</table>
</template>

<style>
table {
	width: 100%;

	--orange: #ffba6a;
}

th {
	background: #2c2c2c;
	padding: 1rem 0;
	color: #eee;
	font-weight: 500;
}

td {
	background: var(--dark);
	padding: 0.5rem 1rem;
	color: var(--orange);
}
</style>
