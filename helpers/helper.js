import _forOwn from 'lodash/forOwn';
import _omit from 'lodash/omit';

class CustomerInfoHTML {
  constructor(customerInfo) {
    this.customerInfo = customerInfo;
  }

  buildHeader() {
    return `<h2>주문회원정보</h2>`;
  }

  buildBody() {
    let body = `<ul>`;

    Object.keys(this.customerInfo).forEach((key) => {
      body += `<li>${key}: ${this.customerInfo[key]}</li>`;
    });

    return body + `</ul>`;
  }

  getHTML() {
    return this.buildHeader() + this.buildBody();
  }
}

class OrderInfoHTML {
  constructor(orderInfo, orderId) {
    this.orderInfo = orderInfo;
    this.orderId = orderId;
  }

  buildHeader() {
    return `<h2>주문정보</h2><h3>주문번호: ${this.orderId}</h3><br/>`;
  }

  buildBody() {
    let body = ``;

    this.orderInfo.forEach(order => {
      body += this.buildOneOrder(order);
    });

    return body;
  }

  buildOneOrder(order) {
    let orderHTML = `<h3>상품명: ${order["상품명"]}</h3>`;

    order = _omit(order, ['_id', 'siteIndex']);

    orderHTML += `<ul>`;
    Object.keys(order).forEach((key) => {
      orderHTML += `<li>${key}: ${order[key]}</li>`;
    });


    return orderHTML + `</ul>`;
  }

  getHTML() {
    return this.buildHeader() + this.buildBody();
  }
}

const emailSubjectBuilder = (customer) => {
  return `${customer['이름']}님의 Try-Home 주문메일입니다.`;
}

const emailBodyBuilder = (orders, customer, orderId) => {
  let html = customerInfoHTMLBuilder(customer) + orderHTMLBuilder(orders, orderId);
  return html;
}

const customerInfoHTMLBuilder = (customer) => {
  let html = new CustomerInfoHTML(customer).getHTML();
  return html;
}

const orderHTMLBuilder = (orders, orderId) => {
  let html = new OrderInfoHTML(orders, orderId).getHTML();
  return html;
}

const ordersKey2Kor = (orders) => {
  let mapped = orders.map(order => {
    let { color, size, count, label, price, siteIndex, category } = order;
    return {
      "상품명": label,
      "수량": count,
      "색상": color,
      "사이즈": size,
      "가격": numberWithCommas(price),
      "사이트 인덱스": siteIndex,
      "카테고리": category
    };
  });

  return mapped;
}

const customerKey2Kor = (customer) => {
  let { name, email, phonenumber, address } = customer;
  return {
    "이름": name,
    "이메일": email,
    "전화번호": phonenumber,
    "주소": address
  }
}

const numberWithCommas = x => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

module.exports = {
  emailSubjectBuilder,
  emailBodyBuilder,
  ordersKey2Kor,
  customerKey2Kor
}
