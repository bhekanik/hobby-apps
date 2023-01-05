// Generated by Xata Codegen 0.21.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "confessions",
    columns: [
      { name: "title", type: "string" },
      {
        name: "content",
        type: "text",
        notNull: true,
        defaultValue: "cannot be empty",
      },
      { name: "created_at", type: "datetime" },
      { name: "likes", type: "int", notNull: true, defaultValue: "0" },
      { name: "room", type: "link", link: { table: "rooms" } },
      { name: "views", type: "int", notNull: true, defaultValue: "0" },
    ],
  },
  {
    name: "rooms",
    columns: [
      { name: "created_at", type: "datetime" },
      { name: "name", type: "string" },
      { name: "type", type: "string", notNull: true, defaultValue: "default" },
      { name: "secret", type: "string" },
    ],
  },
  {
    name: "comments",
    columns: [
      {
        name: "content",
        type: "text",
        notNull: true,
        defaultValue: "empty comment",
      },
      { name: "created_at", type: "datetime" },
      { name: "comment_on", type: "link", link: { table: "comments" } },
      { name: "post", type: "link", link: { table: "confessions" } },
      { name: "poster", type: "string" },
    ],
  },
  {
    name: "polls",
    columns: [
      {
        name: "created_at",
        type: "datetime",
        notNull: true,
        defaultValue: "2022-12-30T14:36:18.78Z",
      },
      { name: "question", type: "string", notNull: true, defaultValue: "" },
      { name: "room", type: "link", link: { table: "rooms" } },
    ],
  },
  {
    name: "choices",
    columns: [
      { name: "description", type: "string", notNull: true, defaultValue: "" },
      { name: "votes", type: "int", notNull: true, defaultValue: "0" },
      { name: "percentage", type: "float", notNull: true, defaultValue: "0" },
      { name: "poll", type: "link", link: { table: "polls" } },
      {
        name: "created_at",
        type: "datetime",
        notNull: true,
        defaultValue: "2022-12-30T14:57:13.267Z",
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Confessions = InferredTypes["confessions"];
export type ConfessionsRecord = Confessions & XataRecord;

export type Rooms = InferredTypes["rooms"];
export type RoomsRecord = Rooms & XataRecord;

export type Comments = InferredTypes["comments"];
export type CommentsRecord = Comments & XataRecord;

export type Polls = InferredTypes["polls"];
export type PollsRecord = Polls & XataRecord;

export type Choices = InferredTypes["choices"];
export type ChoicesRecord = Choices & XataRecord;

export type DatabaseSchema = {
  confessions: ConfessionsRecord;
  rooms: RoomsRecord;
  comments: CommentsRecord;
  polls: PollsRecord;
  choices: ChoicesRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Bhekani-Khumalo-s-workspace-sem5mg.eu-west-1.xata.sh/db/ccy-confessions",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};