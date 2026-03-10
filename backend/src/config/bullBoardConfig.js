import { createBullBoard } from "@bull-board/api";
import { ExpressAdapter } from "@bull-board/express";
import { BullAdapter } from "@bull-board/api/bullAdapter";

import mailQueue from "../queues/mailQueue.js";

const bullServerAdapter = new ExpressAdapter();
bullServerAdapter.setBasePath("/ui");

createBullBoard({
  queues: [new BullAdapter(mailQueue)],
  serverAdapter: bullServerAdapter,
});

export default bullServerAdapter;
