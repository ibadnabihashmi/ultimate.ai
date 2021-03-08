import { ApiProperty } from "@nestjs/swagger";

export default class AddReplyDto {

  @ApiProperty()
  reply: string;
}