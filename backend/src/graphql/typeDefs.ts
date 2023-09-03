export const typeDefs = `
  type User {
    id: ID
    username: String
    email: String
  }

  type Query {
    searchUsers(username: String!): [User]
  }
`;
