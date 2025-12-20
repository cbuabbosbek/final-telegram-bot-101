import User from "../../models/User.js";
import { bot } from "../bot.js";

async function onError(msg) {
  const chatId = msg.chat.id;

  let user = await User.findOne({ chatId });

  if (!user) return;

  user = await User.findOneAndUpdate({ chatId }, { action: "error" });

  bot.sendMessage(chatId, `Kutilmagan xatolik.. Iltimos /start bosing!`);
}

export default onError;
