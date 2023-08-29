import { DocumentBuilder  } from "@nestjs/swagger"

export const swagger_config = new DocumentBuilder()
  .setTitle("E_commerce")
  .setDescription("This is an api that deals with users including registering, logging in and other authenticate-related endpoints.")
  .setVersion("1.0.0")
  .addBearerAuth()
  .build()