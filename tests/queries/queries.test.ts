import { ObjectType } from "../../src/defintion/types/ObjectType";
import { InputType } from "../../src/defintion/types/InputType";
import { Field } from "../../src/defintion/fields/Field";
import { Args } from "../../src/defintion/types/Args";
import { Selection } from "../../src/client/Selection";
import { Request } from "../../src/client/Request";
import { ApolloServer, gql } from "apollo-server";
import { Schema } from "../../src/defintion/schema/Schema";
import ApolloClient from "apollo-boost";
import fetch from "node-fetch";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  fetch,
});

class User {
  Username: string;

  static readonly inputType = InputType.create(User)
    .suffix()
    .addField("Username", String);
}

class A {
  a: string;
  b: number;
  user: User;

  static resolve() {
    return true;
  }

  static readonly args = Args.create(A)
    .addArg("a", String)
    .addArg("b", Number)
    .addArg("user", User.inputType);
}

class Response {
  code: number;

  static readonly objectType = ObjectType.create(Response).addField(
    "code",
    Number,
  );
}

const request = Request.create<A>("query", "A", {
  a: "a",
  b: 0,
  user: { Username: "ven" },
}).select(Selection.create<Response>("code"));

const query = ObjectType.create("Query").addFields(
  Field.create("A", Response.objectType).setResolver(A.resolve, A.args),
);

beforeAll(async () => {
  // const server = new ApolloServer({
  //   schema: Schema.create(query, User.inputType, Response.objectType).build(),
  // });
  // const url = await server.listen();
  // console.log(url);
});

describe("Queries", () => {
  it("Should create a resolver some arguments", async () => {
    // const res = await client.query({
    //   query: gql`
    //     ${request.source}
    //   `,
    // });
  });
});
