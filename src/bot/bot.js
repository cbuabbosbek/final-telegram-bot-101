import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
config();

import onStart from "./handlers/onStart.js";

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const CHANNEL_ID = "@academy_100x_uz";

const checkIfUserSubscribed = async (chatId) => {
  try {
    console.log("TRY++++++++++++");

    const chatMember = await bot.getChatMember(CHANNEL_ID, chatId);
    console.log("---------------------");
    // console.log(chatMember);
    console.log(chatMember.status);

    if (chatMember.status == "left" || chatMember.status == "kicked") {
      return false;
    } else {
      return true;
    }

    // status
    // creator - yaratuvchi
    // admin -adminstrator
    // member - a'zo
    // left - tark etgan yoki qo'shilmagan
    // kicked - chiqarib yuborilgan

    console.log("---------------------");
  } catch {
    console.log("CATCH--------------");
  }
};

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;

  const subscription = await checkIfUserSubscribed(chatId);

  console.log(subscription);

  // false -> kanalda yoq
  // true -> kanalda bor

  if (subscription == false) {
    return bot.sendMessage(
      chatId,
      `Hurmatli ${firstname}\n Siz botdan foydalanishingiz uchun oldin quyidagi kanalga obuna bolishingiz kerak... 👇`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "100x Academy Xiva",
                url: `https://t.me/academy_100x_uz`,
              },
            ],
            [
              {
                text: "Obunani tekshirish ✅",
                callback_data: `confirm_subscribtion`,
              },
            ],
          ],
        },
      }
    );
  }

  if (text == "/start") {
    return onStart(msg);
  }

  bot.sendMessage(chatId, `Assalomu aleykum, ${firstname}`);
  bot.sendMessage(chatId, `text: ${text}`);
});

bot.on("callback_query", async (query) => {
  const msg = query.message;
  const data = query.data;
  const id = query.id;

  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;

  if (data == "confirm_subscribtion") {
    const subscription = await checkIfUserSubscribed(chatId);

    if (subscription == false) {
      bot.answerCallbackQuery(id, {
        text: "Siz hali obuna bo'lmagansiz... ❌",
      });
    } else {
      bot.deleteMessage(chatId, msg.message_id);
      return onStart(msg);
    }
  }
});

console.log("Bot ishga tushdi...");
