import Intent from "./intent.model";

export default interface IntentResponse {

  intents: Array<Intent>;

  entities: Array<any>;

}