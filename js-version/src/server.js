import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID
    name: String
  }
  type DateRange {
    start: String
    end: String
  }
  type Event {
    id: ID
    title: String
    period: DateRange
    organizer: User
    participants: [User]
  }
  type Query {
    users: [User]
    events: [Event]
  }
`;

const users = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Michel" },
];

const events = [
  {
    id: "101",
    title: "Soirée jeux",
    period: { start: "2025-10-01", end: "2025-10-01" },
    organizer: users[0],
    participants: [users[0], users[1], users[2]]
  },
  {
    id: "102",
    title: "Hackathon",
    period: { start: "2025-11-15", end: "2025-11-17" },
    organizer: users[1],
    participants: [users[1], users[2]]
  }
];

const resolvers = {
  Query: {
    users: () => users,
    events: () => events
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`🚀 Server ready at ${url}`));
