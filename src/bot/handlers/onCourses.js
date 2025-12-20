import User from "../../models/User.js";
import { bot } from "../bot.js";

async function onCourses(msg) {
  const chatId = msg.chat.id;

  let user = await User.findOne({ chatId });

  if (!user) return;

  user = await User.findOneAndUpdate({ chatId }, { action: "courses" });

  bot.sendMessage(chatId, `kurslar ro'yhati...`);
}

export default onCourses;
