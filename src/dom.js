window.dom = {
  //增
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  after(newNode, targetNode) {
    //把newNode插到targetNode后面
    targetNode.parentNode.insertBefore(newNode, targetNode.nextSibling);
    //nextSibling是返回当前节点紧跟着的节点
  },
  before(newNode, targetNode) {
    targetNode.parentNode.insertBefore(newNode, targetNode);
  },
  append(node, parent) {
    parent.appendChild(node);
  },
  wrap(node, parent) {
    dom.before(parent, node);
    dom.append(node, parent);
    //DOM appendChild插入某个节点到其他地方，原来位置该节点会被删除
  },
  //删
  remove(node) {
    //删除node节点
    node.parentNode.removeChild(node);
    return node;
    //return是为了删了这个节点还能保留这个节点的引用
  },
  empty(node) {
    //删除node的后代
    const { childNodes } = node, //???解构赋值
      array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(x));
      x = node.firstChild;
    }
    //childNodes.length问题:节点分为元素节点（标签）和文本节点（纯文本），换行和空格实际上是文本节点,该length还会实时改变
    return array;
    //移除的文本节点也在返回的array里
  },
  //改
  attr(node, attrName, val) {
    //用于读写属性,通过arguments参数判断
    if (arguments.length === 3) {
      node.setAttribute(attrName, val);
    } else if (arguments.length === 2) {
      return node.getAttribute(attrName);
    }
  },
  text(node, str) {
    //用于读写文本内容
    let x;
    if ("innerText" in node) {
      x = "innerText";
    } else {
      x = "textContent";
    }
    console.log(x);
    if (arguments.length === 2) {
      node[x] = str;
    } else if (arguments.length === 1) {
      return node[x];
    }
  },
  html(node, str) {
    //用于读写html内容
    if (arguments.length === 2) {
      node.innerHTML = str;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, val) {
    //用于修改style
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      node.style[name] = val;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //dom.style(div,'color')
        return node.style[name];
      } else if (typeof name === "object") {
        //dom.style(div,{color:'red'})
        for (let key in name) {
          node.style[key] = name[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    }
  },
  on(node, ev, fn) {
    //添加事件监听
    node.addEventListener(ev, fn);
  },
  off(node, ev, fn) {
    //删除事件监听
    node.removeEventListener(ev, fn);
  },
  //查
  find(selector, scope) {
    //获取标签
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    //获取父元素
    return node.parentNode;
  },
  children(node) {
    //获取子元素
    return node.children;
    //childNodes包含文本节点元素节点,children只包含元素节点(ie里还包含注释节点)
  },
  siblings(node) {
    //获取兄弟元素
    return Array.from(node.parentNode.children).filter(n => n !== node);
    //node.parentNode.children是伪数组
  },
  next(node) {
    //获取弟弟
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      //3文本节点,8注释节点,1元素节点,2属性节点
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    //获取老哥
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodes, fn) {
    //遍历所有节点
    for (let i = 0; i < nodes.length; i++) {
      fn.call(null, nodes[i]);
    }
  },
  index(node) {
    //获取索引号(从0开始)
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  }
};
