import { parseResponse, queryString } from "./utils";

export default class Feed {
  constructor({ instance, feedId, readTokenProvider }) {
    this.instance = instance;
    this.feedId = feedId;
    this.readTokenProvider = readTokenProvider;
  }

  subscribe(options = {}) {
    if (typeof options.onItem !== "function") {
      throw new TypeError("Must provide an `onItem` callback");
    }
    return this.instance.resumableSubscribe({
      ...options,
      path: `feeds/${ this.feedId }/items` + queryString({
        previous_items: options.previousItems,
      }),
      tokenProvider: this.readTokenProvider,
      onEvent: ({body, eventId}) => options.onItem({ id: eventId, ...body })
    });
  }

  paginate({ cursor, limit = 50 } = {}) {
    return parseResponse(this.instance.request({
      method: "GET",
      path: `feeds/${ this.feedId }/items` + queryString({
        cursor,
        limit,
      }),
      tokenProvider: this.readTokenProvider,
    }));
  }
}
