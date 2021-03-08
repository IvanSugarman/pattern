/**
 * @name 观察者模式
 * @description 定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。
 * @url https://mp.weixin.qq.com/s/VIIbKEf-qWfaYdaD7wWCWA
 */

type State = Record<string, unknown>;

// 管理所有观察者
class Subject {
  // 观察者数组
  private observers: Observer[] = [];
  // 状态
  private state: State = {};

  // 通知所有观察者
  private notify() {
    this.observers.forEach(ob => {
      ob.update();
    });
  }

  // 新增观察者
  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  // 获取状态
  getState() {
    return this.state;
  }

  // 设置状态
  setState(state: State) {
    this.state = state;
    this.notify();
  }
}

class Observer {
  private subject: Subject;

  constructor(subject: Subject) {
    this.subject = subject;
    this.subject.addObserver(this);
  }

  // 更新
  update() {
    // e.g. 渲染操作
    console.log(this.subject.getState());
  }
}
// 客户端调用
const subject = new Subject();
// 创建观察者
const observer1 = new Observer(subject);
const observer2 = new Observer(subject);
// 更新状态
subject.setState({ a: 10 });
