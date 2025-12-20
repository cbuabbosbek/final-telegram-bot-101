import User from "../../models/User.js";
import { bot } from "../bot.js";

async function onInfo(msg) {
  const chatId = msg.chat.id;

  let user = await User.findOne({ chatId });

  if (!user) return;

  user = await User.findOneAndUpdate({ chatId }, { action: "info" });

  bot.sendMessage(chatId, `Markaz haqindaa...`);
}

export default onInfo;
