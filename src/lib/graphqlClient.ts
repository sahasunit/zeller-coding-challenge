import awsconfig from '../../aws-exports';

type graphQLRequest = {
    query: string;
    variables?: Record<string, unknown>;
}

export const graphqlRequest = async ({ query, variables }: graphQLRequest) => {

    const endpoint = awsconfig.aws_appsync_graphqlEndpoint;
    const apiKey = awsconfig.aws_appsync_apiKey;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`GraphQL HTTP ${response.status} ${response.statusText}: ${text}`);
    }

    const responseBody = await response.json();

    if (responseBody.errors) {
        console.error('GraphQL errors:', responseBody.errors);
        throw new Error('GraphQL request failed');
    }

    return responseBody.data;
};