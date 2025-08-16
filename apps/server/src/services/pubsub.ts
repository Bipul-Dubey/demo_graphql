// services/pubsub.ts
import { PubSub } from "graphql-subscriptions";
export const pubsub = new PubSub();
export const EVENTS = { MESSAGE_SENT: "MESSAGE_SENT" };
