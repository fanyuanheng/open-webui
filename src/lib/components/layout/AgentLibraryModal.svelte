<script lang="ts">
	import { getContext } from 'svelte';
	const i18n = getContext('i18n');

	import Modal from '$lib/components/common/Modal.svelte';

	export let show = false;
	export let onClose = () => {};
</script>

<Modal size="xl" bind:show>
	<div class="py-3 dark:text-gray-300 text-gray-700">
		<div class="px-4 pb-1.5">
			<h2 class="text-lg font-semibold dark:text-gray-200 text-gray-800">{$i18n.t('Agent Library')}</h2>
		</div>

		<div class="flex px-4 pb-1">
			<div class="flex flex-col overflow-y-auto h-96 md:h-[40rem] max-h-full scrollbar-hidden w-full flex-1 pr-2">
				<!-- Content will be added here -->
			</div>
		</div>
	</div>
</Modal>

