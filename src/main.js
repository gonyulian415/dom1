const div0 = dom.create("<div>new div</div>");
console.log(div0);

//dom.wrap(test, div0);
//dom.remove(window.a);
const nodes = dom.empty(empty1);
console.log(nodes);

dom.attr(test, "title", "xmas alone");
console.log(dom.attr(test, "title"));

//dom.text(test, "heyheyhey");
dom.style(test, { border: "1px solid red" });

dom.class.add(test, "red");
console.log(dom.class.has(test, "red"));

let fn1 = () => {
  console.log("hey click");
};
// dom.on(test, "click", () => {
//   console.log("click!");
// });
dom.on(test, "click", fn1);
dom.off(test, "click", fn1);

console.log(dom.find("#c", empty2));
console.log(dom.siblings(e));

console.log(dom.next(d));
console.log(dom.previous(d));

dom.each(empty2.children, e => {
  dom.style(e, "color", "pink");
});

console.log(dom.index(e));

const div = dom.find("#test>.red")[0]; // 获取对应的元素
console.log(div);
dom.style(div, "color", "green"); // 设置 div.style.color

const divList = dom.find(".red"); // 获取多个 div.red 元素
dom.each(divList, n => console.log(n)); // 遍历 divList 里的所有元素
