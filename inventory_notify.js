function checkInventoryandNotify() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  const data = sheet.getDataRange().getValues();

  const emailRecipients  = "lkim313815@gmail.com,qwert98541@gmail.com";

  const headers = data[1]

  const itemIndex = headers.indexOf("品項");

  const remainingQtyIndex = headers.indexOf("剩餘數量");

  if (itemIndex === -1 || remainingQtyIndex === -1){
    throw new Error("未找到必要的欄位，請確認表格是否包含「品項」和「剩餘數量」欄位！");
  }

  let itemsToNotify = [];

  for (let i =1; i<data.length; i++){
    const itemName = data[i][itemIndex];
    const remainingQty = data[i][remainingQtyIndex];

    if (remainingQty <= 1){
      itemsToNotify.push(`品項: ${itemName}, 剩餘數量: ${remainingQty}`);
    }
  }

  if (itemsToNotify.length > 0) {
    const subject = "小精靈庫存提醒";
    const body = `以下用品剩餘數量不足:\n\n${itemsToNotify.join("\n")}\n\n要記得補充庫存Ꮚ･ꈊ･Ꮚ`;
    GmailApp.sendEmail(emailRecipients, subject, body);
  }


}
