/**
 * @name 备忘录模式
 * @description 在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可将该对象恢复到原先保存的状态。
 * @url https://mp.weixin.qq.com/s/6g1negmL_Q9Ga8mowGByNQ
 */

/** 备忘录 */
class Memento {
  state: any;

  constructor(state: any) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

/** 备忘录管理者 */
export class Caretaker {
  // 任意读档可以改为 Map 结构
  private stack: Memento[] = [];

  getMemento() {
    return this.stack.pop();
  }

  addMemento(memento: Memento) {
    this.stack.push(memento);
  }
}

/** 发起者 */
export class Originator {
  private state: any;

  getState() {
    return this.state;
  }

  setState(state: any) {
    this.state = state;
  }

  createMemento() {
    return new Memento(this.state);
  }

  setMemento(memento: Memento | undefined) {
    this.state = memento?.getState();
  }
}

// 实例发起者，如文章管理器
const originator = new Originator();

// 实例化备忘录管理者
const caretaker = new Caretaker();

// 文章输入
originator.setState('hello');

// 记录一次状态
caretaker.addMemento(originator.createMemento());

// 文章读取
originator.setMemento(caretaker.getMemento());
