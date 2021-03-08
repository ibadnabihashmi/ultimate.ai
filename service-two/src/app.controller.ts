import { Controller } from '@nestjs/common';
import {
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('api')
@Controller('api')
export class AppController {
}
