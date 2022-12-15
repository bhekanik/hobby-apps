import { json } from "@remix-run/node";
import { ActionData } from "~/types/ActionData";

export const badRequest = (data: ActionData) => json(data, { status: 400 });
