<script lang="ts">
	import { getContext } from 'svelte';
	const i18n = getContext('i18n');

	import Modal from '$lib/components/common/Modal.svelte';
	import { getAgents, type Agent } from '$lib/apis/agents';
	import Spinner from '../common/Spinner.svelte';

	export let show = false;
	export let onClose = () => {};

	let agents: Agent[] = [];
	let loading = false;
	let error: string | null = null;

	const loadAgents = async () => {
		if (!show) return;

		loading = true;
		error = null;

		try {
			const response = await getAgents(false);
			if (response) {
				agents = response.agents;
			} else {
				error = 'Failed to load agents';
			}
		} catch (err) {
			console.error('Error loading agents:', err);
			error = 'Failed to load agents';
		} finally {
			loading = false;
		}
	};

	$: if (show) {
		loadAgents();
	}
</script>

<Modal size="xl" bind:show>
	<div class="py-3 dark:text-gray-300 text-gray-700">
		<div class="px-4 pb-1.5">
			<h2 class="text-lg font-semibold dark:text-gray-200 text-gray-800">{$i18n.t('Agent Library')}</h2>
		</div>

		<div class="flex px-4 pb-1">
			<div class="flex flex-col overflow-y-auto h-96 md:h-[40rem] max-h-full scrollbar-hidden w-full flex-1 pr-2">
				{#if loading}
					<div class="w-full h-full flex justify-center items-center py-8">
						<div class="flex flex-col items-center gap-2">
							<Spinner className="size-5" />
							<div class="text-xs text-gray-500 dark:text-gray-400">{$i18n.t('Loading...')}</div>
						</div>
					</div>
				{:else if error}
					<div class="w-full flex justify-center items-center py-8">
						<div class="text-sm text-red-500 dark:text-red-400">{error}</div>
					</div>
				{:else if agents.length === 0}
					<div class="text-xs text-gray-500 dark:text-gray-400 text-center px-5 py-4">
						{$i18n.t('No agents found')}
					</div>
				{:else}
					<div class="w-full text-xs text-gray-500 dark:text-gray-500 font-medium pb-2 px-2">
						{$i18n.t('Agents')} ({agents.length})
					</div>

					{#each agents as agent (agent.id)}
						<button
							class="w-full flex items-start rounded-xl text-sm py-3 px-3 hover:bg-gray-50 dark:hover:bg-gray-850 transition {!agent.is_active
								? 'opacity-60'
								: ''}"
							draggable="false"
						>
							{#if agent.icon}
								<div class="pr-3 flex-shrink-0">
									<div class="text-2xl">{agent.icon}</div>
								</div>
							{/if}
							<div class="flex-1 text-left min-w-0">
								<div class="font-medium text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-2">
									{agent.name}
									{#if !agent.is_active}
										<span
											class="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
										>
											{$i18n.t('Inactive')}
										</span>
									{/if}
								</div>
								{#if agent.description}
									<div class="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
										{agent.description}
									</div>
								{/if}
								{#if agent.capabilities && agent.capabilities.length > 0}
									<div class="flex flex-wrap gap-1 mt-2">
										{#each agent.capabilities as capability}
											<span
												class="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
											>
												{capability}
											</span>
										{/each}
									</div>
								{/if}
							</div>
						</button>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</Modal>

