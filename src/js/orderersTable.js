
const tableBody = document.querySelector("#tablebody");
const branchs = {
  34: "Masallı filialı",
  33: "Tovuz filialı",
  3: "28 may filialı",
  32: "Xaçmaz filialı",
  36: "Qəbələ filialı",
  4: "Sumqayıt filialı",
  6: "Baş ofis",
  10: "Gəncə filialı",
  11: "Xalqlar Dostluğu",
  12: "Bərdə filialı",
  13: "Lənkəran filialı",
  15: "Sahil filialı",
  20: "Mərkəz filialı",
  22: "Nərimanov filialı",
  23: "Elmlər Akademiyası filialı",
  28: "Sədərək TM filialı",
  29: "Mərdəkan filialı",
  30: "Salyan filialı",
  31: "Ağcabədi filialı",
};


async function getOrderersTable() {
  const res = await fetch("http://localhost:4000/cardOrderers");
  const data = await res.json();
  for (let item of data) {
    let fullName = `${item.name} ${item.surname}`;
    const tr = `<tr>
    <td>${fullName}</td>
    <td>${item.phone}</td>
    <td>${item.fin_number.toUpperCase()}</td>
    <td>${item.card.toUpperCase()}</td>
    <td>${item.valute.toUpperCase()}</td>
    <td>${
      item.payment_method == "prepayment"
        ? `Kartın qiymətini ödəməklə(${item.duration})`
        : "İlkin mədaxil ilə"
    }</td>
    <td>${item.secret_word}</td>
    <td>${
      item.acquisition_method == "delivery"
        ? "Çatdırılma ilə - Pulsuz"
        : "Bankın filialından"
    }</td>
    ${
      item.acquisition_method == "delivery"
        ? `<td>${item.city}</td>
    <td>${item.delivery_address}</td>
    <td>-</td>`
        : `<td>-</td>
    <td>-</td>
    <td>${branchs[item.branch]}</td>`
    }
    <td>${item.means_of_payment}</td>
</tr>`;
    tableBody.insertAdjacentHTML("beforeend", tr);
  }
}
getOrderersTable();
