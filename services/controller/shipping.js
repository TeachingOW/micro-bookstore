const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('proto/shipping.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const ShippingService = grpc.loadPackageDefinition(packageDefinition).ShippingService;
const shippingHost = process.env.SHIPPING_HOST || 'localhost';
const shippingPort = process.env.SHIPPING_PORT || 3001;
const client = new ShippingService(`${shippingHost}:${shippingPort}`, grpc.credentials.createInsecure());

module.exports = client;
