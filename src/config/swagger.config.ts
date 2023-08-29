import { DocumentBuilder  } from "@nestjs/swagger"

export const swagger_config = new DocumentBuilder()
  .setTitle("E_commerce")
  .setDescription("This is a rest api that deals with users including registering, logging in and creating orders and getting their orders")
  .setVersion("1.0.0")
  .addBearerAuth()
  .build()