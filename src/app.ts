import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

import { 
  jsonSchemaTransform, 
  serializerCompiler, 
  validatorCompiler 
} from "fastify-type-provider-zod";
import { ZodError } from "zod";

import { AuthRoutes } from "./http/routes/auth.routes";
import { MovieRoutes } from "./http/routes/movies.routes";
import { UsersRoutes } from "./http/routes/users.routes";
import { env } from "./env";
import { ReviewsRoutes } from "./http/routes/reviews.routes";
import { GenresRoutes } from "./http/routes/genres.routes";

export const app = fastify();

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: "Streamberry api",
      description: "Streamberry application API specification.",
      version: "1.0.0",
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'basic',
        description: "JWT TOKEN"
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/api-docs',
  staticCSP: true,
  transformSpecificationClone: true,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyJwt, {
  secret: 'dev',
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m'
  }
})

app.register(fastifyCookie)

app.register(AuthRoutes)
app.register(UsersRoutes)
app.register(MovieRoutes)
app.register(ReviewsRoutes)
app.register(GenresRoutes)

app.setErrorHandler((error, _request, reply) => {
  if(error instanceof ZodError) {
    console.log(error)
    return reply.status(400).send({
      message: "Validation Error.",
      issues: error.format()
    })
  }

    if (env.NODE_ENV !== "prod") {
      console.log(error)
    } else {
      // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error.'})
})