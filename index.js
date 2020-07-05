const core = require('@actions/core');
const github = require('@actions/github');

const run = async () => {
	try {
		const context = github.context;
		if (context.eventName !== 'pull_request') {
			throw new Error('Auto assign author can only be run in pull_request context');
		}

		const owner = context.payload.pull_request.user.login;
		const ownerIsAssigned = context.payload.pull_request.assignees.some(
			assignee => assignee.login === owner
		);

		if (ownerIsAssigned) {
			core.info('Author already assigned');
			return;
		}

		const token = core.getInput('github-token');
		const octokit = new github.getOctokit(token);
		const issue_number = context.payload.pull_request.number;

		await octokit.issues.addAssignees({
			...context.repo,
			issue_number,
			assignees: [owner]
		});
	} catch (error) {
		core.setFailed(error.message);
	}
};

run();
