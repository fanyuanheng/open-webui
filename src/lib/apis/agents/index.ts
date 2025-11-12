const AGENT_REGISTRY_BASE_URL = 'http://localhost:8002';

export interface Agent {
	id: string;
	name: string;
	description?: string;
	icon?: string;
	dify_workflow_id: string;
	capabilities: string[];
	is_active: boolean;
	created_at: string;
	updated_at: string;
}

export interface AgentListResponse {
	agents: Agent[];
	total: number;
}

export const getAgents = async (activeOnly: boolean = false): Promise<AgentListResponse | null> => {
	let error = null;

	const res = await fetch(`${AGENT_REGISTRY_BASE_URL}/api/agents?active_only=${activeOnly}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			error = err.detail || err.message;
			console.error('Error fetching agents:', err);
			return null;
		});

	if (error) {
		console.error('Failed to fetch agents:', error);
		return null;
	}

	return res;
};

