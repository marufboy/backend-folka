import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  app.enableCors()

  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT') || 3000

  //Swagger docs setup
  const config = new DocumentBuilder()
    .setTitle('Folka REST API')
    .setDescription('API for managing folka app')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addServer('https://backend-folka.vercel.app/', 'Staging')
    // .addServer('https://production.yourapi.com/', 'Production')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  })

  await app.listen(port)
}
bootstrap()
