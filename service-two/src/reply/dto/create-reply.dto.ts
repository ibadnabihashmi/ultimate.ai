import { ApiProperty } from "@nestjs/swagger";

export default class CreateReplyDto {

  @ApiProperty()
  intent: string;

  @ApiProperty()
  replies: Array<string>;
}