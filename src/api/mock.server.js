import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer,
    },

    models: {
      product: Model,
    },

    routes() {
      this.namespace = "api";
      this.timing = 3000;
      this.resource("products");
    },

    seeds(server) {
      [...Array(50)].forEach((_) => {
        server.create("product", {
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          brand: faker.commerce.productAdjective(),
          productDescription: faker.commerce.productDescription(),
          color: faker.commerce.color(),
          image: faker.random.image(),
          price: Number(faker.commerce.price()),
          inStock: faker.datatype.boolean(),
          fastDelivery: faker.datatype.boolean(),
          ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
          offer: faker.random.arrayElement([
            "Save 50",
            "70% bonanza",
            "Republic Day Sale",
          ]),
          idealFor: faker.random.arrayElement([
            "Men",
            "Women",
            "Girl",
            "Boy",
            "Senior",
          ]),
          level: faker.random.arrayElement([
            "beginner",
            "amateur",
            "intermediate",
            "advanced",
            "professional",
          ]),
        });
      });
    },
  });
}
