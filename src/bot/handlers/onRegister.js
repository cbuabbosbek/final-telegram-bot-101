import User from "../../models/User.js";
import { bot } from "../bot.js";

async function onRegister(msg) {
  const chatId = msg.chat.id;

  let user = await User.findOne({ chatId });

  if (!user) return;

  user = await User.findOneAndUpdate({ chatId }, { action: "awaiting_name" });

  bot.sendMessage(chatId, `Ismingizni kiriting:`);
}

export default onRegister;
