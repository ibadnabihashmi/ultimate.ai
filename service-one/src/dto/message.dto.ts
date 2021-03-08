import { ApiProperty } from "@nestjs/swagger";

export default class MessageDto {

  @ApiProperty()
  message: string

}