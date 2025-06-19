const { app } = require('@azure/functions');
const { TableClient } = require("@azure/data-tables");

const connectionString = process.env.AzureWebJobsStorage;
const tableName = "BetaUsers";

const tableClient = TableClient.fromConnectionString(connectionString, tableName);

app.http('HttpTrigger1', {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    authLevel: 'function',
    route: 'users/{id?}', // This allows us to handle requests with or without an ID
    handler: async (request, context) => {
        console.log(`Http function processed request for url "${request.url}"`);
        context.log(`Http function processed request for url "${request.url}"`);

        const method = request.method;
        const id = request.params.id;

        try {
            switch (method) {
                case 'GET':
                    if (id) {
                        const user = await tableClient.getEntity("beta", id);
                        return { jsonBody: user };
                    } else {
                        const users = tableClient.listEntities();
                        const userArray = [];
                        for await (const user of users) {
                            userArray.push(user);
                        }
                        return { jsonBody: userArray };
                    }
                case 'POST':
                    const newUser = await request.json();
                    newUser.partitionKey = "beta";
                    newUser.rowKey = newUser.id || new Date().getTime().toString();
                    await tableClient.createEntity(newUser);
                    return { jsonBody: newUser };
                case 'PUT':
                    if (!id) {
                        return { status: 400, body: "ID is required for update" };
                    }
                    const updatedUser = await request.json();
                    updatedUser.partitionKey = "beta";
                    updatedUser.rowKey = id;
                    await tableClient.updateEntity(updatedUser, "Merge");
                    return { jsonBody: updatedUser };
                case 'DELETE':
                    if (!id) {
                        return { status: 400, body: "ID is required for delete" };
                    }
                    await tableClient.deleteEntity("beta", id);
                    return { body: "User deleted successfully" };
                default:
                    return { status: 400, body: "Invalid request method" };
            }
        } catch (error) {
            context.log('Error: ${error.message}');
            return { status: 500, body: "An error occurred while processing the request" };
        }
    }
});