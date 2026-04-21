const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('proto/inventory.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const InventoryService = grpc.loadPackageDefinition(packageDefinition).InventoryService;
const inventoryHost = process.env.INVENTORY_HOST || 'localhost';
const inventoryPort = process.env.INVENTORY_PORT || 3002;
const client = new InventoryService(`${inventoryHost}:${inventoryPort}`, grpc.credentials.createInsecure());

module.exports = client;
