import { appEvents, ORDER_STATUS_CHANGED } from "./appEvents";
import { sendOrderStatusEmail } from "../services/email.service";

appEvents.on(ORDER_STATUS_CHANGED, async (payload) => {
    try {
    await sendOrderStatusEmail(payload); 
  } catch (error) {
    console.error('Error in order status listener:', error);
  }
});