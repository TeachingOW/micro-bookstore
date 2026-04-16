const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const products = require('./products.json');

const packageDefinition = protoLoader.loadSync('proto/inventory.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const inventoryProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// InventoryService methods
const port = process.env.PORT || 3002;

server.addService(inventoryProto.InventoryService.service, {
    searchAllProducts: (_, callback) => {
        callback(null, {
            products: products,
        });
    },
});

server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Inventory Service running at http://127.0.0.1:${port}`);
    server.start();
});
