# The swagger UI is a tool to visualize and interact with the API resources.

## Accessing the Swagger UI

By default, the Swagger UI is available at the following URL:

```
http://localhost:8000/docs
```

You can access it by opening this URL in your web browser.

The swagger UI url will be logged in the console when you start the server.

## Configure a route to be included in the swagger UI

There are several steps :

1. **Create a DTO**: Create a DTO (Data Transfer Object) schemas using zod.
2. **Register the DTO**: Register the DTO schemas in the swagger UI.
3. **Create a route**: Create a route that uses the DTO schemas.
4. **Register path definition**: Create a path definition to provide the swagger UI with the route information.

### Create DTO

```ts
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});
export type User = z.infer<typeof UserSchema>;
```

### Register the DTO

In the `index.ts` file, register the DTO schemas by adding the line

```ts
openApiRegistry.register("User", UserSchema);
```

bellow the others.

### Create a route

In your route file, create a route that uses the DTO schemas. For example:

```ts
import { UserController } from "./controllers/user.controller";
import { UserSchema } from "./schemas/user.schema";
import { Router } from "express";

const router = Router();

const swaggerGetAllUsers = {
  method: "get",
  path: "/users",
  tags: ["User"],
  summary: "Get all users",
  description: "Get all users from the database",
  request: {
    body: {
      description: "Request body",
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
    },
    params: {
      description: "Request params",
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
    },
  }
  response: {
    200: {
      description: "List of users",
      content: {
        "application/json": {
          schema: UserSchema.array(),
        },
      },
    },
  },
};
router.get("/users", zodValidator(UserSchema), UserController.getAllUsers);

export { swaggerGetAllUsers }; // And all the other swagger paths
export default router;
```

Let's break down the path definition:

- `method`: The HTTP method of the endpoint. It can be `get`, `post`, `put`, `delete`, etc.
- `path`: The path of the endpoint. It should start with a `/`.
- `tags`: This is used to group the endpoints in the swagger UI. You can use multiple tags to group the endpoints.
- `summary`: A short summary of the endpoint.
- `description`: A longer description of the endpoint.
- `request` **[OPTIONAL]**: The request object. It contains the body and params. The body and params are usually `application/json`. The schema is the DTO schema that you created earlier.
  - `body` **[OPTIONAL]**: The request body. It contains the description and the content type. The content type is usually `application/json`. The schema is the DTO schema that you created earlier.
  - `params` **[OPTIONAL]**: The request params. It contains the description and the content type. The content type is usually `application/json`. The schema is the DTO schema that you created earlier.
- `response`: The response object. It contains the status code and the content type. The content type is usually `application/json`. The schema is the DTO schema that you created earlier.

### Register path definition

Then, in the `index.ts` file, import the route and add it to the swagger paths list:

```ts
import { swaggerGetAllUsers } from "./routes/user.route";

const swaggerPaths = [
  swaggerGetAllUsers,
  // Add all the other swagger paths here
];
```
